-- ============================================
-- Government & Student Help Platform (All India)
-- Complete Database Setup
-- Evolution of MahaHelpDesk → Pan-India Platform
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE (with user_type for categories)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  username TEXT UNIQUE,
  state TEXT,
  district TEXT,
  user_type TEXT DEFAULT 'citizen' CHECK (user_type IN ('student', 'citizen', 'scheme_applicant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. SCHEMES TABLE (with target_audience tags)
-- ============================================
CREATE TABLE IF NOT EXISTS schemes (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  category TEXT NOT NULL,
  description_en TEXT,
  description_hi TEXT,
  eligibility JSONB DEFAULT '{}',
  benefits JSONB DEFAULT '{}',
  how_to_apply JSONB DEFAULT '[]',
  helpline TEXT,
  website TEXT,
  states TEXT[] DEFAULT ARRAY['All India'],
  target_audience TEXT[] DEFAULT ARRAY['citizen'],
  scheme_type TEXT DEFAULT 'government',
  ministry TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  scheme_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'completed')),
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  documents JSONB DEFAULT '{}',
  user_email TEXT,
  full_name TEXT,
  mobile_number TEXT,
  application_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, state, district, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'state', ''),
    COALESCE(NEW.raw_user_meta_data->>'district', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'citizen')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

-- ============================================
-- 5. ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Applications policies  
DROP POLICY IF EXISTS "Users can view their own applications" ON applications;
DROP POLICY IF EXISTS "Users can create applications" ON applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON applications;
DROP POLICY IF EXISTS "Authenticated can view all applications" ON applications;
DROP POLICY IF EXISTS "Authenticated can update applications" ON applications;
CREATE POLICY "Users can view their own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications" ON applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authenticated can view all applications" ON applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can update applications" ON applications FOR UPDATE TO authenticated USING (true);

-- Schemes policies
DROP POLICY IF EXISTS "Anyone can view active schemes" ON schemes;
CREATE POLICY "Anyone can view active schemes" ON schemes FOR SELECT USING (is_active = true);

-- ============================================
-- 6. INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_state ON applications(state);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_state ON profiles(state);
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_is_active ON schemes(is_active);
CREATE INDEX IF NOT EXISTS idx_schemes_target_audience ON schemes USING GIN (target_audience);
CREATE INDEX IF NOT EXISTS idx_schemes_states ON schemes USING GIN (states);

-- ============================================
-- 7. STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('application-documents', 'application-documents', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 8. REAL PAN-INDIA GOVERNMENT SCHEMES DATA
-- ============================================

-- Clear existing and insert fresh data
DELETE FROM schemes;


-- =============================================
-- CENTRAL GOVERNMENT SCHEMES (ALL INDIA)
-- =============================================

-- PM-KISAN (Agriculture - All India)
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pm-kisan',
 'PM-KISAN Samman Nidhi',
 'पीएम-किसान सम्मान निधि',
 'Agriculture',
 'Direct income support of Rs 6,000 per year to all landholding farmer families across India, paid in 3 equal installments of Rs 2,000 each.',
 'भारत भर में सभी भूमिधारक किसान परिवारों को प्रति वर्ष 6,000 रुपये की प्रत्यक्ष आय सहायता, 2,000 रुपये की 3 समान किस्तों में।',
 '{"residence": "All India", "category": "Landholding farmers", "documents": ["Aadhar Card", "Land Records", "Bank Account linked to Aadhar"]}',
 '{"en": ["Rs 6,000 per year", "3 installments of Rs 2,000", "Direct bank transfer", "No income limit"], "hi": ["प्रति वर्ष 6,000 रुपये", "2,000 रुपये की 3 किस्तें", "सीधे बैंक हस्तांतरण"]}',
 '["Register on PM-KISAN portal or visit CSC center", "Submit land records and Aadhar", "Link Aadhar with bank account", "Verify through e-KYC"]',
 '155261',
 'https://pmkisan.gov.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'government',
 'Ministry of Agriculture');

