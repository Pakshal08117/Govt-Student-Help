// Government & Student Help Platform - Pan-India Schemes Data
// Real Central Government schemes with user category tags

export type UserCategory = 'student' | 'citizen' | 'scheme_applicant';
export type SchemeType = 'government' | 'scholarship' | 'education' | 'welfare' | 'employment';

export interface Scheme {
  id: string;
  name_en: string;
  name_hi: string;
  category: string;
  description_en: string;
  description_hi: string;
  eligibility: {
    age?: string;
    income?: string;
    residence: string;
    category?: string;
    documents: string[];
  };
  benefits_en: string[];
  benefits_hi: string[];
  howToApply: string[];
  helpline: string;
  website?: string;
  states: string[];
  targetAudience: UserCategory[];
  schemeType: SchemeType;
  ministry?: string;
}

export const schemes: Scheme[] = [
  // =============================================
  // CENTRAL GOVERNMENT SCHEMES (ALL INDIA)
  // =============================================
  {
    id: "pm-kisan",
    name_en: "PM-KISAN Samman Nidhi",
    name_hi: "पीएम-किसान सम्मान निधि",
    category: "Agriculture",
    description_en: "Direct income support of Rs 6,000 per year to all landholding farmer families across India, paid in 3 equal installments of Rs 2,000 each.",
    description_hi: "भारत भर में सभी भूमिधारक किसान परिवारों को प्रति वर्ष 6,000 रुपये की प्रत्यक्ष आय सहायता, 2,000 रुपये की 3 समान किस्तों में।",
    eligibility: {
      residence: "All India",
      category: "Landholding farmers",
      documents: ["Aadhar Card", "Land Records", "Bank Account linked to Aadhar"]
    },
    benefits_en: ["Rs 6,000 per year", "3 installments of Rs 2,000", "Direct bank transfer", "No income limit"],
    benefits_hi: ["प्रति वर्ष 6,000 रुपये", "2,000 रुपये की 3 किस्तें", "सीधे बैंक हस्तांतरण"],
    howToApply: ["Register on PM-KISAN portal or visit CSC center", "Submit land records and Aadhar", "Link Aadhar with bank account", "Verify through e-KYC"],
    helpline: "155261",
    website: "https://pmkisan.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'government',
    ministry: "Ministry of Agriculture"
  },
  {
    id: "pm-fasal-bima",
    name_en: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    name_hi: "प्रधानमंत्री फसल बीमा योजना",
    category: "Agriculture",
    description_en: "Crop insurance scheme providing financial support to farmers in case of crop failure due to natural calamities, pests & diseases.",
    description_hi: "प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल की हानि की स्थिति में किसानों को वित्तीय सहायता प्रदान करने वाली फसल बीमा योजना।",
    eligibility: {
      residence: "All India",
      category: "All farmers (landowner/tenant/sharecropper)",
      documents: ["Aadhar Card", "Land Records", "Sowing Certificate", "Bank Account"]
    },
    benefits_en: ["Premium: 2% for Kharif, 1.5% for Rabi", "Sum insured up to Rs 2 lakh per hectare", "Quick settlement within 60 days", "Coverage for all stages of crop cycle"],
    benefits_hi: ["प्रीमियम: खरीफ के लिए 2%, रबी के लिए 1.5%", "प्रति हेक्टेयर 2 लाख रुपये तक बीमा राशि", "60 दिनों में त्वरित निपटान"],
    howToApply: ["Apply through bank, CSC, or PMFBY portal", "Submit land documents and Aadhar", "Pay premium amount", "Get policy certificate"],
    helpline: "14447",
    website: "https://pmfby.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'government',
    ministry: "Ministry of Agriculture"
  },
  {
    id: "kisan-credit-card",
    name_en: "Kisan Credit Card (KCC)",
    name_hi: "किसान क्रेडिट कार्ड",
    category: "Agriculture",
    description_en: "Credit facility for farmers to meet their agricultural and allied activities expenses. Interest subvention of 3% available.",
    description_hi: "किसानों के लिए कृषि और संबद्ध गतिविधियों के खर्च को पूरा करने के लिए ऋण सुविधा। 3% ब्याज सब्सिडी उपलब्ध।",
    eligibility: {
      residence: "All India",
      category: "All farmers including tenant farmers, oral lessees, sharecroppers",
      documents: ["Aadhar Card", "Land Records", "Bank Account", "Passport Size Photo"]
    },
    benefits_en: ["Credit limit based on cropping pattern", "Interest rate 7% (4% after subvention)", "No collateral up to Rs 1.6 lakh", "Flexible repayment"],
    benefits_hi: ["फसल पैटर्न के आधार पर क्रेडिट सीमा", "ब्याज दर 7% (सब्सिडी के बाद 4%)", "1.6 लाख रुपये तक कोई गारंटी नहीं"],
    howToApply: ["Visit nearest bank branch", "Submit application with documents", "Bank will assess and sanction", "Get KCC within 14 days"],
    helpline: "1800-180-1551",
    website: "https://www.nabard.org/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'government',
    ministry: "Ministry of Agriculture"
  },
  {
    id: "ayushman-bharat",
    name_en: "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)",
    name_hi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    category: "Health",
    description_en: "Free health insurance of Rs 5 lakh per family per year for secondary and tertiary hospitalization. Covers 1,929 procedures in 27,000+ empaneled hospitals.",
    description_hi: "माध्यमिक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष 5 लाख रुपये का मुफ्त स्वास्थ्य बीमा।",
    eligibility: {
      residence: "All India",
      category: "SECC 2011 beneficiaries, RSBY families",
      documents: ["Aadhar Card", "Ration Card", "SECC data verification"]
    },
    benefits_en: ["Rs 5 lakh health cover per family", "Cashless treatment", "1,929 procedures covered", "Pre-existing diseases covered", "No age limit"],
    benefits_hi: ["प्रति परिवार 5 लाख रुपये स्वास्थ्य कवर", "कैशलेस उपचार", "1,929 प्रक्रियाएं"],
    howToApply: ["Check eligibility on mera.pmjay.gov.in", "Visit empaneled hospital with Aadhar", "Get Ayushman Card generated", "Avail cashless treatment"],
    helpline: "14555",
    website: "https://pmjay.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Health"
  },
  {
    id: "pmsby",
    name_en: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    name_hi: "प्रधानमंत्री सुरक्षा बीमा योजना",
    category: "Health",
    description_en: "Accidental death and disability insurance scheme. Premium Rs 20 per year for Rs 2 lakh coverage.",
    description_hi: "दुर्घटना मृत्यु और विकलांगता बीमा योजना। 2 लाख रुपये कवरेज के लिए प्रति वर्ष 20 रुपये प्रीमियम।",
    eligibility: {
      age: "18-70 years",
      residence: "All India",
      documents: ["Aadhar Card", "Bank Account", "Auto-debit consent"]
    },
    benefits_en: ["Rs 2 lakh for accidental death", "Rs 1 lakh for permanent total disability", "Rs 50,000 for permanent partial disability", "Premium only Rs 20/year"],
    benefits_hi: ["दुर्घटना मृत्यु के लिए 2 लाख रुपये", "स्थायी पूर्ण विकलांगता के लिए 1 लाख रुपये", "केवल 20 रुपये/वर्ष प्रीमियम"],
    howToApply: ["Visit bank with Aadhar and bank account", "Fill enrollment form", "Give auto-debit consent", "Premium deducted annually"],
    helpline: "1800-180-1111",
    website: "https://www.jansuraksha.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Finance"
  },
  {
    id: "pmjjby",
    name_en: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    name_hi: "प्रधानमंत्री जीवन ज्योति बीमा योजना",
    category: "Health",
    description_en: "Life insurance scheme providing Rs 2 lakh coverage for death due to any reason. Premium Rs 436 per year.",
    description_hi: "किसी भी कारण से मृत्यु के लिए 2 लाख रुपये कवरेज प्रदान करने वाली जीवन बीमा योजना। प्रति वर्ष 436 रुपये प्रीमियम।",
    eligibility: {
      age: "18-50 years (coverage till 55)",
      residence: "All India",
      documents: ["Aadhar Card", "Bank Account", "Auto-debit consent"]
    },
    benefits_en: ["Rs 2 lakh for death due to any reason", "Coverage till age 55", "Renewable annually", "No medical examination required"],
    benefits_hi: ["किसी भी कारण से मृत्यु के लिए 2 लाख रुपये", "55 वर्ष की आयु तक कवरेज", "वार्षिक नवीकरणीय"],
    howToApply: ["Visit bank with Aadhar and bank account", "Fill enrollment form", "Give auto-debit consent", "Premium deducted annually"],
    helpline: "1800-180-1111",
    website: "https://www.jansuraksha.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Finance"
  },
  {
    id: "pmay-urban",
    name_en: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
    name_hi: "प्रधानमंत्री आवास योजना - शहरी",
    category: "Revenue",
    description_en: "Interest subsidy up to Rs 2.67 lakh on home loans for EWS/LIG/MIG categories. Affordable housing for urban poor.",
    description_hi: "EWS/LIG/MIG श्रेणियों के लिए होम लोन पर 2.67 लाख रुपये तक की ब्याज सब्सिडी।",
    eligibility: {
      residence: "Urban India",
      income: "EWS: up to Rs 3 lakh, LIG: Rs 3-6 lakh, MIG-I: Rs 6-12 lakh",
      documents: ["Aadhar Card", "Income Certificate", "No pucca house ownership proof"]
    },
    benefits_en: ["Interest subsidy 6.5% for EWS/LIG", "4% for MIG-I", "3% for MIG-II", "Subsidy up to Rs 2.67 lakh"],
    benefits_hi: ["EWS/LIG के लिए 6.5% ब्याज सब्सिडी", "MIG-I के लिए 4%", "MIG-II के लिए 3%"],
    howToApply: ["Apply through bank/HFC for home loan", "Submit income and Aadhar documents", "Bank verifies eligibility", "Subsidy credited to loan account"],
    helpline: "1800-11-3377",
    website: "https://pmaymis.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'government',
    ministry: "Ministry of Housing"
  },
  {
    id: "ujjwala",
    name_en: "Pradhan Mantri Ujjwala Yojana 2.0",
    name_hi: "प्रधानमंत्री उज्ज्वला योजना 2.0",
    category: "Health",
    description_en: "Free LPG connection to women from BPL households. Includes free first refill and stove.",
    description_hi: "BPL परिवारों की महिलाओं को मुफ्त LPG कनेक्शन। पहली रिफिल और स्टोव मुफ्त।",
    eligibility: {
      residence: "All India",
      category: "BPL women, SC/ST, PMAY beneficiaries, forest dwellers",
      documents: ["Aadhar Card", "BPL Card/Ration Card", "Bank Account"]
    },
    benefits_en: ["Free LPG connection", "Free first refill", "Free stove", "EMI option for refills"],
    benefits_hi: ["मुफ्त LPG कनेक्शन", "पहली रिफिल मुफ्त", "मुफ्त स्टोव"],
    howToApply: ["Visit nearest LPG distributor", "Submit Aadhar and ration card", "Complete KYC verification", "Get connection within 7 days"],
    helpline: "1800-266-6696",
    website: "https://www.pmuy.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Petroleum"
  },

  // =============================================
  // STUDENT SCHOLARSHIPS (ALL INDIA)
  // =============================================
  {
    id: "nsp-post-matric-sc",
    name_en: "Post Matric Scholarship for SC Students (Central)",
    name_hi: "अनुसूचित जाति छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति",
    category: "Education",
    description_en: "Full tuition fees + maintenance allowance for SC students studying in Class 11 and above across India.",
    description_hi: "भारत भर में कक्षा 11 और उससे ऊपर पढ़ने वाले SC छात्रों के लिए पूर्ण ट्यूशन फीस + रखरखाव भत्ता।",
    eligibility: {
      residence: "All India",
      category: "Scheduled Caste",
      income: "Below Rs 2.5 lakh annual",
      documents: ["Caste Certificate", "Income Certificate", "Previous Marksheets", "Aadhar Card", "Bank Account"]
    },
    benefits_en: ["100% tuition fees", "Maintenance: Rs 550-1200/month (day scholar)", "Rs 820-1500/month (hosteller)", "Book allowance"],
    benefits_hi: ["100% ट्यूशन फीस", "रखरखाव: 550-1200 रुपये/माह (डे स्कॉलर)", "820-1500 रुपये/माह (छात्रावासी)"],
    howToApply: ["Register on National Scholarship Portal (scholarships.gov.in)", "Fill application form online", "Upload required documents", "Submit to institute for verification", "Track status online"],
    helpline: "0120-6619540",
    website: "https://scholarships.gov.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Ministry of Social Justice"
  },
  {
    id: "nsp-post-matric-st",
    name_en: "Post Matric Scholarship for ST Students (Central)",
    name_hi: "अनुसूचित जनजाति छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति",
    category: "Education",
    description_en: "Full tuition fees + maintenance allowance for ST students studying in Class 11 and above across India.",
    description_hi: "भारत भर में कक्षा 11 और उससे ऊपर पढ़ने वाले ST छात्रों के लिए पूर्ण ट्यूशन फीस + रखरखाव भत्ता।",
    eligibility: {
      residence: "All India",
      category: "Scheduled Tribe",
      income: "Below Rs 2.5 lakh annual",
      documents: ["Tribe Certificate", "Income Certificate", "Previous Marksheets", "Aadhar Card", "Bank Account"]
    },
    benefits_en: ["100% tuition fees", "Maintenance: Rs 550-1200/month (day scholar)", "Rs 820-1500/month (hosteller)", "Book allowance"],
    benefits_hi: ["100% ट्यूशन फीस", "रखरखाव भत्ता", "पुस्तक भत्ता"],
    howToApply: ["Register on National Scholarship Portal", "Fill application form online", "Upload tribe and income certificates", "Institute verification", "Track status online"],
    helpline: "0120-6619540",
    website: "https://scholarships.gov.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Ministry of Tribal Affairs"
  },
  {
    id: "nsp-post-matric-obc",
    name_en: "Post Matric Scholarship for OBC Students (Central)",
    name_hi: "अन्य पिछड़ा वर्ग छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति",
    category: "Education",
    description_en: "Tuition fees + maintenance allowance for OBC students in Class 11 and above. Income limit Rs 1.5 lakh.",
    description_hi: "कक्षा 11 और उससे ऊपर के OBC छात्रों के लिए ट्यूशन फीस + रखरखाव भत्ता। आय सीमा 1.5 लाख रुपये।",
    eligibility: {
      residence: "All India",
      category: "Other Backward Classes",
      income: "Below Rs 1.5 lakh annual",
      documents: ["OBC Certificate", "Income Certificate", "Previous Marksheets", "Aadhar Card"]
    },
    benefits_en: ["Tuition fees (as per ceiling)", "Maintenance allowance", "For professional and non-professional courses"],
    benefits_hi: ["ट्यूशन फीस", "रखरखाव भत्ता", "व्यावसायिक और गैर-व्यावसायिक पाठ्यक्रम"],
    howToApply: ["Register on National Scholarship Portal", "Fill application with OBC certificate", "Upload income certificate", "Submit for verification"],
    helpline: "0120-6619540",
    website: "https://scholarships.gov.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Ministry of Social Justice"
  },
  {
    id: "nsp-minority",
    name_en: "Post Matric Scholarship for Minorities",
    name_hi: "अल्पसंख्यकों के लिए पोस्ट मैट्रिक छात्रवृत्ति",
    category: "Education",
    description_en: "Scholarship for minority students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) in Class 11 to PhD.",
    description_hi: "कक्षा 11 से PhD तक अल्पसंख्यक छात्रों के लिए छात्रवृत्ति।",
    eligibility: {
      residence: "All India",
      category: "Minority communities",
      income: "Below Rs 2 lakh annual",
      documents: ["Minority Certificate", "Income Certificate", "Marksheets", "Aadhar"]
    },
    benefits_en: ["Admission + tuition fees", "Maintenance allowance Rs 5,000-10,000/year", "For Class 11 to PhD"],
    benefits_hi: ["प्रवेश + ट्यूशन फीस", "रखरखाव भत्ता 5,000-10,000 रुपये/वर्ष"],
    howToApply: ["Register on National Scholarship Portal", "Select Post Matric Scholarship for Minorities", "Upload minority and income certificates", "Submit before deadline"],
    helpline: "0120-6619540",
    website: "https://scholarships.gov.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Ministry of Minority Affairs"
  },
  {
    id: "pm-yasasvi",
    name_en: "PM YASASVI Scholarship",
    name_hi: "पीएम यशस्वी छात्रवृत्ति",
    category: "Education",
    description_en: "Scholarship for OBC, EBC, DNT students for Class 9-12 in top schools. Covers tuition and hostel.",
    description_hi: "शीर्ष स्कूलों में कक्षा 9-12 के लिए OBC, EBC, DNT छात्रों के लिए छात्रवृत्ति।",
    eligibility: {
      residence: "All India",
      category: "OBC/EBC/DNT",
      income: "Below Rs 2.5 lakh annual",
      documents: ["Category Certificate", "Income Certificate", "School Admission"]
    },
    benefits_en: ["Rs 75,000/year for Class 9-10", "Rs 1,25,000/year for Class 11-12", "Covers tuition, hostel, books"],
    benefits_hi: ["कक्षा 9-10 के लिए 75,000 रुपये/वर्ष", "कक्षा 11-12 के लिए 1,25,000 रुपये/वर्ष"],
    howToApply: ["Apply through NTA portal during admission", "Clear YASASVI entrance test", "Submit category and income certificates", "Get admission in empaneled school"],
    helpline: "011-40759000",
    website: "https://yet.nta.ac.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Ministry of Social Justice"
  },
  {
    id: "inspire",
    name_en: "INSPIRE Scholarship (Innovation in Science)",
    name_hi: "इंस्पायर छात्रवृत्ति",
    category: "Education",
    description_en: "Scholarship for top 1% students in Class 12 to pursue science courses (BSc, BS, Int. MSc).",
    description_hi: "विज्ञान पाठ्यक्रमों के लिए कक्षा 12 में शीर्ष 1% छात्रों के लिए छात्रवृत्ति।",
    eligibility: {
      residence: "All India",
      category: "Top 1% in Class 12 board or JEE/NEET rank",
      documents: ["Class 12 Marksheet", "Rank Certificate", "Admission Letter"]
    },
    benefits_en: ["Rs 80,000/year for 5 years", "Summer research attachment Rs 20,000", "For natural and basic sciences"],
    benefits_hi: ["5 वर्षों के लिए 80,000 रुपये/वर्ष", "ग्रीष्मकालीन शोध 20,000 रुपये"],
    howToApply: ["Apply online on INSPIRE portal", "Upload Class 12 marks and rank proof", "Get institute verification", "Scholarship credited annually"],
    helpline: "011-26590590",
    website: "https://online-inspire.gov.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Department of Science & Technology"
  },
  {
    id: "pragati-saksham",
    name_en: "PRAGATI & SAKSHAM Scholarship (AICTE)",
    name_hi: "प्रगति और सक्षम छात्रवृत्ति",
    category: "Education",
    description_en: "PRAGATI for girl students, SAKSHAM for differently-abled students in AICTE approved technical courses.",
    description_hi: "AICTE अनुमोदित तकनीकी पाठ्यक्रमों में छात्राओं के लिए प्रगति, दिव्यांग छात्रों के लिए सक्षम।",
    eligibility: {
      residence: "All India",
      income: "Below Rs 8 lakh annual",
      documents: ["Income Certificate", "Admission Letter", "Disability Certificate (for SAKSHAM)"]
    },
    benefits_en: ["Rs 50,000/year", "For 4 years of course", "PRAGATI: 5000 girls/year", "SAKSHAM: 1000 students/year"],
    benefits_hi: ["50,000 रुपये/वर्ष", "4 वर्षों के लिए"],
    howToApply: ["Apply on AICTE portal during admission", "Upload income and admission proof", "Institute verification required", "Amount credited to bank account"],
    helpline: "011-29581000",
    website: "https://www.aicte-india.org/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "AICTE"
  },
  {
    id: "nmms",
    name_en: "National Means-cum-Merit Scholarship (NMMS)",
    name_hi: "राष्ट्रीय मीन्स-कम-मेरिट छात्रवृत्ति",
    category: "Education",
    description_en: "Rs 12,000/year scholarship for Class 9-12 students from economically weaker sections studying in government schools.",
    description_hi: "सरकारी स्कूलों में पढ़ने वाले आर्थिक रूप से कमजोर वर्ग के कक्षा 9-12 छात्रों के लिए 12,000 रुपये/वर्ष छात्रवृत्ति।",
    eligibility: {
      residence: "All India",
      income: "Below Rs 3.5 lakh annual",
      documents: ["Income Certificate", "Class 8 Marksheet", "School Certificate"]
    },
    benefits_en: ["Rs 12,000 per year", "For Class 9 to 12", "1 lakh scholarships annually", "Continue in government school"],
    benefits_hi: ["12,000 रुपये प्रति वर्ष", "कक्षा 9 से 12 के लिए", "प्रति वर्ष 1 लाख छात्रवृत्ति"],
    howToApply: ["Appear for state-level NMMS exam in Class 8", "Clear exam with required marks", "Apply through state education department", "Scholarship continues till Class 12"],
    helpline: "011-23382587",
    website: "https://scholarships.gov.in/",
    states: ["All India"],
    targetAudience: ['student'],
    schemeType: 'scholarship',
    ministry: "Ministry of Education"
  },

  // =============================================
  // EMPLOYMENT & SKILL SCHEMES
  // =============================================
  {
    id: "pmkvy",
    name_en: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    name_hi: "प्रधानमंत्री कौशल विकास योजना",
    category: "Revenue",
    description_en: "Free skill training with certification in 300+ job roles. Includes placement assistance.",
    description_hi: "300+ जॉब रोल में प्रमाणन के साथ मुफ्त कौशल प्रशिक्षण। प्लेसमेंट सहायता शामिल।",
    eligibility: {
      residence: "All India",
      age: "15-45 years",
      documents: ["Aadhar Card", "Bank Account"]
    },
    benefits_en: ["Free training 150-300 hours", "Industry-recognized certification", "Rs 500/day training allowance", "Placement assistance"],
    benefits_hi: ["150-300 घंटे मुफ्त प्रशिक्षण", "उद्योग-मान्यता प्राप्त प्रमाणन", "500 रुपये/दिन भत्ता"],
    howToApply: ["Find nearest training center on skillindia.gov.in", "Enroll with Aadhar", "Complete training and assessment", "Get certified and placement support"],
    helpline: "1800-123-9626",
    website: "https://www.pmkvyofficial.org/",
    states: ["All India"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'employment',
    ministry: "Ministry of Skill Development"
  },
  {
    id: "mudra",
    name_en: "Pradhan Mantri MUDRA Yojana",
    name_hi: "प्रधानमंत्री मुद्रा योजना",
    category: "Revenue",
    description_en: "Collateral-free loans up to Rs 10 lakh for micro enterprises. Three categories: Shishu, Kishore, Tarun.",
    description_hi: "सूक्ष्म उद्यमों के लिए 10 लाख रुपये तक का बिना गारंटी ऋण।",
    eligibility: {
      residence: "All India",
      category: "Non-corporate, non-farm small businesses",
      documents: ["Aadhar Card", "Business Plan", "Address Proof", "Bank Account"]
    },
    benefits_en: ["Shishu: up to Rs 50,000", "Kishore: Rs 50,000 to 5 lakh", "Tarun: Rs 5-10 lakh", "No collateral required"],
    benefits_hi: ["शिशु: 50,000 रुपये तक", "किशोर: 50,000 से 5 लाख", "तरुण: 5-10 लाख"],
    howToApply: ["Apply at any bank/NBFC/MFI", "Submit business plan and KYC", "No collateral for loans up to Rs 10 lakh", "Loan sanctioned in 7-10 days"],
    helpline: "1800-180-1111",
    website: "https://www.mudra.org.in/",
    states: ["All India"],
    targetAudience: ['citizen', 'student'],
    schemeType: 'employment',
    ministry: "Ministry of Finance"
  },
  {
    id: "standup-india",
    name_en: "Stand Up India Scheme",
    name_hi: "स्टैंड अप इंडिया योजना",
    category: "Revenue",
    description_en: "Bank loans Rs 10 lakh to Rs 1 crore for SC/ST and women entrepreneurs for greenfield enterprises.",
    description_hi: "SC/ST और महिला उद्यमियों के लिए ग्रीनफील्ड उद्यमों हेतु 10 लाख से 1 करोड़ रुपये का बैंक ऋण।",
    eligibility: {
      residence: "All India",
      category: "SC/ST or Women",
      age: "18 years and above",
      documents: ["Caste Certificate (for SC/ST)", "Business Plan", "Aadhar", "Bank Account"]
    },
    benefits_en: ["Loan Rs 10 lakh to Rs 1 crore", "For manufacturing/services/trading", "Composite loan (term + working capital)", "Margin money 25%"],
    benefits_hi: ["10 लाख से 1 करोड़ रुपये ऋण", "विनिर्माण/सेवा/व्यापार के लिए"],
    howToApply: ["Apply on Stand Up India portal", "Submit business plan to bank", "Bank evaluates and sanctions", "Margin money support available"],
    helpline: "1800-180-1111",
    website: "https://www.standupmitra.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'employment',
    ministry: "Ministry of Finance"
  },
  {
    id: "pm-vishwakarma",
    name_en: "PM Vishwakarma Yojana",
    name_hi: "पीएम विश्वकर्मा योजना",
    category: "Revenue",
    description_en: "Support for traditional artisans and craftspeople. Training, toolkit, credit support up to Rs 3 lakh.",
    description_hi: "पारंपरिक कारीगरों और शिल्पकारों के लिए सहायता। प्रशिक्षण, टूलकिट, 3 लाख रुपये तक ऋण।",
    eligibility: {
      residence: "All India",
      category: "18 traditional trades (carpenter, blacksmith, goldsmith, potter, etc.)",
      age: "18 years and above",
      documents: ["Aadhar Card", "Trade proof", "Bank Account"]
    },
    benefits_en: ["Free skill training 5-15 days", "Toolkit grant Rs 15,000", "Credit up to Rs 3 lakh at 5%", "Digital transaction incentive"],
    benefits_hi: ["5-15 दिन मुफ्त प्रशिक्षण", "टूलकिट अनुदान 15,000 रुपये", "5% पर 3 लाख तक ऋण"],
    howToApply: ["Register on PM Vishwakarma portal", "Verify through CSC/Gram Panchayat", "Complete skill training", "Apply for toolkit and credit"],
    helpline: "1800-267-7777",
    website: "https://pmvishwakarma.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'employment',
    ministry: "Ministry of MSME"
  },

  // =============================================
  // WELFARE SCHEMES
  // =============================================
  {
    id: "sukanya-samriddhi",
    name_en: "Sukanya Samriddhi Yojana",
    name_hi: "सुकन्या समृद्धि योजना",
    category: "Education",
    description_en: "Savings scheme for girl child with 8.2% interest. Tax benefits under 80C. Matures at age 21.",
    description_hi: "बालिकाओं के लिए 8.2% ब्याज के साथ बचत योजना। 80C के तहत कर लाभ।",
    eligibility: {
      residence: "All India",
      age: "Girl child below 10 years",
      documents: ["Birth Certificate", "Parent Aadhar", "Address Proof"]
    },
    benefits_en: ["Interest rate 8.2% (Q1 2024)", "Min Rs 250, Max Rs 1.5 lakh/year", "Tax free under 80C", "Partial withdrawal at 18 for education"],
    benefits_hi: ["8.2% ब्याज दर", "न्यूनतम 250, अधिकतम 1.5 लाख/वर्ष", "80C के तहत कर मुक्त"],
    howToApply: ["Open account at Post Office or Bank", "Submit birth certificate and parent KYC", "Deposit minimum Rs 250", "Continue deposits for 15 years"],
    helpline: "1800-266-6868",
    website: "https://www.indiapost.gov.in/",
    states: ["All India"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Finance"
  },
  {
    id: "apy",
    name_en: "Atal Pension Yojana (APY)",
    name_hi: "अटल पेंशन योजना",
    category: "Health",
    description_en: "Guaranteed pension Rs 1,000-5,000/month after age 60 for unorganized sector workers.",
    description_hi: "असंगठित क्षेत्र के श्रमिकों के लिए 60 वर्ष के बाद 1,000-5,000 रुपये/माह गारंटीड पेंशन।",
    eligibility: {
      residence: "All India",
      age: "18-40 years",
      category: "Unorganized sector workers",
      documents: ["Aadhar Card", "Bank Account", "Mobile Number"]
    },
    benefits_en: ["Pension Rs 1,000-5,000/month", "Government co-contribution 50%", "Spouse gets same pension", "Nominee gets corpus"],
    benefits_hi: ["1,000-5,000 रुपये/माह पेंशन", "सरकार 50% योगदान", "पति/पत्नी को समान पेंशन"],
    howToApply: ["Open account at any bank", "Choose pension amount (Rs 1,000-5,000)", "Auto-debit from savings account", "Pension starts at age 60"],
    helpline: "1800-889-1030",
    website: "https://www.npscra.nsdl.co.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Finance"
  },
  {
    id: "nfsa",
    name_en: "National Food Security Act (Free Ration)",
    name_hi: "राष्ट्रीय खाद्य सुरक्षा अधिनियम (मुफ्त राशन)",
    category: "Health",
    description_en: "Free 5 kg foodgrains per person per month for 81 crore beneficiaries under PM Garib Kalyan Anna Yojana.",
    description_hi: "पीएम गरीब कल्याण अन्न योजना के तहत 81 करोड़ लाभार्थियों को प्रति व्यक्ति प्रति माह 5 किलो मुफ्त अनाज।",
    eligibility: {
      residence: "All India",
      category: "Priority Households (PHH), Antyodaya (AAY)",
      documents: ["Ration Card", "Aadhar Card"]
    },
    benefits_en: ["5 kg free rice/wheat per person", "1 kg free dal per family", "For PHH and AAY card holders", "Extended till Dec 2028"],
    benefits_hi: ["प्रति व्यक्ति 5 किलो मुफ्त चावल/गेहूं", "प्रति परिवार 1 किलो मुफ्त दाल"],
    howToApply: ["Get ration card from state food department", "Link Aadhar with ration card", "Collect ration from nearest fair price shop", "Use One Nation One Ration Card anywhere"],
    helpline: "1967",
    website: "https://nfsa.gov.in/",
    states: ["All India"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Ministry of Consumer Affairs"
  },

  // =============================================
  // STATE-WISE SCHEMES (MAJOR STATES)
  // =============================================
  
  // MAHARASHTRA STATE SCHEMES
  {
    id: "maha-sharad-pawar-gram-samruddhata",
    name_en: "Sharad Pawar Gram Samruddhata Yojana (Maharashtra)",
    name_hi: "शरद पवार ग्राम समृद्धता योजना (महाराष्ट्र)",
    category: "Agriculture",
    description_en: "Comprehensive rural development scheme for Maharashtra villages with focus on water conservation, agriculture, and employment.",
    description_hi: "जल संरक्षण, कृषि और रोजगार पर ध्यान देने के साथ महाराष्ट्र के गांवों के लिए व्यापक ग्रामीण विकास योजना।",
    eligibility: {
      residence: "Maharashtra",
      category: "Rural residents, farmers, SHGs",
      documents: ["Aadhar Card", "Residence Proof", "Land Records (if applicable)"]
    },
    benefits_en: ["Water conservation projects", "Farm pond construction", "Skill development programs", "Employment generation"],
    benefits_hi: ["जल संरक्षण परियोजनाएं", "फार्म पॉन्ड निर्माण", "कौशल विकास कार्यक्रम"],
    howToApply: ["Apply through Gram Panchayat", "Submit proposal to Block Development Office", "Community participation required", "Implementation through local committees"],
    helpline: "1077",
    website: "https://rural.maharashtra.gov.in/",
    states: ["Maharashtra"],
    targetAudience: ['citizen'],
    schemeType: 'government',
    ministry: "Rural Development Department, Maharashtra"
  },
  {
    id: "maha-lek-ladki",
    name_en: "Lek Ladki Yojana (Maharashtra)",
    name_hi: "लेक लाडकी योजना (महाराष्ट्र)",
    category: "Education",
    description_en: "Financial assistance for girl child education in Maharashtra. Rs 75,000 given in installments from birth to 18 years.",
    description_hi: "महाराष्ट्र में बालिका शिक्षा के लिए वित्तीय सहायता। जन्म से 18 वर्ष तक किस्तों में 75,000 रुपये दिए जाते हैं।",
    eligibility: {
      residence: "Maharashtra",
      category: "Girl child born after 1st April 2023",
      income: "Family income below Rs 1 lakh annually",
      documents: ["Birth Certificate", "Aadhar Card", "Income Certificate", "Bank Account"]
    },
    benefits_en: ["Rs 5,000 at birth", "Rs 6,000 at 1 year", "Rs 7,000 at 6 years", "Rs 8,000 at 11 years", "Rs 25,000 at 18 years"],
    benefits_hi: ["जन्म पर 5,000 रुपये", "1 वर्ष पर 6,000 रुपये", "6 वर्ष पर 7,000 रुपये", "11 वर्ष पर 8,000 रुपये", "18 वर्ष पर 25,000 रुपये"],
    howToApply: ["Register at Anganwadi center", "Submit birth certificate and documents", "Open bank account in girl's name", "Receive installments automatically"],
    helpline: "1077",
    website: "https://womenchild.maharashtra.gov.in/",
    states: ["Maharashtra"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'welfare',
    ministry: "Women & Child Development, Maharashtra"
  },

  // UTTAR PRADESH STATE SCHEMES
  {
    id: "up-kanya-sumangala",
    name_en: "Mukhyamantri Kanya Sumangala Yojana (UP)",
    name_hi: "मुख्यमंत्री कन्या सुमंगला योजना (उत्तर प्रदेश)",
    category: "Education",
    description_en: "Financial assistance for girl child development in UP. Rs 25,000 given in 6 installments from birth to graduation.",
    description_hi: "उत्तर प्रदेश में बालिका विकास के लिए वित्तीय सहायता। जन्म से स्नातक तक 6 किस्तों में 25,000 रुपये।",
    eligibility: {
      residence: "Uttar Pradesh",
      category: "Girl child",
      income: "Family income below Rs 3 lakh annually",
      documents: ["Birth Certificate", "Aadhar Card", "Income Certificate", "Educational Certificates"]
    },
    benefits_en: ["Rs 2,000 at birth", "Rs 1,000 at 1 year vaccination", "Rs 2,000 at Class 1 admission", "Rs 2,000 at Class 6", "Rs 3,000 at Class 9", "Rs 15,000 at graduation"],
    benefits_hi: ["जन्म पर 2,000 रुपये", "1 वर्ष टीकाकरण पर 1,000 रुपये", "कक्षा 1 में 2,000 रुपये", "कक्षा 6 में 2,000 रुपये", "कक्षा 9 में 3,000 रुपये", "स्नातक पर 15,000 रुपये"],
    howToApply: ["Apply online on mksy.up.gov.in", "Submit required documents", "Verification by concerned officer", "Amount credited to bank account"],
    helpline: "181",
    website: "https://mksy.up.gov.in/",
    states: ["Uttar Pradesh"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'welfare',
    ministry: "Women & Child Development, UP"
  },

  // RAJASTHAN STATE SCHEMES
  {
    id: "raj-palanhar",
    name_en: "Palanhar Yojana (Rajasthan)",
    name_hi: "पालनहार योजना (राजस्थान)",
    category: "Health",
    description_en: "Financial assistance for orphan children and children of specific categories in Rajasthan.",
    description_hi: "राजस्थान में अनाथ बच्चों और विशिष्ट श्रेणियों के बच्चों के लिए वित्तीय सहायता।",
    eligibility: {
      residence: "Rajasthan",
      category: "Orphan children, children of widow, divorced women, etc.",
      age: "0-18 years",
      documents: ["Death Certificate (if orphan)", "Aadhar Card", "Income Certificate", "Caste Certificate"]
    },
    benefits_en: ["Rs 1,500/month for 0-6 years", "Rs 2,500/month for 6-18 years", "Free education and health care", "Additional support for higher education"],
    benefits_hi: ["0-6 वर्ष के लिए 1,500 रुपये/माह", "6-18 वर्ष के लिए 2,500 रुपये/माह", "मुफ्त शिक्षा और स्वास्थ्य देखभाल"],
    howToApply: ["Apply at nearest e-Mitra center", "Submit required documents", "Verification by Social Justice Department", "Monthly amount credited to account"],
    helpline: "181",
    website: "https://sje.rajasthan.gov.in/",
    states: ["Rajasthan"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'welfare',
    ministry: "Social Justice & Empowerment, Rajasthan"
  },

  // GUJARAT STATE SCHEMES
  {
    id: "guj-vahli-dikri",
    name_en: "Vahli Dikri Yojana (Gujarat)",
    name_hi: "वहली दिकरी योजना (गुजरात)",
    category: "Education",
    description_en: "Financial assistance for girl child education in Gujarat. Rs 1.1 lakh given for first two girl children.",
    description_hi: "गुजरात में बालिका शिक्षा के लिए वित्तीय सहायता। पहली दो बालिकाओं के लिए 1.1 लाख रुपये।",
    eligibility: {
      residence: "Gujarat",
      category: "First two girl children",
      income: "Family income below Rs 2 lakh annually",
      documents: ["Birth Certificate", "Aadhar Card", "Income Certificate", "Caste Certificate"]
    },
    benefits_en: ["Rs 4,000 at birth", "Rs 6,000 at 1 year", "Rs 6,000 at Class 1", "Rs 9,000 at Class 9", "Rs 10,000 at Class 10", "Rs 25,000 at Class 12", "Rs 50,000 at graduation"],
    benefits_hi: ["जन्म पर 4,000 रुपये", "1 वर्ष पर 6,000 रुपये", "कक्षा 1 में 6,000 रुपये", "कक्षा 9 में 9,000 रुपये", "कक्षा 10 में 10,000 रुपये", "कक्षा 12 में 25,000 रुपये", "स्नातक पर 50,000 रुपये"],
    howToApply: ["Apply online on digitalgujarat.gov.in", "Submit documents at Anganwadi", "Verification by concerned department", "Amount deposited in girl's account"],
    helpline: "1077",
    website: "https://digitalgujarat.gov.in/",
    states: ["Gujarat"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'welfare',
    ministry: "Women & Child Development, Gujarat"
  },

  // KARNATAKA STATE SCHEMES
  {
    id: "kar-gruha-lakshmi",
    name_en: "Gruha Lakshmi Yojana (Karnataka)",
    name_hi: "गृह लक्ष्मी योजना (कर्नाटक)",
    category: "Health",
    description_en: "Monthly financial assistance to women heads of families in Karnataka. Rs 2,000 per month to eligible women.",
    description_hi: "कर्नाटक में परिवार की महिला मुखिया को मासिक वित्तीय सहायता। पात्र महिलाओं को 2,000 रुपये प्रति माह।",
    eligibility: {
      residence: "Karnataka",
      category: "Women heads of families",
      income: "Family income below Rs 2.5 lakh annually",
      documents: ["Aadhar Card", "Ration Card", "Income Certificate", "Bank Account"]
    },
    benefits_en: ["Rs 2,000 per month", "Direct bank transfer", "For women aged 21-59 years", "Covers all eligible women in family"],
    benefits_hi: ["प्रति माह 2,000 रुपये", "सीधे बैंक हस्तांतरण", "21-59 वर्ष की महिलाओं के लिए"],
    howToApply: ["Apply online on sevasindhu.karnataka.gov.in", "Submit documents at Gram Panchayat", "Verification by revenue officials", "Monthly amount credited automatically"],
    helpline: "1077",
    website: "https://sevasindhu.karnataka.gov.in/",
    states: ["Karnataka"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Women & Child Development, Karnataka"
  },

  // TAMIL NADU STATE SCHEMES
  {
    id: "tn-kalaignar-magalir",
    name_en: "Kalaignar Magalir Urimai Thogai (Tamil Nadu)",
    name_hi: "कलैगनार मगलिर उरिमै थोगै (तमिलनाडु)",
    category: "Health",
    description_en: "Monthly financial assistance to women heads of families in Tamil Nadu. Rs 1,000 per month to eligible women.",
    description_hi: "तमिलनाडु में परिवार की महिला मुखिया को मासिक वित्तीय सहायता। पात्र महिलाओं को 1,000 रुपये प्रति माह।",
    eligibility: {
      residence: "Tamil Nadu",
      category: "Women heads of families",
      age: "21-60 years",
      documents: ["Aadhar Card", "Ration Card", "Bank Account", "Family Card"]
    },
    benefits_en: ["Rs 1,000 per month", "Direct bank transfer", "For women heads of families", "Automatic renewal"],
    benefits_hi: ["प्रति माह 1,000 रुपये", "सीधे बैंक हस्तांतरण", "परिवार की महिला मुखिया के लिए"],
    howToApply: ["Apply at nearest Common Service Center", "Submit required documents", "Verification by Village Revenue Officer", "Monthly payment through DBT"],
    helpline: "1077",
    website: "https://tnpds.gov.in/",
    states: ["Tamil Nadu"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Social Welfare Department, Tamil Nadu"
  },

  // WEST BENGAL STATE SCHEMES
  {
    id: "wb-lakshmir-bhandar",
    name_en: "Lakshmir Bhandar (West Bengal)",
    name_hi: "लक्ष्मीर भंडार (पश्चिम बंगाल)",
    category: "Health",
    description_en: "Monthly financial assistance to women in West Bengal. Rs 1,000-1,200 per month based on category.",
    description_hi: "पश्चिम बंगाल में महिलाओं को मासिक वित्तीय सहायता। श्रेणी के आधार पर 1,000-1,200 रुपये प्रति माह।",
    eligibility: {
      residence: "West Bengal",
      category: "Women aged 25-60 years",
      documents: ["Aadhar Card", "Voter ID", "Ration Card", "Bank Account"]
    },
    benefits_en: ["Rs 1,000/month for General category", "Rs 1,200/month for SC/ST", "Direct bank transfer", "Annual increment possible"],
    benefits_hi: ["सामान्य श्रेणी के लिए 1,000 रुपये/माह", "SC/ST के लिए 1,200 रुपये/माह", "सीधे बैंक हस्तांतरण"],
    howToApply: ["Apply online on wb.gov.in", "Submit documents at local office", "Verification by Block Development Office", "Monthly payment through DBT"],
    helpline: "1077",
    website: "https://wb.gov.in/",
    states: ["West Bengal"],
    targetAudience: ['citizen'],
    schemeType: 'welfare',
    ministry: "Women & Child Development, West Bengal"
  },

  // ANDHRA PRADESH STATE SCHEMES
  {
    id: "ap-amma-vodi",
    name_en: "YSR Amma Vodi (Andhra Pradesh)",
    name_hi: "वाईएसआर अम्मा वोडी (आंध्र प्रदेश)",
    category: "Education",
    description_en: "Financial assistance to mothers for sending children to school in Andhra Pradesh. Rs 15,000 per year per child.",
    description_hi: "आंध्र प्रदेश में बच्चों को स्कूल भेजने के लिए माताओं को वित्तीय सहायता। प्रति बच्चा प्रति वर्ष 15,000 रुपये।",
    eligibility: {
      residence: "Andhra Pradesh",
      category: "Mothers with children in Classes 1-12",
      documents: ["Aadhar Card", "School Enrollment Certificate", "Bank Account", "Ration Card"]
    },
    benefits_en: ["Rs 15,000 per child per year", "For Classes 1-12", "Direct bank transfer", "Covers government and aided schools"],
    benefits_hi: ["प्रति बच्चा प्रति वर्ष 15,000 रुपये", "कक्षा 1-12 के लिए", "सीधे बैंक हस्तांतरण"],
    howToApply: ["Apply through school", "Submit enrollment proof", "Verification by education department", "Annual payment in January"],
    helpline: "1077",
    website: "https://www.ap.gov.in/",
    states: ["Andhra Pradesh"],
    targetAudience: ['student', 'citizen'],
    schemeType: 'education',
    ministry: "Education Department, Andhra Pradesh"
  }
];

// Emergency helplines data (All India)
export const helplines = [
  {
    name_en: "National Emergency Number",
    name_hi: "राष्ट्रीय आपातकालीन नंबर",
    number: "112",
    description_en: "Single emergency number for Police, Fire, Ambulance",
    description_hi: "पुलिस, अग्निशमन, एम्बुलेंस के लिए एकल आपातकालीन नंबर"
  },
  {
    name_en: "Women Helpline",
    name_hi: "महिला हेल्पलाइन",
    number: "181",
    description_en: "Women in distress helpline (24x7)",
    description_hi: "संकट में महिलाओं के लिए हेल्पलाइन (24x7)"
  },
  {
    name_en: "Child Helpline",
    name_hi: "बाल हेल्पलाइन",
    number: "1098",
    description_en: "Child protection and welfare",
    description_hi: "बाल संरक्षण और कल्याण"
  },
  {
    name_en: "Police Emergency",
    name_hi: "पुलिस आपातकालीन",
    number: "100",
    description_en: "Police emergency services",
    description_hi: "पुलिस आपातकालीन सेवाएं"
  },
  {
    name_en: "Ambulance",
    name_hi: "एम्बुलेंस",
    number: "108",
    description_en: "Emergency medical services",
    description_hi: "आपातकालीन चिकित्सा सेवाएं"
  },
  {
    name_en: "Fire Brigade",
    name_hi: "दमकल",
    number: "101",
    description_en: "Fire emergency services",
    description_hi: "अग्नि आपातकालीन सेवाएं"
  },
  {
    name_en: "National Scholarship Helpline",
    name_hi: "राष्ट्रीय छात्रवृत्ति हेल्पलाइन",
    number: "0120-6619540",
    description_en: "Scholarship and education assistance",
    description_hi: "छात्रवृत्ति और शिक्षा सहायता"
  },
  {
    name_en: "Ayushman Bharat Helpline",
    name_hi: "आयुष्मान भारत हेल्पलाइन",
    number: "14555",
    description_en: "Health insurance queries",
    description_hi: "स्वास्थ्य बीमा प्रश्न"
  },
  {
    name_en: "PM-KISAN Helpline",
    name_hi: "पीएम-किसान हेल्पलाइन",
    number: "155261",
    description_en: "Farmer scheme queries",
    description_hi: "किसान योजना प्रश्न"
  },
  {
    name_en: "Senior Citizen Helpline",
    name_hi: "वरिष्ठ नागरिक हेल्पलाइन",
    number: "14567",
    description_en: "Elder abuse and assistance",
    description_hi: "वृद्ध दुर्व्यवहार और सहायता"
  }
];

// Helper functions
export function getSchemesByAudience(audience: UserCategory): Scheme[] {
  return schemes.filter(scheme => scheme.targetAudience.includes(audience));
}

export function getSchemesByType(type: SchemeType): Scheme[] {
  return schemes.filter(scheme => scheme.schemeType === type);
}

export function getSchemesByState(state: string): Scheme[] {
  return schemes.filter(scheme => 
    scheme.states.includes(state) || scheme.states.includes('All India')
  );
}

export function getStudentSchemes(): Scheme[] {
  return schemes.filter(scheme => 
    scheme.targetAudience.includes('student') || 
    scheme.schemeType === 'scholarship' ||
    scheme.schemeType === 'education'
  );
}

export function getCitizenSchemes(): Scheme[] {
  return schemes.filter(scheme => 
    scheme.targetAudience.includes('citizen') &&
    !scheme.targetAudience.includes('student')
  );
}

export function getWelfareSchemes(): Scheme[] {
  return schemes.filter(scheme => scheme.schemeType === 'welfare');
}

export function searchSchemes(query: string, state?: string): Scheme[] {
  const lowerQuery = query.toLowerCase();
  let filteredSchemes = schemes.filter(scheme =>
    scheme.name_en.toLowerCase().includes(lowerQuery) ||
    scheme.name_hi.includes(query) ||
    scheme.description_en.toLowerCase().includes(lowerQuery) ||
    scheme.category.toLowerCase().includes(lowerQuery) ||
    scheme.benefits_en.some(benefit => benefit.toLowerCase().includes(lowerQuery))
  );

  // Filter by state if provided
  if (state && state !== 'All India') {
    filteredSchemes = filteredSchemes.filter(scheme => 
      scheme.states.includes(state) || scheme.states.includes('All India')
    );
  }

  return filteredSchemes;
}

// Get schemes by multiple criteria
export function getSchemesByFilters(filters: {
  audience?: UserCategory;
  type?: SchemeType;
  state?: string;
  category?: string;
}): Scheme[] {
  let filteredSchemes = schemes;

  if (filters.audience) {
    filteredSchemes = filteredSchemes.filter(scheme => 
      scheme.targetAudience.includes(filters.audience!)
    );
  }

  if (filters.type) {
    filteredSchemes = filteredSchemes.filter(scheme => 
      scheme.schemeType === filters.type
    );
  }

  if (filters.state && filters.state !== 'All India') {
    filteredSchemes = filteredSchemes.filter(scheme => 
      scheme.states.includes(filters.state!) || scheme.states.includes('All India')
    );
  }

  if (filters.category) {
    filteredSchemes = filteredSchemes.filter(scheme => 
      scheme.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  return filteredSchemes;
}

// Get popular schemes (most comprehensive benefits)
export function getPopularSchemes(limit: number = 10): Scheme[] {
  return schemes
    .sort((a, b) => b.benefits_en.length - a.benefits_en.length)
    .slice(0, limit);
}

// Get schemes by ministry
export function getSchemesByMinistry(ministry: string): Scheme[] {
  return schemes.filter(scheme => 
    scheme.ministry?.toLowerCase().includes(ministry.toLowerCase())
  );
}

// Indian states and UTs list
export const indianStates = [
  'All India',
  'Andhra Pradesh',
  'Arunachal Pradesh', 
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];
