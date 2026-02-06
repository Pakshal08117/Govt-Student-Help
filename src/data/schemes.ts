// Government Schemes and Scholarships Data

export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  name_hi?: string;  // Alternative naming for compatibility
  name_en?: string;  // Alternative naming for compatibility
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  description_hi?: string;  // Alternative naming for compatibility
  description_en?: string;  // Alternative naming for compatibility
  category: "Student" | "Citizen" | "Welfare" | "Employment" | "Health" | "Agriculture";
  schemeType?: string;  // New field for scheme type
  ministry?: string;    // New field for ministry
  eligibility: string[] | {
    age?: string;
    income?: string;
    residence?: string;
    category?: string;
    documents?: string[];
  };
  eligibilityHi: string[];
  eligibilityMr: string[];
  documents: string[];
  documentsHi: string[];
  documentsMr: string[];
  applicationProcess: string[];
  applicationProcessHi: string[];
  applicationProcessMr: string[];
  howToApply?: string[];  // New field for how to apply steps
  benefits: string | string[];
  benefitsHi: string | string[];
  benefitsMr: string | string[];
  benefits_hi?: string[];  // Alternative naming for compatibility
  benefits_en?: string[];  // Alternative naming for compatibility
  website: string;
  helpline: string;
  state: string;
  states?: string[];  // Alternative naming for compatibility
  targetAudience?: string[];  // New field for target audience
  tags: string[];
  isActive: boolean;
  lastUpdated: string;
}

export interface Helpline {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  number: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  availability: string;
  category: "Emergency" | "Government" | "Health" | "Education" | "General";
}

// Import 50 real government schemes
import { integratedSchemes } from './schemesIntegrated';