-- Ayushman Bharat (Health - All India)
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('ayushman-bharat',
 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
 'Health',
 'Free health insurance of Rs 5 lakh per family per year for secondary and tertiary hospitalization. Covers 1,929 procedures in 27,000+ empaneled hospitals.',
 'माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष 5 लाख रुपये का मुफ्त स्वास्थ्य बीमा। 27,000+ सूचीबद्ध अस्पतालों में 1,929 प्रक्रियाएं।',
 '{"residence": "All India", "category": "SECC 2011 beneficiaries, RSBY families", "documents": ["Aadhar Card", "Ration Card", "SECC data verification"]}',
 '{"en": ["Rs 5 lakh health cover per family", "Cashless treatment", "1,929 procedures covered", "Pre-existing diseases covered", "No age limit"], "hi": ["प्रति परिवार 5 लाख रुपये स्वास्थ्य कवर", "कैशलेस उपचार", "1,929 प्रक्रियाएं"]}',
 '["Check eligibility on mera.pmjay.gov.in", "Visit empaneled hospital with Aadhar", "Get Ayushman Card generated", "Avail cashless treatment"]',
 '14555',
 'https://pmjay.gov.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'welfare',
 'Ministry of Health');

-- PM Awas Yojana (Housing - All India)
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pmay-urban',
 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
 'प्रधानमंत्री आवास योजना - शहरी',
 'Revenue',
 'Interest subsidy up to Rs 2.67 lakh on home loans for EWS/LIG/MIG categories. Affordable housing for urban poor.',
 'EWS/LIG/MIG श्रेणियों के लिए होम लोन पर 2.67 लाख रुपये तक की ब्याज सब्सिडी। शहरी गरीबों के लिए किफायती आवास।',
 '{"residence": "Urban India", "income": "EWS: up to Rs 3 lakh, LIG: Rs 3-6 lakh, MIG-I: Rs 6-12 lakh, MIG-II: Rs 12-18 lakh", "documents": ["Aadhar Card", "Income Certificate", "No pucca house ownership"]}',
 '{"en": ["Interest subsidy 6.5% for EWS/LIG", "4% for MIG-I", "3% for MIG-II", "Subsidy up to Rs 2.67 lakh"], "hi": ["EWS/LIG के लिए 6.5% ब्याज सब्सिडी", "MIG-I के लिए 4%", "MIG-II के लिए 3%"]}',
 '["Apply through bank/HFC for home loan", "Submit income and Aadhar documents", "Bank verifies eligibility", "Subsidy credited to loan account"]',
 '1800-11-3377',
 'https://pmaymis.gov.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'government',
 'Ministry of Housing');

-- PM Ujjwala Yojana (LPG - All India)
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('ujjwala',
 'Pradhan Mantri Ujjwala Yojana 2.0',
 'प्रधानमंत्री उज्ज्वला योजना 2.0',
 'Health',
 'Free LPG connection to women from BPL households. Includes free first refill and stove.',
 'BPL परिवारों की महिलाओं को मुफ्त LPG कनेक्शन। पहली रिफिल और स्टोव मुफ्त।',
 '{"residence": "All India", "category": "BPL women, SC/ST, PMAY beneficiaries, forest dwellers", "documents": ["Aadhar Card", "BPL Card/Ration Card", "Bank Account"]}',
 '{"en": ["Free LPG connection", "Free first refill", "Free stove", "EMI option for refills"], "hi": ["मुफ्त LPG कनेक्शन", "पहली रिफिल मुफ्त", "मुफ्त स्टोव"]}',
 '["Visit nearest LPG distributor", "Submit Aadhar and ration card", "Complete KYC verification", "Get connection within 7 days"]',
 '1800-266-6696',
 'https://www.pmuy.gov.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'welfare',
 'Ministry of Petroleum');

-- =============================================
-- STUDENT SCHOLARSHIPS (ALL INDIA)
-- =============================================

