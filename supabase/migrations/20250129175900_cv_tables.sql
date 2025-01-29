-- Create CV table
CREATE TABLE user_cvs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    cv_data JSONB NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_user_cvs_user_id ON user_cvs(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_cvs_updated_at
    BEFORE UPDATE ON user_cvs
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- RLS Policies
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own CVs"
    ON user_cvs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own CVs"
    ON user_cvs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
    ON user_cvs FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
    ON user_cvs FOR DELETE
    USING (auth.uid() = user_id);
