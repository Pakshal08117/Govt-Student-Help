-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  scheme_id VARCHAR(255) NOT NULL,
  scheme_name VARCHAR(500) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  district VARCHAR(255),
  taluka VARCHAR(255),
  state VARCHAR(255),
  application_data JSONB,
  documents JSONB,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Application Journey/Timeline Table
CREATE TABLE IF NOT EXISTS application_journey (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  updated_by VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_application_journey_application_id ON application_journey(application_id);
CREATE INDEX idx_application_journey_created_at ON application_journey(created_at DESC);

-- RLS Policies
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_journey ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own applications"
  ON applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own applications
CREATE POLICY "Users can insert own applications"
  ON applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending applications
CREATE POLICY "Users can update own pending applications"
  ON applications
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Authenticated users can view journey of their applications
CREATE POLICY "Users can view own application journey"
  ON application_journey
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM applications
      WHERE applications.id = application_journey.application_id
      AND applications.user_id = auth.uid()
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on applications
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to add journey entry when application status changes
CREATE OR REPLACE FUNCTION add_application_journey_entry()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO application_journey (application_id, status, notes, updated_by)
    VALUES (NEW.id, NEW.status, 'Status changed from ' || OLD.status || ' to ' || NEW.status, 'system');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create journey entries
CREATE TRIGGER application_status_change_trigger
  AFTER UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION add_application_journey_entry();

-- Insert sample applications for demonstration
INSERT INTO applications (scheme_id, scheme_name, status, district, taluka, state, application_data, documents, admin_notes, created_at, updated_at)
VALUES
  -- Recent applications (today)
  ('pm-kisan', 'PM-KISAN Samman Nidhi', 'pending', 'Mumbai', 'Andheri', 'Maharashtra', 
   '{"farmer_name": "Rajesh Kumar", "land_area": "2.5 acres", "bank_account": "XXXX1234"}'::jsonb,
   '{"aadhar": "uploaded", "land_records": "uploaded", "bank_passbook": "uploaded"}'::jsonb,
   'New application received', NOW(), NOW()),
   
  ('ayushman-bharat', 'Ayushman Bharat - PM-JAY', 'under_review', 'Pune', 'Hadapsar', 'Maharashtra',
   '{"family_size": 5, "annual_income": 180000, "ration_card": "APL"}'::jsonb,
   '{"aadhar": "uploaded", "income_certificate": "uploaded", "ration_card": "uploaded"}'::jsonb,
   'Documents under verification', NOW(), NOW()),
   
  ('pmay', 'Pradhan Mantri Awas Yojana', 'approved', 'Delhi', 'Central Delhi', 'Delhi',
   '{"applicant_name": "Priya Sharma", "family_income": 250000, "property_status": "no_house"}'::jsonb,
   '{"aadhar": "verified", "income_certificate": "verified", "property_documents": "verified"}'::jsonb,
   'Application approved. Subsidy amount: ₹2,50,000', NOW() - INTERVAL '2 hours', NOW()),
   
  -- Yesterday's applications
  ('nsp-pre-matric', 'Pre-Matric Scholarship for SC Students', 'approved', 'Bangalore', 'Bangalore Urban', 'Karnataka',
   '{"student_name": "Amit Singh", "class": "9th", "school": "Government High School", "category": "SC"}'::jsonb,
   '{"aadhar": "verified", "caste_certificate": "verified", "income_certificate": "verified", "school_id": "verified"}'::jsonb,
   'Scholarship approved. Amount: ₹450/month', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
   
  ('mudra-loan', 'MUDRA Loan - Shishu', 'under_review', 'Ahmedabad', 'Ahmedabad City', 'Gujarat',
   '{"business_type": "Tailoring Shop", "loan_amount": 50000, "experience": "2 years"}'::jsonb,
   '{"aadhar": "uploaded", "business_plan": "uploaded", "address_proof": "uploaded"}'::jsonb,
   'Bank verification in progress', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
   
  -- Last week's applications
  ('pmkvy', 'Pradhan Mantri Kaushal Vikas Yojana', 'completed', 'Jaipur', 'Jaipur City', 'Rajasthan',
   '{"course": "Computer Hardware", "training_center": "NSDC Approved Center", "duration": "3 months"}'::jsonb,
   '{"aadhar": "verified", "education_certificate": "verified", "training_completion": "verified"}'::jsonb,
   'Training completed successfully. Certificate issued.', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
   
  ('nsp-post-matric', 'Post-Matric Scholarship for SC Students', 'approved', 'Hyderabad', 'Hyderabad Urban', 'Telangana',
   '{"student_name": "Lakshmi Devi", "course": "B.Tech Computer Science", "year": "2nd", "category": "SC"}'::jsonb,
   '{"aadhar": "verified", "caste_certificate": "verified", "income_certificate": "verified", "college_id": "verified"}'::jsonb,
   'Scholarship approved. Amount: ₹1200/month + fees reimbursement', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
   
  ('ujjwala', 'Pradhan Mantri Ujjwala Yojana', 'rejected', 'Lucknow', 'Lucknow City', 'Uttar Pradesh',
   '{"applicant_name": "Sunita Verma", "family_size": 4, "bpl_card": "no"}'::jsonb,
   '{"aadhar": "uploaded", "bpl_card": "not_available"}'::jsonb,
   'Application rejected: BPL card required but not provided', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
   
  -- Older applications
  ('stand-up-india', 'Stand-Up India Scheme', 'approved', 'Kolkata', 'Kolkata Municipal', 'West Bengal',
   '{"business_type": "Beauty Parlor", "loan_amount": 1500000, "category": "SC", "gender": "Female"}'::jsonb,
   '{"aadhar": "verified", "business_plan": "verified", "caste_certificate": "verified", "property_documents": "verified"}'::jsonb,
   'Loan approved. Amount: ₹15,00,000 at 8% interest', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
   
  ('pm-vishwakarma', 'PM Vishwakarma Scheme', 'under_review', 'Chennai', 'Chennai City', 'Tamil Nadu',
   '{"craft": "Carpentry", "experience": "10 years", "training_required": "yes"}'::jsonb,
   '{"aadhar": "uploaded", "craft_certificate": "uploaded", "work_samples": "uploaded"}'::jsonb,
   'Skill assessment scheduled', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days');

-- Insert journey entries for sample applications
-- For approved application (PMAY)
INSERT INTO application_journey (application_id, status, notes, updated_by, created_at)
SELECT id, 'pending', 'Application submitted', 'system', created_at
FROM applications WHERE scheme_id = 'pmay'
UNION ALL
SELECT id, 'under_review', 'Documents verification started', 'admin', created_at + INTERVAL '30 minutes'
FROM applications WHERE scheme_id = 'pmay'
UNION ALL
SELECT id, 'approved', 'All documents verified. Application approved.', 'admin', created_at + INTERVAL '2 hours'
FROM applications WHERE scheme_id = 'pmay';

-- For rejected application (Ujjwala)
INSERT INTO application_journey (application_id, status, notes, updated_by, created_at)
SELECT id, 'pending', 'Application submitted', 'system', created_at
FROM applications WHERE scheme_id = 'ujjwala'
UNION ALL
SELECT id, 'under_review', 'Documents verification started', 'admin', created_at + INTERVAL '1 hour'
FROM applications WHERE scheme_id = 'ujjwala'
UNION ALL
SELECT id, 'rejected', 'BPL card not provided. Application rejected.', 'admin', created_at + INTERVAL '2 hours'
FROM applications WHERE scheme_id = 'ujjwala';

-- Comments for documentation
COMMENT ON TABLE applications IS 'Stores all scheme applications submitted by users';
COMMENT ON TABLE application_journey IS 'Tracks the complete journey/timeline of each application';
COMMENT ON COLUMN applications.status IS 'Application status: pending, under_review, approved, rejected, completed';
COMMENT ON COLUMN applications.application_data IS 'JSON data specific to the scheme application';
COMMENT ON COLUMN applications.documents IS 'JSON object tracking document upload status';