-- National Scholarship Portal Schemes
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nsp-post-matric-sc',
 'Post Matric Scholarship for SC Students (Central)',
 'अनुसूचित जाति छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति (केंद्रीय)',
 'Education',
 'Full tuition fees + maintenance allowance for SC students studying in Class 11 and above across India.',
 'भारत भर में कक्षा 11 और उससे ऊपर पढ़ने वाले SC छात्रों के लिए पूर्ण ट्यूशन फीस + रखरखाव भत्ता।',
 '{"residence": "All India", "category": "Scheduled Caste", "income": "Below Rs 2.5 lakh annual", "documents": ["Caste Certificate", "Income Certificate", "Previous Marksheets", "Aadhar Card", "Bank Account"]}',
 '{"en": ["100% tuition fees", "Maintenance: Rs 550-1200/month (day scholar)", "Rs 820-1500/month (hosteller)", "Book allowance"], "hi": ["100% ट्यूशन फीस", "रखरखाव: 550-1200 रुपये/माह (डे स्कॉलर)", "820-1500 रुपये/माह (छात्रावासी)"]}',
 '["Register on National Scholarship Portal (scholarships.gov.in)", "Fill application form online", "Upload required documents", "Submit to institute for verification", "Track status online"]',
 '0120-6619540',
 'https://scholarships.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Social Justice');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nsp-post-matric-st',
 'Post Matric Scholarship for ST Students (Central)',
 'अनुसूचित जनजाति छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति (केंद्रीय)',
 'Education',
 'Full tuition fees + maintenance allowance for ST students studying in Class 11 and above across India.',
 'भारत भर में कक्षा 11 और उससे ऊपर पढ़ने वाले ST छात्रों के लिए पूर्ण ट्यूशन फीस + रखरखाव भत्ता।',
 '{"residence": "All India", "category": "Scheduled Tribe", "income": "Below Rs 2.5 lakh annual", "documents": ["Tribe Certificate", "Income Certificate", "Previous Marksheets", "Aadhar Card", "Bank Account"]}',
 '{"en": ["100% tuition fees", "Maintenance: Rs 550-1200/month (day scholar)", "Rs 820-1500/month (hosteller)", "Book allowance"], "hi": ["100% ट्यूशन फीस", "रखरखाव भत्ता", "पुस्तक भत्ता"]}',
 '["Register on National Scholarship Portal", "Fill application form online", "Upload tribe and income certificates", "Institute verification", "Track status online"]',
 '0120-6619540',
 'https://scholarships.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Tribal Affairs');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nsp-post-matric-obc',
 'Post Matric Scholarship for OBC Students (Central)',
 'अन्य पिछड़ा वर्ग छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति (केंद्रीय)',
 'Education',
 'Tuition fees + maintenance allowance for OBC students in Class 11 and above. Income limit Rs 1.5 lakh.',
 'कक्षा 11 और उससे ऊपर के OBC छात्रों के लिए ट्यूशन फीस + रखरखाव भत्ता। आय सीमा 1.5 लाख रुपये।',
 '{"residence": "All India", "category": "Other Backward Classes", "income": "Below Rs 1.5 lakh annual", "documents": ["OBC Certificate", "Income Certificate", "Previous Marksheets", "Aadhar Card"]}',
 '{"en": ["Tuition fees (as per ceiling)", "Maintenance allowance", "For professional and non-professional courses"], "hi": ["ट्यूशन फीस", "रखरखाव भत्ता", "व्यावसायिक और गैर-व्यावसायिक पाठ्यक्रम"]}',
 '["Register on National Scholarship Portal", "Fill application with OBC certificate", "Upload income certificate", "Submit for verification"]',
 '0120-6619540',
 'https://scholarships.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Social Justice');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nsp-minority',
 'Post Matric Scholarship for Minorities',
 'अल्पसंख्यकों के लिए पोस्ट मैट्रिक छात्रवृत्ति',
 'Education',
 'Scholarship for minority students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) in Class 11 to PhD.',
 'कक्षा 11 से PhD तक अल्पसंख्यक छात्रों (मुस्लिम, ईसाई, सिख, बौद्ध, जैन, पारसी) के लिए छात्रवृत्ति।',
 '{"residence": "All India", "category": "Minority communities", "income": "Below Rs 2 lakh annual", "marks": "50% in previous exam", "documents": ["Minority Certificate", "Income Certificate", "Marksheets", "Aadhar"]}',
 '{"en": ["Admission + tuition fees", "Maintenance allowance Rs 5,000-10,000/year", "For Class 11 to PhD"], "hi": ["प्रवेश + ट्यूशन फीस", "रखरखाव भत्ता 5,000-10,000 रुपये/वर्ष"]}',
 '["Register on National Scholarship Portal", "Select Post Matric Scholarship for Minorities", "Upload minority and income certificates", "Submit before deadline"]',
 '0120-6619540',
 'https://scholarships.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Minority Affairs');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nsp-merit-minority',
 'Merit-cum-Means Scholarship for Minorities',
 'अल्पसंख्यकों के लिए मेरिट-कम-मीन्स छात्रवृत्ति',
 'Education',
 'Merit-based scholarship for minority students in professional and technical courses.',
 'व्यावसायिक और तकनीकी पाठ्यक्रमों में अल्पसंख्यक छात्रों के लिए मेरिट-आधारित छात्रवृत्ति।',
 '{"residence": "All India", "category": "Minority communities", "income": "Below Rs 2.5 lakh annual", "marks": "50% in qualifying exam", "documents": ["Minority Certificate", "Income Certificate", "Admission Letter"]}',
 '{"en": ["Full course fee or Rs 20,000 (whichever less)", "Maintenance Rs 10,000/year", "For professional/technical courses"], "hi": ["पूर्ण कोर्स फीस या 20,000 रुपये", "रखरखाव 10,000 रुपये/वर्ष"]}',
 '["Apply on National Scholarship Portal", "Upload admission letter for professional course", "Submit income and minority certificates"]',
 '0120-6619540',
 'https://scholarships.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Minority Affairs');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pm-yasasvi',
 'PM YASASVI Scholarship (PM Young Achievers)',
 'पीएम यशस्वी छात्रवृत्ति',
 'Education',
 'Scholarship for OBC, EBC, DNT students for Class 9-12 in top schools. Covers tuition and hostel.',
 'शीर्ष स्कूलों में कक्षा 9-12 के लिए OBC, EBC, DNT छात्रों के लिए छात्रवृत्ति। ट्यूशन और छात्रावास।',
 '{"residence": "All India", "category": "OBC/EBC/DNT", "income": "Below Rs 2.5 lakh annual", "class": "Class 9 or 11 admission", "documents": ["Category Certificate", "Income Certificate", "School Admission"]}',
 '{"en": ["Rs 75,000/year for Class 9-10", "Rs 1,25,000/year for Class 11-12", "Covers tuition, hostel, books"], "hi": ["कक्षा 9-10 के लिए 75,000 रुपये/वर्ष", "कक्षा 11-12 के लिए 1,25,000 रुपये/वर्ष"]}',
 '["Apply through NTA portal during admission", "Clear YASASVI entrance test", "Submit category and income certificates", "Get admission in empaneled school"]',
 '011-40759000',
 'https://yet.nta.ac.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Social Justice');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('inspire',
 'INSPIRE Scholarship (Innovation in Science)',
 'इंस्पायर छात्रवृत्ति',
 'Education',
 'Scholarship for top 1% students in Class 12 to pursue science courses (BSc, BS, Int. MSc).',
 'विज्ञान पाठ्यक्रमों (BSc, BS, Int. MSc) के लिए कक्षा 12 में शीर्ष 1% छात्रों के लिए छात्रवृत्ति।',
 '{"residence": "All India", "marks": "Top 1% in Class 12 board or JEE/NEET rank", "course": "BSc/BS/Int.MSc in Natural Sciences", "documents": ["Class 12 Marksheet", "Rank Certificate", "Admission Letter"]}',
 '{"en": ["Rs 80,000/year for 5 years", "Summer research attachment Rs 20,000", "For natural and basic sciences"], "hi": ["5 वर्षों के लिए 80,000 रुपये/वर्ष", "ग्रीष्मकालीन शोध 20,000 रुपये"]}',
 '["Apply online on INSPIRE portal", "Upload Class 12 marks and rank proof", "Get institute verification", "Scholarship credited annually"]',
 '011-26aboratory590',
 'https://online-inspire.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Department of Science & Technology');

INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pragati-saksham',
 'PRAGATI & SAKSHAM Scholarship (AICTE)',
 'प्रगति और सक्षम छात्रवृत्ति (AICTE)',
 'Education',
 'PRAGATI for girl students, SAKSHAM for differently-abled students in AICTE approved technical courses.',
 'AICTE अनुमोदित तकनीकी पाठ्यक्रमों में छात्राओं के लिए प्रगति, दिव्यांग छात्रों के लिए सक्षम।',
 '{"residence": "All India", "income": "Below Rs 8 lakh annual", "course": "AICTE approved Diploma/Degree", "documents": ["Income Certificate", "Admission Letter", "Disability Certificate (for SAKSHAM)"]}',
 '{"en": ["Rs 50,000/year", "For 4 years of course", "PRAGATI: 5000 girls/year", "SAKSHAM: 1000 students/year"], "hi": ["50,000 रुपये/वर्ष", "4 वर्षों के लिए"]}',
 '["Apply on AICTE portal during admission", "Upload income and admission proof", "Institute verification required", "Amount credited to bank account"]',
 '011-29581000',
 'https://www.aicte-india.org/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'AICTE');


-- =============================================
-- MORE CENTRAL GOVERNMENT SCHEMES
-- =============================================

-- Skill Development
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pmkvy',
 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
 'प्रधानमंत्री कौशल विकास योजना',
 'Revenue',
 'Free skill training with certification in 300+ job roles. Includes placement assistance.',
 '300+ जॉब रोल में प्रमाणन के साथ मुफ्त कौशल प्रशिक्षण। प्लेसमेंट सहायता शामिल।',
 '{"residence": "All India", "age": "15-45 years", "education": "No minimum (varies by course)", "documents": ["Aadhar Card", "Bank Account"]}',
 '{"en": ["Free training 150-300 hours", "Industry-recognized certification", "Rs 500/day training allowance", "Placement assistance"], "hi": ["150-300 घंटे मुफ्त प्रशिक्षण", "उद्योग-मान्यता प्राप्त प्रमाणन", "500 रुपये/दिन भत्ता"]}',
 '["Find nearest training center on skillindia.gov.in", "Enroll with Aadhar", "Complete training and assessment", "Get certified and placement support"]',
 '1800-123-9626',
 'https://www.pmkvyofficial.org/',
 ARRAY['All India'],
 ARRAY['student', 'citizen'],
 'employment',
 'Ministry of Skill Development');

