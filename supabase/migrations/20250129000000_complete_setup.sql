-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  username TEXT UNIQUE,
  district TEXT,
  taluka TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'completed')),
  district TEXT NOT NULL,
  taluka TEXT NOT NULL,
  documents JSONB DEFAULT '{}',
  user_email TEXT,
  full_name TEXT,
  mobile_number TEXT,
  application_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schemes table (for dynamic scheme management)
CREATE TABLE IF NOT EXISTS schemes (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_mr TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  category TEXT NOT NULL,
  description_en TEXT,
  description_mr TEXT,
  description_hi TEXT,
  eligibility JSONB DEFAULT '{}',
  benefits JSONB DEFAULT '{}',
  helpline TEXT,
  website TEXT,
  districts TEXT[] DEFAULT ARRAY['All'],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, district, taluka)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'district', ''),
    COALESCE(NEW.raw_user_meta_data->>'taluka', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_schemes_updated_at ON schemes;
CREATE TRIGGER update_schemes_updated_at
  BEFORE UPDATE ON schemes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Applications policies
CREATE POLICY "Users can view their own applications"
  ON applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON applications FOR UPDATE
  USING (auth.uid() = user_id);

-- Admin can view all applications (you'll need to set up admin role)
CREATE POLICY "Admins can view all applications"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email LIKE '%@admin.gov.in'
    )
  );

CREATE POLICY "Admins can update all applications"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email LIKE '%@admin.gov.in'
    )
  );

-- Schemes policies (public read, admin write)
CREATE POLICY "Anyone can view active schemes"
  ON schemes FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage schemes"
  ON schemes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email LIKE '%@admin.gov.in'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_district ON applications(district);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_district ON profiles(district);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_is_active ON schemes(is_active);

-- Insert sample schemes (optional - you can remove this if you want to add schemes via admin panel)
INSERT INTO schemes (id, name_en, name_mr, name_hi, category, description_en, description_mr, description_hi, helpline, website)
VALUES 
  ('health-insurance', 'Mahatma Jyotiba Phule Jan Arogya Yojana', 'महात्मा ज्योतिबा फुले जन आरोग्य योजना', 'महात्मा ज्योतिबा फुले जन आरोग्य योजना', 'Health', 'Free health insurance coverage', 'मोफत आरोग्य विमा संरक्षण', 'मुफ्त स्वास्थ्य बीमा कवरेज', '14444', 'https://www.jeevandayee.gov.in/')
ON CONFLICT (id) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
