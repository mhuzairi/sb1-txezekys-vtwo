-- Drop existing CV-related policies
DROP POLICY IF EXISTS "Users can view their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can insert their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete their own CVs" ON cvs;

-- Alter existing cvs table
ALTER TABLE cvs
  -- Remove existing columns we don't need
  DROP COLUMN IF EXISTS file_url,
  DROP COLUMN IF EXISTS file_type,
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS ai_score,
  DROP COLUMN IF EXISTS ai_feedback,
  
  -- Add new columns
  ADD COLUMN IF NOT EXISTS cv_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS is_primary boolean DEFAULT false,
  
  -- Rename title to make it optional
  ALTER COLUMN title DROP NOT NULL;

-- Create function to ensure only one primary CV per user
CREATE OR REPLACE FUNCTION ensure_single_primary_cv()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary THEN
    -- Set all other CVs of the same user to non-primary
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
CREATE INDEX IF NOT EXISTS idx_cvs_is_primary ON cvs(user_id, is_primary) WHERE is_primary = true;