-- Mudra Loan
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('mudra',
 'Pradhan Mantri MUDRA Yojana',
 'प्रधानमंत्री मुद्रा योजना',
 'Revenue',
 'Collateral-free loans up to Rs 10 lakh for micro enterprises. Three categories: Shishu, Kishore, Tarun.',
 'सूक्ष्म उद्यमों के लिए 10 लाख रुपये तक का बिना गारंटी ऋण। तीन श्रेणियां: शिशु, किशोर, तरुण।',
 '{"residence": "All India", "category": "Non-corporate, non-farm small businesses", "documents": ["Aadhar Card", "Business Plan", "Address Proof", "Bank Account"]}',
 '{"en": ["Shishu: up to Rs 50,000", "Kishore: Rs 50,000 to 5 lakh", "Tarun: Rs 5-10 lakh", "No collateral required"], "hi": ["शिशु: 50,000 रुपये तक", "किशोर: 50,000 से 5 लाख", "तरुण: 5-10 लाख"]}',
 '["Apply at any bank/NBFC/MFI", "Submit business plan and KYC", "No collateral for loans up to Rs 10 lakh", "Loan sanctioned in 7-10 days"]',
 '1800-180-1111',
 'https://www.mudra.org.in/',
 ARRAY['All India'],
 ARRAY['citizen', 'student'],
 'employment',
 'Ministry of Finance');

-- Stand Up India
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('standup-india',
 'Stand Up India Scheme',
 'स्टैंड अप इंडिया योजना',
 'Revenue',
 'Bank loans Rs 10 lakh to Rs 1 crore for SC/ST and women entrepreneurs for greenfield enterprises.',
 'SC/ST और महिला उद्यमियों के लिए ग्रीनफील्ड उद्यमों हेतु 10 लाख से 1 करोड़ रुपये का बैंक ऋण।',
 '{"residence": "All India", "category": "SC/ST or Women", "age": "18 years and above", "documents": ["Caste Certificate (for SC/ST)", "Business Plan", "Aadhar", "Bank Account"]}',
 '{"en": ["Loan Rs 10 lakh to Rs 1 crore", "For manufacturing/services/trading", "Composite loan (term + working capital)", "Margin money 25%"], "hi": ["10 लाख से 1 करोड़ रुपये ऋण", "विनिर्माण/सेवा/व्यापार के लिए"]}',
 '["Apply on Stand Up India portal", "Submit business plan to bank", "Bank evaluates and sanctions", "Margin money support available"]',
 '1800-180-1111',
 'https://www.standupmitra.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'employment',
 'Ministry of Finance');

