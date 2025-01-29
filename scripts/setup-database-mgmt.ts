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

const sqlContent = `
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
`;

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    console.log('Please follow these steps to set up your database:');
    console.log('\n1. Go to your Supabase project dashboard:', supabaseUrl);
    console.log('\n2. Navigate to the SQL Editor');
    console.log('\n3. Copy and paste the following SQL:');
    console.log('\n' + sqlContent);
    console.log('\n4. Click "Run" to execute the SQL');
    console.log('\nAfter running the SQL, your database will be ready to use with the CV builder functionality.');
    
    return true;
  } catch (error) {
    console.error('Error generating instructions:', error);
    return false;
  }
}

setupDatabase().then((success) => {
  if (success) {
    console.log('\nInstructions generated successfully!');
  } else {
    console.log('\nFailed to generate instructions!');
  }
  process.exit(success ? 0 : 1);
});
