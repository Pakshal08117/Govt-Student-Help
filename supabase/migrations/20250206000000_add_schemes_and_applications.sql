-- Add schemes table to database
CREATE TABLE IF NOT EXISTS public.schemes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_hi TEXT,
  name_mr TEXT,
  description TEXT NOT NULL,
  description_hi TEXT,
  description_mr TEXT,
  category TEXT NOT NULL,
  scheme_type TEXT,
  ministry TEXT,
  eligibility JSONB,
  eligibility_hi TEXT[],
  eligibility_mr TEXT[],
  documents TEXT[],
  documents_hi TEXT[],
  documents_mr TEXT[],
  application_process TEXT[],
  application_process_hi TEXT[],
  application_process_mr TEXT[],
  how_to_apply TEXT[],
  benefits JSONB,
  benefits_hi JSONB,
  benefits_mr JSONB,
  website TEXT,
  helpline TEXT,
  state TEXT NOT NULL,
  states TEXT[],
  target_audience TEXT[],
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'completed')),
  district TEXT,
  taluka TEXT,
  state TEXT,
  application_data JSONB DEFAULT '{}'::jsonb,
  documents JSONB DEFAULT '{}'::jsonb,
  user_email TEXT,
  user_name TEXT,
  user_phone TEXT,
  remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add services table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_hi TEXT,
  name_mr TEXT,
  description TEXT NOT NULL,
  description_hi TEXT,
  description_mr TEXT,
  category TEXT NOT NULL,
  office TEXT NOT NULL,
  office_hi TEXT,
  office_mr TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  working_hours TEXT,
  working_hours_hi TEXT,
  working_hours_mr TEXT,
  district TEXT NOT NULL,
  taluka TEXT,
  state TEXT NOT NULL,
  documents TEXT[],
  documents_hi TEXT[],
  documents_mr TEXT[],
  fees TEXT,
  fees_hi TEXT,
  fees_mr TEXT,
  processing_time TEXT,
  processing_time_hi TEXT,
  processing_time_mr TEXT,
  is_online BOOLEAN DEFAULT false,
  website TEXT,
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON public.schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_is_active ON public.schemes(is_active);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_scheme_id ON public.applications(scheme_id);
CREATE INDEX IF NOT EXISTS idx_services_district ON public.services(district);
CREATE INDEX IF NOT EXISTS idx_services_state ON public.services(state);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);

-- Enable Row Level Security
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for schemes (public read)
CREATE POLICY "Schemes are viewable by everyone" ON public.schemes
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert schemes" ON public.schemes
  FOR INSERT WITH CHECK (false); -- Will be managed through admin panel

CREATE POLICY "Only admins can update schemes" ON public.schemes
  FOR UPDATE USING (false);

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" ON public.applications
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for services (public read)
CREATE POLICY "Services are viewable by everyone" ON public.services
  FOR SELECT USING (true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT SELECT ON public.schemes TO anon, authenticated;
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.applications TO authenticated;