-- Sukanya Samriddhi
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('sukanya-samriddhi',
 'Sukanya Samriddhi Yojana',
 'सुकन्या समृद्धि योजना',
 'Education',
 'Savings scheme for girl child with 8.2% interest. Tax benefits under 80C. Matures at age 21.',
 'बालिकाओं के लिए 8.2% ब्याज के साथ बचत योजना। 80C के तहत कर लाभ। 21 वर्ष में परिपक्व।',
 '{"residence": "All India", "age": "Girl child below 10 years", "documents": ["Birth Certificate", "Parent Aadhar", "Address Proof"]}',
 '{"en": ["Interest rate 8.2% (Q1 2024)", "Min Rs 250, Max Rs 1.5 lakh/year", "Tax free under 80C", "Partial withdrawal at 18 for education"], "hi": ["8.2% ब्याज दर", "न्यूनतम 250, अधिकतम 1.5 लाख/वर्ष", "80C के तहत कर मुक्त"]}',
 '["Open account at Post Office or Bank", "Submit birth certificate and parent KYC", "Deposit minimum Rs 250", "Continue deposits for 15 years"]',
 '1800-266-6868',
 'https://www.indiapost.gov.in/',
 ARRAY['All India'],
 ARRAY['student', 'citizen'],
 'welfare',
 'Ministry of Finance');

-- PM Vishwakarma
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pm-vishwakarma',
 'PM Vishwakarma Yojana',
 'पीएम विश्वकर्मा योजना',
 'Revenue',
 'Support for traditional artisans and craftspeople. Training, toolkit, credit support up to Rs 3 lakh.',
 'पारंपरिक कारीगरों और शिल्पकारों के लिए सहायता। प्रशिक्षण, टूलकिट, 3 लाख रुपये तक ऋण।',
 '{"residence": "All India", "category": "18 traditional trades (carpenter, blacksmith, goldsmith, potter, etc.)", "age": "18 years and above", "documents": ["Aadhar Card", "Trade proof", "Bank Account"]}',
 '{"en": ["Free skill training 5-15 days", "Toolkit grant Rs 15,000", "Credit up to Rs 3 lakh at 5%", "Digital transaction incentive"], "hi": ["5-15 दिन मुफ्त प्रशिक्षण", "टूलकिट अनुदान 15,000 रुपये", "5% पर 3 लाख तक ऋण"]}',
 '["Register on PM Vishwakarma portal", "Verify through CSC/Gram Panchayat", "Complete skill training", "Apply for toolkit and credit"]',
 '1800-267-7777',
 'https://pmvishwakarma.gov.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'employment',
 'Ministry of MSME');

-- National Means-cum-Merit Scholarship
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nmms',
 'National Means-cum-Merit Scholarship (NMMS)',
 'राष्ट्रीय मीन्स-कम-मेरिट छात्रवृत्ति',
 'Education',
 'Rs 12,000/year scholarship for Class 9-12 students from economically weaker sections studying in government schools.',
 'सरकारी स्कूलों में पढ़ने वाले आर्थिक रूप से कमजोर वर्ग के कक्षा 9-12 छात्रों के लिए 12,000 रुपये/वर्ष छात्रवृत्ति।',
 '{"residence": "All India", "income": "Below Rs 3.5 lakh annual", "marks": "55% in Class 8", "school": "Government/Aided school", "documents": ["Income Certificate", "Class 8 Marksheet", "School Certificate"]}',
 '{"en": ["Rs 12,000 per year", "For Class 9 to 12", "1 lakh scholarships annually", "Continue in government school"], "hi": ["12,000 रुपये प्रति वर्ष", "कक्षा 9 से 12 के लिए", "प्रति वर्ष 1 लाख छात्रवृत्ति"]}',
 '["Appear for state-level NMMS exam in Class 8", "Clear exam with required marks", "Apply through state education department", "Scholarship continues till Class 12"]',
 '011-23382587',
 'https://scholarships.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Education');

