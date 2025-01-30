-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create CV table
CREATE TABLE cvs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    cv_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_cvs_user_id ON cvs(user_id);
CREATE INDEX idx_cvs_is_primary ON cvs(user_id, is_primary) WHERE is_primary = true;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cvs_updated_at
    BEFORE UPDATE ON cvs
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

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
CREATE TRIGGER ensure_single_primary_cv_trigger
  BEFORE INSERT OR UPDATE OF is_primary
  ON cvs
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_cv();

-- Enable RLS
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs"
  ON cvs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
