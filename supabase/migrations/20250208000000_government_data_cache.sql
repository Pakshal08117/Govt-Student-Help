-- Government Data Cache Table
-- Stores real government scheme data fetched from data.gov.in
CREATE TABLE IF NOT EXISTS government_data_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_source VARCHAR(255) NOT NULL,
  data_type VARCHAR(100) NOT NULL,
  raw_data JSONB NOT NULL,
  normalized_data JSONB NOT NULL,
  fetch_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_government_data_source ON government_data_cache(data_source);
CREATE INDEX idx_government_data_type ON government_data_cache(data_type);
CREATE INDEX idx_government_data_active ON government_data_cache(is_active);
CREATE INDEX idx_government_data_fetch_date ON government_data_cache(fetch_date DESC);

-- Function to get latest cached data
CREATE OR REPLACE FUNCTION get_latest_government_data(
  p_data_source VARCHAR,
  p_data_type VARCHAR
)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT normalized_data INTO result
  FROM government_data_cache
  WHERE data_source = p_data_source
    AND data_type = p_data_type
    AND is_active = true
  ORDER BY fetch_date DESC
  LIMIT 1;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to check if data needs refresh (older than 24 hours)
CREATE OR REPLACE FUNCTION needs_data_refresh(
  p_data_source VARCHAR,
  p_data_type VARCHAR
)
RETURNS BOOLEAN AS $$
DECLARE
  last_fetch TIMESTAMPTZ;
BEGIN
  SELECT fetch_date INTO last_fetch
  FROM government_data_cache
  WHERE data_source = p_data_source
    AND data_type = p_data_type
    AND is_active = true
  ORDER BY fetch_date DESC
  LIMIT 1;
  
  -- Return true if no data exists or data is older than 24 hours
  RETURN (last_fetch IS NULL OR last_fetch < NOW() - INTERVAL '24 hours');
END;
$$ LANGUAGE plpgsql;

-- RLS Policies (read-only for all users)
ALTER TABLE government_data_cache ENABLE ROW LEVEL SECURITY;

-- Anyone can read cached government data
CREATE POLICY "Anyone can read government data cache"
  ON government_data_cache
  FOR SELECT
  USING (true);

-- Only authenticated users can insert (for background jobs)
CREATE POLICY "Authenticated users can insert government data"
  ON government_data_cache
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Comment for documentation
COMMENT ON TABLE government_data_cache IS 'Caches real government scheme data from data.gov.in and other .gov.in sources with daily refresh';