-- PM Scholarship for Wards of Ex-Servicemen
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('pmss-exservicemen',
 'PM Scholarship for Wards of Ex-Servicemen/Ex-Coast Guard',
 'पूर्व सैनिकों के बच्चों के लिए पीएम छात्रवृत्ति',
 'Education',
 'Scholarship for children of ex-servicemen, ex-coast guard, and war widows for professional degree courses.',
 'व्यावसायिक डिग्री पाठ्यक्रमों के लिए पूर्व सैनिकों, पूर्व तटरक्षक और युद्ध विधवाओं के बच्चों के लिए छात्रवृत्ति।',
 '{"residence": "All India", "category": "Wards of Ex-Servicemen/Ex-Coast Guard/War Widows", "marks": "60% in qualifying exam", "documents": ["Discharge Certificate", "PPO", "Marksheets", "Aadhar"]}',
 '{"en": ["Rs 3,000/month for boys", "Rs 3,600/month for girls", "For professional degree courses", "5 years duration"], "hi": ["लड़कों के लिए 3,000 रुपये/माह", "लड़कियों के लिए 3,600 रुपये/माह"]}',
 '["Apply on KSB portal (ksb.gov.in)", "Upload discharge certificate and PPO", "Submit admission proof", "Scholarship credited monthly"]',
 '011-26715250',
 'https://ksb.gov.in/',
 ARRAY['All India'],
 ARRAY['student'],
 'scholarship',
 'Ministry of Defence');

-- Atal Pension Yojana
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('apy',
 'Atal Pension Yojana (APY)',
 'अटल पेंशन योजना',
 'Health',
 'Guaranteed pension Rs 1,000-5,000/month after age 60 for unorganized sector workers.',
 'असंगठित क्षेत्र के श्रमिकों के लिए 60 वर्ष के बाद 1,000-5,000 रुपये/माह गारंटीड पेंशन।',
 '{"residence": "All India", "age": "18-40 years", "category": "Unorganized sector workers", "documents": ["Aadhar Card", "Bank Account", "Mobile Number"]}',
 '{"en": ["Pension Rs 1,000-5,000/month", "Government co-contribution 50%", "Spouse gets same pension", "Nominee gets corpus"], "hi": ["1,000-5,000 रुपये/माह पेंशन", "सरकार 50% योगदान", "पति/पत्नी को समान पेंशन"]}',
 '["Open account at any bank", "Choose pension amount (Rs 1,000-5,000)", "Auto-debit from savings account", "Pension starts at age 60"]',
 '1800-889-1030',
 'https://www.npscra.nsdl.co.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'welfare',
 'Ministry of Finance');

-- Free Ration (NFSA)
INSERT INTO schemes (id, name_en, name_hi, category, description_en, description_hi, eligibility, benefits, how_to_apply, helpline, website, states, target_audience, scheme_type, ministry) VALUES
('nfsa',
 'National Food Security Act (Free Ration)',
 'राष्ट्रीय खाद्य सुरक्षा अधिनियम (मुफ्त राशन)',
 'Health',
 'Free 5 kg foodgrains per person per month for 81 crore beneficiaries under PM Garib Kalyan Anna Yojana.',
 'पीएम गरीब कल्याण अन्न योजना के तहत 81 करोड़ लाभार्थियों को प्रति व्यक्ति प्रति माह 5 किलो मुफ्त अनाज।',
 '{"residence": "All India", "category": "Priority Households (PHH), Antyodaya (AAY)", "documents": ["Ration Card", "Aadhar Card"]}',
 '{"en": ["5 kg free rice/wheat per person", "1 kg free dal per family", "For PHH and AAY card holders", "Extended till Dec 2028"], "hi": ["प्रति व्यक्ति 5 किलो मुफ्त चावल/गेहूं", "प्रति परिवार 1 किलो मुफ्त दाल"]}',
 '["Get ration card from state food department", "Link Aadhar with ration card", "Collect ration from nearest fair price shop", "Use One Nation One Ration Card anywhere"]',
 '1967',
 'https://nfsa.gov.in/',
 ARRAY['All India'],
 ARRAY['citizen'],
 'welfare',
 'Ministry of Consumer Affairs');

-- =============================================
-- PERMISSIONS & VERIFICATION
-- =============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Verification queries
SELECT 'Setup Complete!' as status;
SELECT 'Total schemes:' as info, count(*) as count FROM schemes;
SELECT 'Student schemes:' as info, count(*) as count FROM schemes WHERE 'student' = ANY(target_audience);
SELECT 'Citizen schemes:' as info, count(*) as count FROM schemes WHERE 'citizen' = ANY(target_audience);
SELECT 'Scholarship schemes:' as info, count(*) as count FROM schemes WHERE scheme_type = 'scholarship';
