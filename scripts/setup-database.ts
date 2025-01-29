import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Create user_role enum if it doesn't exist
    await supabase.rpc('create_enum_type', {
      enum_name: 'user_role',
      enum_values: ['jobseeker', 'employer']
    });

    // Create cv_status enum if it doesn't exist
    await supabase.rpc('create_enum_type', {
      enum_name: 'cv_status',
      enum_values: ['active', 'archived']
    });

    // Update cvs table
    const { error: alterError } = await supabase.rpc('execute_sql', {
      sql_string: `
        -- Alter existing cvs table
        ALTER TABLE IF EXISTS cvs
          ADD COLUMN IF NOT EXISTS cv_data jsonb NOT NULL DEFAULT '{}'::jsonb,
          ADD COLUMN IF NOT EXISTS is_primary boolean DEFAULT false;

        -- Create function to ensure only one primary CV per user
        CREATE OR REPLACE FUNCTION ensure_single_primary_cv()
        RETURNS TRIGGER AS $$
        BEGIN
          IF NEW.is_primary THEN
            UPDATE cvs
            SET is_primary = false
            WHERE user_id = NEW.user_id
              AND id != NEW.id;
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Create trigger for primary CV management
        DROP TRIGGER IF EXISTS ensure_single_primary_cv_trigger ON cvs;
        CREATE TRIGGER ensure_single_primary_cv_trigger
          BEFORE INSERT OR UPDATE OF is_primary
          ON cvs
          FOR EACH ROW
          WHEN (NEW.is_primary = true)
          EXECUTE FUNCTION ensure_single_primary_cv();

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
        CREATE INDEX IF NOT EXISTS idx_cvs_is_primary ON cvs(user_id, is_primary) WHERE is_primary = true;
      `
    });

    if (alterError) {
      throw alterError;
    }

    // Update RLS policies
    const { error: policyError } = await supabase.rpc('execute_sql', {
      sql_string: `
        -- Drop existing policies
        DROP POLICY IF EXISTS "Users can view their own CVs" ON cvs;
        DROP POLICY IF EXISTS "Users can insert their own CVs" ON cvs;
        DROP POLICY IF EXISTS "Users can update their own CVs" ON cvs;
        DROP POLICY IF EXISTS "Users can delete their own CVs" ON cvs;

        -- Create new policies
        CREATE POLICY "Users can view their own CVs"
          ON cvs FOR SELECT
          TO authenticated
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert their own CVs"
          ON cvs FOR INSERT
          TO authenticated
          WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update their own CVs"
          ON cvs FOR UPDATE
          TO authenticated
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can delete their own CVs"
          ON cvs FOR DELETE
          TO authenticated
          USING (auth.uid() = user_id);
      `
    });

    if (policyError) {
      throw policyError;
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
