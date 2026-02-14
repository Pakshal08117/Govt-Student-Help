-- Scholarship Query History Table
CREATE TABLE IF NOT EXISTS scholarship_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  query_text TEXT NOT NULL,
  query_language VARCHAR(5) NOT NULL DEFAULT 'en',
  user_profile JSONB,
  ai_response JSONB,
  eligible_schemes JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_scholarship_queries_user_id ON scholarship_queries(user_id);
CREATE INDEX idx_scholarship_queries_created_at ON scholarship_queries(created_at DESC);

-- RLS Policies
ALTER TABLE scholarship_queries ENABLE ROW LEVEL SECURITY;

-- Users can only see their own queries
CREATE POLICY "Users can view own queries"
  ON scholarship_queries
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own queries
CREATE POLICY "Users can insert own queries"
  ON scholarship_queries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anonymous users can insert (optional - for guest access)
CREATE POLICY "Anonymous users can insert queries"
  ON scholarship_queries
  FOR INSERT
  WITH CHECK (user_id IS NULL);
