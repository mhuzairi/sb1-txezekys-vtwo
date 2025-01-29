import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

async function executeSql(sql: string) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({
      sql_string: sql
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to execute SQL: ${error}`);
  }

  return response.json();
}

async function setupDatabase() {
  try {
    console.log('Starting database setup...');

    // Step 1: Create or modify the cvs table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS cvs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users NOT NULL,
        title TEXT,
        cv_data JSONB NOT NULL DEFAULT '{}'::jsonb,
        is_primary BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Add columns if they don't exist
      DO $$ 
      BEGIN 
        BEGIN
          ALTER TABLE cvs ADD COLUMN cv_data JSONB NOT NULL DEFAULT '{}'::jsonb;
        EXCEPTION
          WHEN duplicate_column THEN 
            NULL;
        END;
        
        BEGIN
          ALTER TABLE cvs ADD COLUMN is_primary BOOLEAN DEFAULT false;
        EXCEPTION
          WHEN duplicate_column THEN 
            NULL;
        END;
      END $$;
    `);

    console.log('Table structure updated');

    // Step 2: Create the trigger function
    await executeSql(`
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

      -- Create trigger
      DROP TRIGGER IF EXISTS ensure_single_primary_cv_trigger ON cvs;
      CREATE TRIGGER ensure_single_primary_cv_trigger
        BEFORE INSERT OR UPDATE OF is_primary
        ON cvs
        FOR EACH ROW
        WHEN (NEW.is_primary = true)
        EXECUTE FUNCTION ensure_single_primary_cv();
    `);

    console.log('Trigger function created');

    // Step 3: Create indexes
    await executeSql(`
      CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
      CREATE INDEX IF NOT EXISTS idx_cvs_is_primary ON cvs(user_id, is_primary) WHERE is_primary = true;
    `);

    console.log('Indexes created');

    // Step 4: Set up RLS policies
    await executeSql(`
      -- Enable RLS
      ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

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
    `);

    console.log('RLS policies created');
    console.log('Database setup completed successfully!');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}

setupDatabase().then((success) => {
  if (success) {
    console.log('Setup completed successfully!');
  } else {
    console.log('Setup failed!');
  }
  process.exit(success ? 0 : 1);
});