// Sample schemes data - Comprehensive list of Indian Government Schemes
export const schemes: Scheme[] = [
  {
    id: "pm-scholarship",
    name: "PM Scholarship Scheme",
    nameHi: "प्रधानमंत्री छात्रवृत्ति योजना",
    nameMr: "पंतप्रधान शिष्यवृत्ती योजना",
    name_hi: "प्रधानमंत्री छात्रवृत्ति योजना",
    name_en: "PM Scholarship Scheme",
    description: "Scholarship for children of Ex-Servicemen and Ex-Coast Guard personnel",
    descriptionHi: "भूतपूर्व सैनिकों और भूतपूर्व तटरक्षक कर्मियों के बच्चों के लिए छात्रवृत्ति",
    descriptionMr: "माजी सैनिक आणि माजी तटरक्षक कर्मचाऱ्यांच्या मुलांसाठी शिष्यवृत्ती",
    description_hi: "भूतपूर्व सैनिकों और भूतपूर्व तटरक्षक कर्मियों के बच्चों के लिए छात्रवृत्ति",
    description_en: "Scholarship for children of Ex-Servicemen and Ex-Coast Guard personnel",
    category: "Student",
    schemeType: "Central Scholarship",
    ministry: "Ministry of Defence",
    eligibility: {
      age: "18-25 years",
      income: "Family income less than ₹6 lakh per annum",
      residence: "Indian citizen",
      category: "Children of Ex-Servicemen/Ex-Coast Guard personnel",
      documents: [
        "Ex-Servicemen Identity Card",
        "12th Mark Sheet", 
        "Income Certificate",
        "Bank Account Details",
        "Aadhaar Card"
      ]
    },
    eligibilityHi: [
      "भूतपूर्व सैनिक/भूतपूर्व तटरक्षक कर्मियों का बच्चा",
      "12वीं कक्षा में न्यूनतम 60% अंक",
      "पारिवारिक आय प्रति वर्ष ₹6 लाख से कम"
    ],
    eligibilityMr: [
      "माजी सैनिक/माजी तटरक्षक कर्मचाऱ्यांचे मूल",
      "12वीत किमान 60% गुण",
      "कौटुंबिक उत्पन्न वर्षाला ₹6 लाखापेक्षा कमी"
    ],
    documents: [
      "Ex-Servicemen Identity Card",
      "12th Mark Sheet",
      "Income Certificate", 
      "Bank Account Details",
      "Aadhaar Card"
    ],
    documentsHi: [
      "भूतपूर्व सैनिक पहचान पत्र",
      "12वीं की मार्कशीट",
      "आय प्रमाण पत्र",
      "बैंक खाता विवरण",
      "आधार कार्ड"
    ],
    documentsMr: [
      "माजी सैनिक ओळखपत्र",
      "12वीची गुणपत्रिका",
      "उत्पन्न दाखला",
      "बँक खाते तपशील",
      "आधार कार्ड"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in",
      "Register with valid details",
      "Fill application form",
      "Upload required documents",
      "Submit application"
    ],
    applicationProcessHi: [
      "scholarships.gov.in पर जाएं",
      "वैध विवरण के साथ पंजीकरण करें",
      "आवेदन पत्र भरें",
      "आवश्यक दस्तावेज अपलोड करें",
      "आवेदन जमा करें"
    ],
    applicationProcessMr: [
      "scholarships.gov.in ला भेट द्या",
      "वैध तपशीलांसह नोंदणी करा",
      "अर्ज फॉर्म भरा",
      "आवश्यक कागदपत्रे अपलोड करा",
      "अर्ज सबमिट करा"
    ],
    howToApply: [
      "Visit the National Scholarship Portal at scholarships.gov.in",
      "Register as a new user with valid email and mobile number",
      "Fill the application form with accurate details",
      "Upload all required documents in prescribed format",
      "Submit the application and note down the application ID"
    ],
    benefits: ["₹2,000-₹3,000 per month for degree courses", "Direct bank transfer", "Renewable annually"],
    benefitsHi: ["डिग्री कोर्स के लिए प्रति माह ₹2,000-₹3,000", "सीधे बैंक ट्रांसफर", "वार्षिक नवीकरणीय"],
    benefitsMr: ["पदवी अभ्यासक्रमासाठी दरमहा ₹2,000-₹3,000", "थेट बँक ट्रान्सफर", "वार्षिक नूतनीकरण"],
    benefits_hi: ["डिग्री कोर्स के लिए प्रति माह ₹2,000-₹3,000", "सीधे बैंक ट्रांसफर", "वार्षिक नवीकरणीय"],
    benefits_en: ["₹2,000-₹3,000 per month for degree courses", "Direct bank transfer", "Renewable annually"],
    website: "https://scholarships.gov.in",
    helpline: "0120-6619540",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Students", "Ex-Servicemen Children"],
    tags: ["scholarship", "student", "ex-servicemen", "education"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "nsp-scholarship",
    name: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    nameMr: "राष्ट्रीय शिष्यवृत्ती पोर्टल",
    name_hi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    name_en: "National Scholarship Portal",
    description: "Central platform for various government scholarships",
    descriptionHi: "विभिन्न सरकारी छात्रवृत्तियों के लिए केंद्रीय मंच",
    descriptionMr: "विविध सरकारी शिष्यवृत्तींसाठी केंद्रीय व्यासपीठ",
    description_hi: "विभिन्न सरकारी छात्रवृत्तियों के लिए केंद्रीय मंच",
    description_en: "Central platform for various government scholarships",
    category: "Student",
    schemeType: "Scholarship Portal",
    ministry: "Ministry of Education",
    eligibility: {
      age: "No age limit",
      income: "Varies by scheme",
      residence: "Indian citizen",
      category: "Students enrolled in recognized institutions",
      documents: [
        "Educational certificates",
        "Income certificate",
        "Caste certificate (if applicable)",
        "Bank account details",
        "Aadhaar card"
      ]
    },
    eligibilityHi: [
      "भारतीय नागरिक",
      "मान्यता प्राप्त संस्थान में नामांकित",
      "विशिष्ट योजना मानदंडों को पूरा करना"
    ],
    eligibilityMr: [
      "भारतीय नागरिक",
      "मान्यताप्राप्त संस्थेत नावनोंदणी",
      "विशिष्ट योजना निकष पूर्ण करणे"
    ],
    documents: [
      "Educational certificates",
      "Income certificate",
      "Caste certificate (if applicable)",
      "Bank account details",
      "Aadhaar card"
    ],
    documentsHi: [
      "शैक्षणिक प्रमाण पत्र",
      "आय प्रमाण पत्र",
      "जाति प्रमाण पत्र (यदि लागू हो)",
      "बैंक खाता विवरण",
      "आधार कार्ड"
    ],
    documentsMr: [
      "शैक्षणिक प्रमाणपत्रे",
      "उत्पन्न दाखला",
      "जात दाखला (लागू असल्यास)",
      "बँक खाते तपशील",
      "आधार कार्ड"
    ],
    applicationProcess: [
      "Visit scholarships.gov.in",
      "Create student account",
      "Choose appropriate scheme",
      "Fill application form",
      "Upload documents and submit"
    ],
    applicationProcessHi: [
      "scholarships.gov.in पर जाएं",
      "छात्र खाता बनाएं",
      "उपयुक्त योजना चुनें",
      "आवेदन पत्र भरें",
      "दस्तावेज अपलोड करें और जमा करें"
    ],
    applicationProcessMr: [
      "scholarships.gov.in ला भेट द्या",
      "विद्यार्थी खाते तयार करा",
      "योग्य योजना निवडा",
      "अर्ज फॉर्म भरा",
      "कागदपत्रे अपलोड करा आणि सबमिट करा"
    ],
    howToApply: [
      "Visit the National Scholarship Portal at scholarships.gov.in",
      "Register as a new student with valid credentials",
      "Browse and select the appropriate scholarship scheme",
      "Fill the online application form with accurate information",
      "Upload required documents and submit the application"
    ],
    benefits: ["Various amounts based on scheme selected", "Direct benefit transfer", "Multiple scholarship options"],
    benefitsHi: ["चयनित योजना के आधार पर विभिन्न राशि", "प्रत्यक्ष लाभ हस्तांतरण", "कई छात्रवृत्ति विकल्प"],
    benefitsMr: ["निवडलेल्या योजनेवर आधारित विविध रक्कम", "थेट लाभ हस्तांतरण", "अनेक शिष्यवृत्ती पर्याय"],
    benefits_hi: ["चयनित योजना के आधार पर विभिन्न राशि", "प्रत्यक्ष लाभ हस्तांतरण", "कई छात्रवृत्ति विकल्प"],
    benefits_en: ["Various amounts based on scheme selected", "Direct benefit transfer", "Multiple scholarship options"],
    website: "https://scholarships.gov.in",
    helpline: "0120-6619540",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Students", "All Categories"],
    tags: ["scholarship", "student", "government", "education"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    nameHi: "प्रधानमंत्री किसान सम्मान निधि",
    nameMr: "पंतप्रधान किसान सन्मान निधी",
    name_hi: "प्रधानमंत्री किसान सम्मान निधि",
    name_en: "PM Kisan Samman Nidhi",
    description: "Direct income support to farmers",
    descriptionHi: "किसानों को प्रत्यक्ष आय सहायता",
    descriptionMr: "शेतकऱ्यांना थेट उत्पन्न सहाय्य",
    description_hi: "किसानों को प्रत्यक्ष आय सहायता",
    description_en: "Direct income support to farmers",
    category: "Agriculture",
    schemeType: "Income Support",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    eligibility: {
      age: "No age limit",
      income: "Small and marginal farmers",
      residence: "Indian citizen",
      category: "Landholding up to 2 hectares",
      documents: [
        "Aadhaar card",
        "Bank account details",
        "Land ownership documents",
        "Passport size photograph"
      ]
    },
    eligibilityHi: [
      "छोटे और सीमांत किसान",
      "2 हेक्टेयर तक की भूमि",
      "वैध भूमि रिकॉर्ड"
    ],
    eligibilityMr: [
      "लहान आणि सीमांत शेतकरी",
      "2 हेक्टरपर्यंत जमीन",
      "वैध जमीन नोंदी"
    ],
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Land ownership documents",
      "Passport size photograph"
    ],
    documentsHi: [
      "आधार कार्ड",
      "बैंक खाता विवरण",
      "भूमि स्वामित्व दस्तावेज",
      "पासपोर्ट साइज फोटो"
    ],
    documentsMr: [
      "आधार कार्ड",
      "बँक खाते तपशील",
      "जमीन मालकी कागदपत्रे",
      "पासपोर्ट साइज फोटो"
    ],
    applicationProcess: [
      "Visit pmkisan.gov.in",
      "Click on Farmer Registration",
      "Fill required details",
      "Upload documents",
      "Submit application"
    ],
    applicationProcessHi: [
      "pmkisan.gov.in पर जाएं",
      "किसान पंजीकरण पर क्लिक करें",
      "आवश्यक विवरण भरें",
      "दस्तावेज अपलोड करें",
      "आवेदन जमा करें"
    ],
    applicationProcessMr: [
      "pmkisan.gov.in ला भेट द्या",
      "शेतकरी नोंदणीवर क्लिक करा",
      "आवश्यक तपशील भरा",
      "कागदपत्रे अपलोड करा",
      "अर्ज सबमिट करा"
    ],
    howToApply: [
      "Visit the official PM-KISAN portal at pmkisan.gov.in",
      "Click on 'Farmers Corner' and select 'New Farmer Registration'",
      "Fill in the required details including Aadhaar number and bank account",
      "Upload necessary documents like land records",
      "Submit the application and note the registration number"
    ],
    benefits: ["₹6,000 per year in three installments", "Direct bank transfer", "No processing fee"],
    benefitsHi: ["तीन किस्तों में प्रति वर्ष ₹6,000", "सीधे बैंक ट्रांसफर", "कोई प्रसंस्करण शुल्क नहीं"],
    benefitsMr: ["तीन हप्त्यांमध्ये दरवर्षी ₹6,000", "थेट बँक ट्रान्सफर", "कोणतेही प्रक्रिया शुल्क नाही"],
    benefits_hi: ["तीन किस्तों में प्रति वर्ष ₹6,000", "सीधे बैंक ट्रांसफर", "कोई प्रसंस्करण शुल्क नहीं"],
    benefits_en: ["₹6,000 per year in three installments", "Direct bank transfer", "No processing fee"],
    website: "https://pmkisan.gov.in",
    helpline: "155261",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Farmers", "Small & Marginal Farmers"],
    tags: ["agriculture", "farmer", "income", "support"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat Scheme",
    nameHi: "आयुष्मान भारत योजना",
    nameMr: "आयुष्मान भारत योजना",
    name_hi: "आयुष्मान भारत योजना",
    name_en: "Ayushman Bharat Scheme",
    description: "Health insurance scheme for poor families",
    descriptionHi: "गरीब परिवारों के लिए स्वास्थ्य बीमा योजना",
    descriptionMr: "गरीब कुटुंबांसाठी आरोग्य विमा योजना",
    description_hi: "गरीब परिवारों के लिए स्वास्थ्य बीमा योजना",
    description_en: "Health insurance scheme for poor families",
    category: "Health",
    schemeType: "Health Insurance",
    ministry: "Ministry of Health & Family Welfare",
    eligibility: {
      age: "No age limit",
      income: "Below Poverty Line families",
      residence: "Indian citizen",
      category: "Families listed in SECC 2011",
      documents: [
        "Aadhaar card",
        "Ration card",
        "Mobile number",
        "Address proof"
      ]
    },
    eligibilityHi: [
      "SECC 2011 में सूचीबद्ध परिवार",
      "ग्रामीण और शहरी गरीब परिवार",
      "विशिष्ट व्यावसायिक श्रेणियां"
    ],
    eligibilityMr: [
      "SECC 2011 मध्ये यादीबद्ध कुटुंबे",
      "ग्रामीण आणि शहरी गरीब कुटुंबे",
      "विशिष्ट व्यावसायिक श्रेणी"
    ],
    documents: [
      "Aadhaar card",
      "Ration card",
      "Mobile number",
      "Address proof"
    ],
    documentsHi: [
      "आधार कार्ड",
      "राशन कार्ड",
      "मोबाइल नंबर",
      "पता प्रमाण"
    ],
    documentsMr: [
      "आधार कार्ड",
      "रेशन कार्ड",
      "मोबाइल नंबर",
      "पत्ता पुरावा"
    ],
    applicationProcess: [
      "Visit nearest CSC center",
      "Provide required documents",
      "Biometric verification",
      "Receive Golden Card",
      "Use at empaneled hospitals"
    ],
    applicationProcessHi: [
      "निकटतम CSC केंद्र पर जाएं",
      "आवश्यक दस्तावेज प्रदान करें",
      "बायोमेट्रिक सत्यापन",
      "गोल्डन कार्ड प्राप्त करें",
      "सूचीबद्ध अस्पतालों में उपयोग करें"
    ],
    applicationProcessMr: [
      "जवळच्या CSC केंद्रात जा",
      "आवश्यक कागदपत्रे द्या",
      "बायोमेट्रिक पडताळणी",
      "गोल्डन कार्ड मिळवा",
      "यादीबद्ध हॉस्पिटलमध्ये वापरा"
    ],
    howToApply: [
      "Visit the nearest Common Service Center (CSC) or Ayushman Mitra",
      "Carry your Aadhaar card and other identity documents",
      "Complete the biometric verification process",
      "Receive your Ayushman Bharat Golden Card",
      "Use the card at any empaneled hospital for cashless treatment"
    ],
    benefits: ["Health coverage up to ₹5 lakh per family per year", "Cashless treatment", "Pre and post hospitalization coverage"],
    benefitsHi: ["प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज", "कैशलेस उपचार", "अस्पताल में भर्ती से पहले और बाद का कवरेज"],
    benefitsMr: ["प्रति कुटुंब दरवर्षी ₹5 लाखपर्यंत आरोग्य कव्हरेज", "कॅशलेस उपचार", "हॉस्पिटलायझेशन पूर्व आणि नंतरचे कव्हरेज"],
    benefits_hi: ["प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज", "कैशलेस उपचार", "अस्पताल में भर्ती से पहले और बाद का कवरेज"],
    benefits_en: ["Health coverage up to ₹5 lakh per family per year", "Cashless treatment", "Pre and post hospitalization coverage"],
    website: "https://pmjay.gov.in",
    helpline: "14555",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Poor Families", "BPL Families"],
    tags: ["health", "insurance", "medical", "poor"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "mudra-loan",
    name: "Pradhan Mantri Mudra Yojana",
    nameHi: "प्रधानमंत्री मुद्रा योजना",
    nameMr: "पंतप्रधान मुद्रा योजना",
    name_hi: "प्रधानमंत्री मुद्रा योजना",
    name_en: "Pradhan Mantri Mudra Yojana",
    description: "Micro finance scheme for small businesses",
    descriptionHi: "छोटे व्यवसायों के लिए सूक्ष्म वित्त योजना",
    descriptionMr: "छोट्या व्यवसायांसाठी सूक्ष्म वित्त योजना",
    description_hi: "छोटे व्यवसायों के लिए सूक्ष्म वित्त योजना",
    description_en: "Micro finance scheme for small businesses",
    category: "Employment",
    schemeType: "Micro Finance",
    ministry: "Ministry of Finance",
    eligibility: {
      age: "18 years and above",
      income: "Non-corporate small business entities",
      residence: "Indian citizen",
      category: "Manufacturing, trading, services sectors",
      documents: [
        "Identity proof",
        "Address proof",
        "Business plan",
        "Bank statements",
        "Income proof"
      ]
    },
    eligibilityHi: [
      "गैर-कॉर्पोरेट छोटी व्यावसायिक इकाइयां",
      "आय उत्पन्न करने वाली गतिविधियां",
      "विनिर्माण, व्यापार, सेवा क्षेत्र"
    ],
    eligibilityMr: [
      "गैर-कॉर्पोरेट छोटी व्यावसायिक संस्था",
      "उत्पन्न निर्माण करणाऱ्या क्रिया",
      "उत्पादन, व्यापार, सेवा क्षेत्र"
    ],
    documents: [
      "Identity proof",
      "Address proof",
      "Business plan",
      "Bank statements",
      "Income proof"
    ],
    documentsHi: [
      "पहचान प्रमाण",
      "पता प्रमाण",
      "व्यवसाय योजना",
      "बैंक स्टेटमेंट",
      "आय प्रमाण"
    ],
    documentsMr: [
      "ओळख पुरावा",
      "पत्ता पुरावा",
      "व्यवसाय योजना",
      "बँक स्टेटमेंट",
      "उत्पन्न पुरावा"
    ],
    applicationProcess: [
      "Visit bank or NBFC",
      "Fill application form",
      "Submit documents",
      "Business verification",
      "Loan approval and disbursal"
    ],
    applicationProcessHi: [
      "बैंक या NBFC पर जाएं",
      "आवेदन पत्र भरें",
      "दस्तावेज जमा करें",
      "व्यवसाय सत्यापन",
      "ऋण अनुमोदन और वितरण"
    ],
    applicationProcessMr: [
      "बँक किंवा NBFC ला जा",
      "अर्ज फॉर्म भरा",
      "कागदपत्रे सबमिट करा",
      "व्यवसाय पडताळणी",
      "कर्ज मंजुरी आणि वितरण"
    ],
    howToApply: [
      "Visit any participating bank or NBFC branch",
      "Fill the MUDRA loan application form",
      "Submit required documents and business plan",
      "Bank will verify your business and creditworthiness",
      "Upon approval, loan amount will be disbursed to your account"
    ],
    benefits: ["Loans up to ₹10 lakh without collateral", "Low interest rates", "Easy processing"],
    benefitsHi: ["बिना गारंटी के ₹10 लाख तक का ऋण", "कम ब्याज दरें", "आसान प्रसंस्करण"],
    benefitsMr: ["गहाणखत शिवाय ₹10 लाखपर्यंत कर्ज", "कमी व्याज दर", "सोपी प्रक्रिया"],
    benefits_hi: ["बिना गारंटी के ₹10 लाख तक का ऋण", "कम ब्याज दरें", "आसान प्रसंस्करण"],
    benefits_en: ["Loans up to ₹10 lakh without collateral", "Low interest rates", "Easy processing"],
    website: "https://mudra.org.in",
    helpline: "1800-180-1111",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Entrepreneurs", "Small Business Owners"],
    tags: ["loan", "business", "employment", "micro-finance"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    nameHi: "सुकन्या समृद्धि योजना",
    nameMr: "सुकन्या समृद्धी योजना",
    name_hi: "सुकन्या समृद्धि योजना",
    name_en: "Sukanya Samriddhi Yojana",
    description: "Savings scheme for girl child education and marriage",
    descriptionHi: "बालिकाओं की शिक्षा और विवाह के लिए बचत योजना",
    descriptionMr: "मुलींच्या शिक्षण आणि लग्नासाठी बचत योजना",
    description_hi: "बालिकाओं की शिक्षा और विवाह के लिए बचत योजना",
    description_en: "Savings scheme for girl child education and marriage",
    category: "Welfare",
    schemeType: "Savings Scheme",
    ministry: "Ministry of Finance",
    eligibility: {
      age: "Girl child below 10 years",
      income: "No income limit",
      residence: "Indian citizen",
      category: "Parents/Guardians of girl child",
      documents: ["Birth certificate of girl child", "Aadhaar card", "Address proof", "Passport size photos"]
    },
    eligibilityHi: ["10 वर्ष से कम उम्र की बालिका", "कोई आय सीमा नहीं", "भारतीय नागरिक"],
    eligibilityMr: ["10 वर्षांखालील मुलगी", "कोणतीही उत्पन्न मर्यादा नाही", "भारतीय नागरिक"],
    documents: ["Birth certificate", "Aadhaar card", "Address proof", "Photos"],
    documentsHi: ["जन्म प्रमाण पत्र", "आधार कार्ड", "पता प्रमाण", "फोटो"],
    documentsMr: ["जन्म दाखला", "आधार कार्ड", "पत्ता पुरावा", "फोटो"],
    applicationProcess: ["Visit post office or bank", "Fill SSY form", "Submit documents", "Deposit minimum ₹250"],
    applicationProcessHi: ["डाकघर या बैंक जाएं", "SSY फॉर्म भरें", "दस्तावेज जमा करें", "न्यूनतम ₹250 जमा करें"],
    applicationProcessMr: ["पोस्ट ऑफिस किंवा बँकेत जा", "SSY फॉर्म भरा", "कागदपत्रे सबमिट करा", "किमान ₹250 जमा करा"],
    howToApply: ["Visit nearest post office or authorized bank", "Fill Sukanya Samriddhi Account opening form", "Submit girl child's birth certificate and parents' ID", "Make initial deposit of minimum ₹250", "Account will be opened and passbook issued"],
    benefits: ["High interest rate (8%+)", "Tax benefits under Section 80C", "Maturity after 21 years", "Partial withdrawal for education"],
    benefitsHi: ["उच्च ब्याज दर (8%+)", "धारा 80C के तहत कर लाभ", "21 वर्ष बाद परिपक्वता", "शिक्षा के लिए आंशिक निकासी"],
    benefitsMr: ["उच्च व्याज दर (8%+)", "कलम 80C अंतर्गत कर लाभ", "21 वर्षांनंतर परिपक्वता", "शिक्षणासाठी आंशिक पैसे काढणे"],
    benefits_hi: ["उच्च ब्याज दर (8%+)", "धारा 80C के तहत कर लाभ", "21 वर्ष बाद परिपक्वता"],
    benefits_en: ["High interest rate (8%+)", "Tax benefits under Section 80C", "Maturity after 21 years"],
    website: "https://www.india.gov.in/sukanya-samriddhi-yojana",
    helpline: "1800-180-1111",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Girl Child", "Parents"],
    tags: ["savings", "girl child", "education", "welfare"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "beti-bachao-beti-padhao",
    name: "Beti Bachao Beti Padhao",
    nameHi: "बेटी बचाओ बेटी पढ़ाओ",
    nameMr: "बेटी बचाओ बेटी पढाओ",
    name_hi: "बेटी बचाओ बेटी पढ़ाओ",
    name_en: "Beti Bachao Beti Padhao",
    description: "Campaign to save and educate girl child",
    descriptionHi: "बालिकाओं को बचाने और शिक्षित करने का अभियान",
    descriptionMr: "मुलींना वाचवण्यासाठी आणि शिक्षित करण्यासाठी मोहीम",
    description_hi: "बालिकाओं को बचाने और शिक्षित करने का अभियान",
    description_en: "Campaign to save and educate girl child",
    category: "Welfare",
    schemeType: "Social Campaign",
    ministry: "Ministry of Women and Child Development",
    eligibility: {
      age: "Girl child 0-18 years",
      income: "All income groups",
      residence: "Indian citizen",
      category: "All girl children",
      documents: ["Birth certificate", "School enrollment proof", "Aadhaar card"]
    },
    eligibilityHi: ["0-18 वर्ष की बालिका", "सभी आय वर्ग", "भारतीय नागरिक"],
    eligibilityMr: ["0-18 वर्षांची मुलगी", "सर्व उत्पन्न गट", "भारतीय नागरिक"],
    documents: ["Birth certificate", "School documents", "Aadhaar card"],
    documentsHi: ["जन्म प्रमाण पत्र", "स्कूल दस्तावेज", "आधार कार्ड"],
    documentsMr: ["जन्म दाखला", "शाळा कागदपत्रे", "आधार कार्ड"],
    applicationProcess: ["Contact local authorities", "Register girl child", "Ensure school enrollment", "Access benefits"],
    applicationProcessHi: ["स्थानीय अधिकारियों से संपर्क करें", "बालिका पंजीकरण", "स्कूल नामांकन सुनिश्चित करें", "लाभ प्राप्त करें"],
    applicationProcessMr: ["स्थानिक अधिकाऱ्यांशी संपर्क साधा", "मुलीची नोंदणी करा", "शाळा नावनोंदणी सुनिश्चित करा", "लाभ मिळवा"],
    howToApply: ["Visit local Women and Child Development office", "Register under the scheme", "Ensure girl child's birth registration", "Enroll in school", "Access various benefits and schemes"],
    benefits: ["Awareness campaigns", "Education support", "Healthcare benefits", "Financial assistance"],
    benefitsHi: ["जागरूकता अभियान", "शिक्षा सहायता", "स्वास्थ्य लाभ", "वित्तीय सहायता"],
    benefitsMr: ["जागरूकता मोहीम", "शिक्षण सहाय्य", "आरोग्य लाभ", "आर्थिक सहाय्य"],
    benefits_hi: ["जागरूकता अभियान", "शिक्षा सहायता", "स्वास्थ्य लाभ"],
    benefits_en: ["Awareness campaigns", "Education support", "Healthcare benefits"],
    website: "https://wcd.nic.in/bbbp-schemes",
    helpline: "1800-180-1234",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Girl Child", "Parents", "Society"],
    tags: ["girl child", "education", "welfare", "awareness"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "pmjdy",
    name: "Pradhan Mantri Jan Dhan Yojana",
    nameHi: "प्रधानमंत्री जन धन योजना",
    nameMr: "पंतप्रधान जन धन योजना",
    name_hi: "प्रधानमंत्री जन धन योजना",
    name_en: "Pradhan Mantri Jan Dhan Yojana",
    description: "Financial inclusion program for zero-balance bank accounts",
    descriptionHi: "शून्य शेष बैंक खातों के लिए वित्तीय समावेशन कार्यक्रम",
    descriptionMr: "शून्य शिल्लक बँक खात्यांसाठी आर्थिक समावेश कार्यक्रम",
    description_hi: "शून्य शेष बैंक खातों के लिए वित्तीय समावेशन कार्यक्रम",
    description_en: "Financial inclusion program for zero-balance bank accounts",
    category: "Welfare",
    schemeType: "Financial Inclusion",
    ministry: "Ministry of Finance",
    eligibility: {
      age: "10 years and above",
      income: "No income limit",
      residence: "Indian citizen",
      category: "All citizens without bank account",
      documents: ["Aadhaar card", "Address proof", "Passport size photo"]
    },
    eligibilityHi: ["10 वर्ष और उससे अधिक", "कोई आय सीमा नहीं", "भारतीय नागरिक"],
    eligibilityMr: ["10 वर्षे आणि त्याहून अधिक", "कोणतीही उत्पन्न मर्यादा नाही", "भारतीय नागरिक"],
    documents: ["Aadhaar card", "Address proof", "Photo"],
    documentsHi: ["आधार कार्ड", "पता प्रमाण", "फोटो"],
    documentsMr: ["आधार कार्ड", "पत्ता पुरावा", "फोटो"],
    applicationProcess: ["Visit any bank", "Fill account opening form", "Submit Aadhaar", "Get RuPay debit card"],
    applicationProcessHi: ["किसी भी बैंक में जाएं", "खाता खोलने का फॉर्म भरें", "आधार जमा करें", "RuPay डेबिट कार्ड प्राप्त करें"],
    applicationProcessMr: ["कोणत्याही बँकेत जा", "खाते उघडण्याचा फॉर्म भरा", "आधार सबमिट करा", "RuPay डेबिट कार्ड मिळवा"],
    howToApply: ["Visit nearest bank branch", "Fill PMJDY account opening form", "Submit Aadhaar card and one photo", "Account opened with zero balance", "Receive RuPay debit card and insurance benefits"],
    benefits: ["Zero balance account", "₹10,000 overdraft facility", "₹2 lakh accident insurance", "RuPay debit card"],
    benefitsHi: ["शून्य शेष खाता", "₹10,000 ओवरड्राफ्ट सुविधा", "₹2 लाख दुर्घटना बीमा", "RuPay डेबिट कार्ड"],
    benefitsMr: ["शून्य शिल्लक खाते", "₹10,000 ओव्हरड्राफ्ट सुविधा", "₹2 लाख अपघात विमा", "RuPay डेबिट कार्ड"],
    benefits_hi: ["शून्य शेष खाता", "₹10,000 ओवरड्राफ्ट सुविधा", "₹2 लाख दुर्घटना बीमा"],
    benefits_en: ["Zero balance account", "₹10,000 overdraft facility", "₹2 lakh accident insurance"],
    website: "https://pmjdy.gov.in",
    helpline: "1800-180-1111",
    state: "All India",
    states: ["All India"],
    targetAudience: ["Unbanked Citizens", "All Citizens"],
    tags: ["banking", "financial inclusion", "welfare", "insurance"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "pmuy",
    name: "Pradhan Mantri Ujjwala Yojana",
    nameHi: "प्रधानमंत्री उज्ज्वला योजना",
    nameMr: "पंतप्रधान उज्ज्वला योजना",
    name_hi: "प्रधानमंत्री उज्ज्वला योजना",
    name_en: "Pradhan Mantri Ujjwala Yojana",
    description: "Free LPG connection to BPL families",
    descriptionHi: "बीपीएल परिवारों को मुफ्त एलपीजी कनेक्शन",
    descriptionMr: "बीपीएल कुटुंबांना मोफत एलपीजी कनेक्शन",
    description_hi: "बीपीएल परिवारों को मुफ्त एलपीजी कनेक्शन",
    description_en: "Free LPG connection to BPL families",
    category: "Welfare",
    schemeType: "LPG Subsidy",
    ministry: "Ministry of Petroleum & Natural Gas",
    eligibility: {
      age: "18 years and above (women)",
      income: "BPL family",
      residence: "Indian citizen",
      category: "Women from BPL families",
      documents: ["BPL card", "Aadhaar card", "Bank account details", "Address proof"]
    },
    eligibilityHi: ["18 वर्ष और उससे अधिक (महिला)", "बीपीएल परिवार", "भारतीय नागरिक"],
    eligibilityMr: ["18 वर्षे आणि त्याहून अधिक (महिला)", "बीपीएल कुटुंब", "भारतीय नागरिक"],
    documents: ["BPL card", "Aadhaar card", "Bank details", "Address proof"],
    documentsHi: ["बीपीएल कार्ड", "आधार कार्ड", "बैंक विवरण", "पता प्रमाण"],
    documentsMr: ["बीपीएल कार्ड", "आधार कार्ड", "बँक तपशील", "पत्ता पुरावा"],
    applicationProcess: ["Visit LPG distributor", "Fill PMUY form", "Submit documents", "Get free connection"],
    applicationProcessHi: ["एलपीजी वितरक के पास जाएं", "PMUY फॉर्म भरें", "दस्तावेज जमा करें", "मुफ्त कनेक्शन प्राप्त करें"],
    applicationProcessMr: ["एलपीजी वितरकाकडे जा", "PMUY फॉर्म भरा", "कागदपत्रे सबमिट करा", "मोफत कनेक्शन मिळवा"],
    howToApply: ["Visit nearest LPG distributor", "Fill Ujjwala application form", "Submit BPL card and Aadhaar", "Provide bank account details", "Free LPG connection will be provided"],
    benefits: ["Free LPG connection", "₹1,600 subsidy", "EMI facility for stove and cylinder", "Clean cooking fuel"],
    benefitsHi: ["मुफ्त एलपीजी कनेक्शन", "₹1,600 सब्सिडी", "स्टोव और सिलेंडर के लिए ईएमआई", "स्वच्छ खाना पकाने का ईंधन"],
    benefitsMr: ["मोफत एलपीजी कनेक्शन", "₹1,600 सबसिडी", "स्टोव्ह आणि सिलेंडरसाठी ईएमआय", "स्वच्छ स्वयंपाक इंधन"],
    benefits_hi: ["मुफ्त एलपीजी कनेक्शन", "₹1,600 सब्सिडी", "स्वच्छ खाना पकाने का ईंधन"],
    benefits_en: ["Free LPG connection", "₹1,600 subsidy", "Clean cooking fuel"],
    website: "https://pmuy.gov.in",
    helpline: "1800-266-6696",
    state: "All India",
    states: ["All India"],
    targetAudience: ["BPL Women", "Poor Families"],
    tags: ["lpg", "subsidy", "welfare", "women"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    nameHi: "प्रधानमंत्री आवास योजना",
    nameMr: "पंतप्रधान आवास योजना",
    name_hi: "प्रधानमंत्री आवास योजना",
    name_en: "Pradhan Mantri Awas Yojana",
    description: "Affordable housing for all",
    descriptionHi: "सभी के लिए किफायती आवास",
    descriptionMr: "सर्वांसाठी परवडणारे गृहनिर्माण",
    description_hi: "सभी के लिए किफायती आवास",
    description_en: "Affordable housing for all",
    category: "Welfare",
    schemeType: "Housing Scheme",
    ministry: "Ministry of Housing and Urban Affairs",
    eligibility: {
      age: "21-55 years",
      income: "EWS/LIG/MIG categories",
      residence: "Indian citizen",
      category: "Families without pucca house",
      documents: ["Income certificate", "Aadhaar card", "Property documents", "Bank account"]
    },
    eligibilityHi: ["21-55 वर्ष", "ईडब्ल्यूएस/एलआईजी/एमआईजी श्रेणियां", "भारतीय नागरिक"],
    eligibilityMr: ["21-55 वर्षे", "ईडब्ल्यूएस/एलआयजी/एमआयजी श्रेणी", "भारतीय नागरिक"],
    documents: ["Income certificate", "Aadhaar card", "Property docs", "Bank account"],
    documentsHi: ["आय प्रमाण पत्र", "आधार कार्ड", "संपत्ति दस्तावेज", "बैंक खाता"],
    documentsMr: ["उत्पन्न दाखला", "आधार कार्ड", "मालमत्ता कागदपत्रे", "बँक खाते"],
    applicationProcess: ["Visit PMAY portal", "Register online", "Fill application", "Submit documents", "Get subsidy"],
    applicationProcessHi: ["PMAY पोर्टल पर जाएं", "ऑनलाइन पंजीकरण करें", "आवेदन भरें", "दस्तावेज जमा करें", "सब्सिडी प्राप्त करें"],
    applicationProcessMr: ["PMAY पोर्टलला भेट द्या", "ऑनलाइन नोंदणी करा", "अर्ज भरा", "कागदपत्रे सबमिट करा", "सबसिडी मिळवा"],
    howToApply: ["Visit pmaymis.gov.in", "Click on 'Citizen Assessment'", "Fill online application form", "Upload required documents", "Submit and track application status"],
    benefits: ["Interest subsidy up to ₹2.67 lakh", "Affordable housing", "Easy home loan", "Pucca house for all"],
    benefitsHi: ["₹2.67 लाख तक ब्याज सब्सिडी", "किफायती आवास", "आसान होम लोन", "सभी के लिए पक्का घर"],
    benefitsMr: ["₹2.67 लाखपर्यंत व्याज सबसिडी", "परवडणारे गृहनिर्माण", "सोपे होम लोन", "सर्वांसाठी पक्के घर"],
    benefits_hi: ["₹2.67 लाख तक ब्याज सब्सिडी", "किफायती आवास", "आसान होम लोन"],
    benefits_en: ["Interest subsidy up to ₹2.67 lakh", "Affordable housing", "Easy home loan"],
    website: "https://pmaymis.gov.in",
    helpline: "1800-11-6163",
    state: "All India",
    states: ["All India"],
    targetAudience: ["EWS", "LIG", "MIG", "Homeless"],
    tags: ["housing", "subsidy", "welfare", "loan"],
    isActive: true,
    lastUpdated: "2024-01-15"
  },
  // Merge 50 real government schemes with official links
  ...integratedSchemes
];

// Helplines data
export const helplines: Helpline[] = [
  {
    id: "citizen-helpline",
    name: "National Citizen Helpline",
    nameHi: "राष्ट्रीय नागरिक हेल्पलाइन",
    nameMr: "राष्ट्रीय नागरिक हेल्पलाइन",
    number: "1077",
    description: "24x7 helpline for all government services",
    descriptionHi: "सभी सरकारी सेवाओं के लिए 24x7 हेल्पलाइन",
    descriptionMr: "सर्व सरकारी सेवांसाठी 24x7 हेल्पलाइन",
    availability: "24x7",
    category: "Government"
  },
  {
    id: "nsp-helpline",
    name: "NSP Helpdesk",
    nameHi: "एनएसपी हेल्पडेस्क",
    nameMr: "एनएसपी हेल्पडेस्क",
    number: "0120-6619540",
    description: "National Scholarship Portal support",
    descriptionHi: "राष्ट्रीय छात्रवृत्ति पोर्टल सहायता",
    descriptionMr: "राष्ट्रीय शिष्यवृत्ती पोर्टल सहाय्य",
    availability: "10 AM - 6 PM (Mon-Fri)",
    category: "Education"
  }
];

// Indian states for filtering
export const indianStates = [
  "All India",
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Filter functions
export function getSchemesByFilters(filters: {
  audience?: string;
  type?: string;
  state?: string;
  category?: string;
} = {}): Scheme[] {
  return schemes.filter(scheme => {
    if (!scheme.isActive) return false;
    
    if (filters.category && scheme.category !== filters.category) return false;
    if (filters.state && filters.state !== "All India" && scheme.state !== filters.state && scheme.state !== "All India") return false;
    
    return true;
  });
}

export function getSchemesByState(state: string): Scheme[] {
  if (state === "All India") return schemes.filter(s => s.isActive);
  return schemes.filter(s => s.isActive && (s.state === state || s.state === "All India"));
}

export function searchSchemes(query: string, state?: string): Scheme[] {
  const searchTerm = query.toLowerCase();
  let results = schemes.filter(scheme => 
    scheme.isActive && (
      scheme.name.toLowerCase().includes(searchTerm) ||
      scheme.nameHi.toLowerCase().includes(searchTerm) ||
      scheme.nameMr.toLowerCase().includes(searchTerm) ||
      scheme.description.toLowerCase().includes(searchTerm) ||
      scheme.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  );
  
  if (state && state !== "All India") {
    results = results.filter(s => s.state === state || s.state === "All India");
  }
  
  return results;
}