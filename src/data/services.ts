// Government Services Data

export interface Service {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  category: "Health" | "Education" | "Agriculture" | "Revenue" | "Public Works" | "Social Welfare" | "Employment" | "Other";
  office: string;
  officeHi: string;
  officeMr: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  workingHoursHi: string;
  workingHoursMr: string;
  district: string;
  taluka?: string;
  state?: string;
  documents: string[];
  documentsHi: string[];
  documentsMr: string[];
  fees: string;
  feesHi: string;
  feesMr: string;
  processingTime: string;
  processingTimeHi: string;
  processingTimeMr: string;
  isOnline: boolean;
  website?: string;
  tags: string[];
}

// Comprehensive Government Services Data - All India Coverage
export const services: Service[] = [
  // BIRTH CERTIFICATE - All States
  {
    id: "birth-certificate-all-india",
    name: "Birth Certificate",
    nameHi: "जन्म प्रमाण पत्र",
    nameMr: "जन्म दाखला",
    description: "Official document certifying birth registration - Available across all Indian states and UTs",
    descriptionHi: "जन्म पंजीकरण को प्रमाणित करने वाला आधिकारिक दस्तावेज - सभी भारतीय राज्यों और केंद्र शासित प्रदेशों में उपलब्ध",
    descriptionMr: "जन्म नोंदणी प्रमाणित करणारे अधिकृत कागदपत्र - सर्व भारतीय राज्ये आणि केंद्रशासित प्रदेशांमध्ये उपलब्ध",
    category: "Revenue",
    office: "Registrar Office / Municipal Corporation",
    officeHi: "रजिस्ट्रार कार्यालय / नगर निगम",
    officeMr: "रजिस्ट्रार कार्यालय / महानगरपालिका",
    address: "District Collectorate / Municipal Office",
    phone: "1077",
    email: "registrar@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    taluka: "All Talukas",
    documents: [
      "Hospital discharge summary",
      "Parents' identity proof (Aadhaar/Voter ID)",
      "Address proof",
      "Marriage certificate of parents"
    ],
    documentsHi: [
      "अस्पताल डिस्चार्ज सारांश",
      "माता-पिता का पहचान प्रमाण (आधार/वोटर आईडी)",
      "पता प्रमाण",
      "माता-पिता का विवाह प्रमाण पत्र"
    ],
    documentsMr: [
      "हॉस्पिटल डिस्चार्ज सारांश",
      "पालकांचा ओळख पुरावा (आधार/मतदार ओळखपत्र)",
      "पत्ता पुरावा",
      "पालकांचे लग्न प्रमाणपत्र"
    ],
    fees: "₹50 (Free for registration within 21 days)",
    feesHi: "₹50 (21 दिनों के भीतर पंजीकरण के लिए निःशुल्क)",
    feesMr: "₹50 (21 दिवसांच्या आत नोंदणीसाठी मोफत)",
    processingTime: "7-15 days",
    processingTimeHi: "7-15 दिन",
    processingTimeMr: "7-15 दिवस",
    isOnline: true,
    website: "https://crsorgi.gov.in",
    tags: ["birth", "certificate", "registration", "revenue", "all-india"]
  },
  {
    id: "ration-card",
    name: "Ration Card",
    nameHi: "राशन कार्ड",
    nameMr: "रेशन कार्ड",
    description: "Food security card for subsidized food grains",
    descriptionHi: "सब्सिडी वाले खाद्यान्न के लिए खाद्य सुरक्षा कार्ड",
    descriptionMr: "अनुदानित धान्यासाठी अन्न सुरक्षा कार्ड",
    category: "Revenue",
    office: "Food & Civil Supplies Office",
    officeHi: "खाद्य एवं नागरिक आपूर्ति कार्यालय",
    officeMr: "अन्न व नागरी पुरवठा कार्यालय",
    address: "Tehsil Office",
    phone: "1967",
    email: "fcs@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    documents: [
      "Aadhaar card of all family members",
      "Address proof",
      "Income certificate",
      "Family photograph"
    ],
    documentsHi: [
      "सभी परिवारजनों का आधार कार्ड",
      "पता प्रमाण",
      "आय प्रमाण पत्र",
      "पारिवारिक फोटो"
    ],
    documentsMr: [
      "सर्व कुटुंबीयांचे आधार कार्ड",
      "पत्ता पुरावा",
      "उत्पन्न दाखला",
      "कौटुंबिक फोटो"
    ],
    fees: "Free",
    feesHi: "निःशुल्क",
    feesMr: "मोफत",
    processingTime: "15-30 days",
    processingTimeHi: "15-30 दिन",
    processingTimeMr: "15-30 दिवस",
    isOnline: true,
    website: "https://nfsa.gov.in",
    tags: ["ration", "food", "subsidy", "pds"]
  },
  {
    id: "income-certificate",
    name: "Income Certificate",
    nameHi: "आय प्रमाण पत्र",
    nameMr: "उत्पन्न दाखला",
    description: "Certificate showing annual family income",
    descriptionHi: "वार्षिक पारिवारिक आय दिखाने वाला प्रमाण पत्र",
    descriptionMr: "वार्षिक कौटुंबिक उत्पन्न दर्शविणारा दाखला",
    category: "Revenue",
    office: "Tehsildar Office",
    officeHi: "तहसीलदार कार्यालय",
    officeMr: "तहसीलदार कार्यालय",
    address: "Tehsil Headquarters",
    phone: "1077",
    email: "tehsildar@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    documents: [
      "Aadhaar card",
      "Salary slips/Income proof",
      "Bank statements",
      "Property documents (if any)",
      "Self-declaration affidavit"
    ],
    documentsHi: [
      "आधार कार्ड",
      "वेतन पर्ची/आय प्रमाण",
      "बैंक स्टेटमेंट",
      "संपत्ति दस्तावेज (यदि कोई हो)",
      "स्व-घोषणा शपथ पत्र"
    ],
    documentsMr: [
      "आधार कार्ड",
      "पगार पर्ची/उत्पन्न पुरावा",
      "बँक स्टेटमेंट",
      "मालमत्ता कागदपत्रे (असल्यास)",
      "स्व-घोषणा प्रतिज्ञापत्र"
    ],
    fees: "₹30",
    feesHi: "₹30",
    feesMr: "₹30",
    processingTime: "7-15 days",
    processingTimeHi: "7-15 दिन",
    processingTimeMr: "7-15 दिवस",
    isOnline: true,
    tags: ["income", "certificate", "revenue", "financial"]
  },
  {
    id: "caste-certificate",
    name: "Caste Certificate",
    nameHi: "जाति प्रमाण पत्र",
    nameMr: "जात दाखला",
    description: "Certificate for caste verification",
    descriptionHi: "जाति सत्यापन के लिए प्रमाण पत्र",
    descriptionMr: "जात पडताळणीसाठी दाखला",
    category: "Revenue",
    office: "Tehsildar Office",
    officeHi: "तहसीलदार कार्यालय",
    officeMr: "तहसीलदार कार्यालय",
    address: "Tehsil Headquarters",
    phone: "1077",
    email: "tehsildar@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    documents: [
      "Aadhaar card",
      "School leaving certificate",
      "Father's caste certificate",
      "Address proof",
      "Passport size photographs"
    ],
    documentsHi: [
      "आधार कार्ड",
      "स्कूल छोड़ने का प्रमाण पत्र",
      "पिता का जाति प्रमाण पत्र",
      "पता प्रमाण",
      "पासपोर्ट साइज फोटो"
    ],
    documentsMr: [
      "आधार कार्ड",
      "शाळा सोडल्याचा दाखला",
      "वडिलांचा जात दाखला",
      "पत्ता पुरावा",
      "पासपोर्ट साइज फोटो"
    ],
    fees: "₹30",
    feesHi: "₹30",
    feesMr: "₹30",
    processingTime: "15-30 days",
    processingTimeHi: "15-30 दिन",
    processingTimeMr: "15-30 दिवस",
    isOnline: true,
    tags: ["caste", "certificate", "revenue", "social"]
  },
  {
    id: "domicile-certificate",
    name: "Domicile Certificate",
    nameHi: "निवास प्रमाण पत्र",
    nameMr: "मूळगाव दाखला",
    description: "Certificate of permanent residence",
    descriptionHi: "स्थायी निवास का प्रमाण पत्र",
    descriptionMr: "कायमस्वरूपी निवासाचा दाखला",
    category: "Revenue",
    office: "Tehsildar Office",
    officeHi: "तहसीलदार कार्यालय",
    officeMr: "तहसीलदार कार्यालय",
    address: "Tehsil Headquarters",
    phone: "1077",
    email: "tehsildar@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    documents: [
      "Birth certificate",
      "School leaving certificate",
      "Aadhaar card",
      "Ration card",
      "Property documents"
    ],
    documentsHi: [
      "जन्म प्रमाण पत्र",
      "स्कूल छोड़ने का प्रमाण पत्र",
      "आधार कार्ड",
      "राशन कार्ड",
      "संपत्ति दस्तावेज"
    ],
    documentsMr: [
      "जन्म दाखला",
      "शाळा सोडल्याचा दाखला",
      "आधार कार्ड",
      "रेशन कार्ड",
      "मालमत्ता कागदपत्रे"
    ],
    fees: "₹30",
    feesHi: "₹30",
    feesMr: "₹30",
    processingTime: "15-30 days",
    processingTimeHi: "15-30 दिन",
    processingTimeMr: "15-30 दिवस",
    isOnline: true,
    tags: ["domicile", "residence", "certificate", "revenue"]
  },
  // PASSPORT SERVICE
  {
    id: "passport-service",
    name: "Passport Application",
    nameHi: "पासपोर्ट आवेदन",
    nameMr: "पासपोर्ट अर्ज",
    description: "Apply for new passport or renewal - Available at all Passport Seva Kendras across India",
    descriptionHi: "नया पासपोर्ट या नवीनीकरण के लिए आवेदन करें - भारत भर के सभी पासपोर्ट सेवा केंद्रों पर उपलब्ध",
    descriptionMr: "नवीन पासपोर्ट किंवा नूतनीकरणासाठी अर्ज करा - संपूर्ण भारतातील सर्व पासपोर्ट सेवा केंद्रांवर उपलब्ध",
    category: "Other",
    office: "Passport Seva Kendra",
    officeHi: "पासपोर्ट सेवा केंद्र",
    officeMr: "पासपोर्ट सेवा केंद्र",
    address: "Regional Passport Office",
    phone: "1800-258-1800",
    email: "passportindia@gov.in",
    workingHours: "9:30 AM - 4:30 PM (Mon-Sat)",
    workingHoursHi: "सुबह 9:30 - शाम 4:30 (सोम-शनि)",
    workingHoursMr: "सकाळी 9:30 - संध्याकाळी 4:30 (सोम-शनि)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Proof of present address",
      "Date of birth proof",
      "Aadhaar card",
      "Voter ID / PAN card",
      "Passport size photographs"
    ],
    documentsHi: [
      "वर्तमान पते का प्रमाण",
      "जन्म तिथि प्रमाण",
      "आधार कार्ड",
      "वोटर आईडी / पैन कार्ड",
      "पासपोर्ट साइज फोटो"
    ],
    documentsMr: [
      "सध्याच्या पत्त्याचा पुरावा",
      "जन्मतारखेचा पुरावा",
      "आधार कार्ड",
      "मतदार ओळखपत्र / पॅन कार्ड",
      "पासपोर्ट साइज फोटो"
    ],
    fees: "₹1,500 (Normal), ₹3,500 (Tatkal)",
    feesHi: "₹1,500 (सामान्य), ₹3,500 (तत्काल)",
    feesMr: "₹1,500 (सामान्य), ₹3,500 (तत्काल)",
    processingTime: "30-45 days (Normal), 7-10 days (Tatkal)",
    processingTimeHi: "30-45 दिन (सामान्य), 7-10 दिन (तत्काल)",
    processingTimeMr: "30-45 दिवस (सामान्य), 7-10 दिवस (तत्काल)",
    isOnline: true,
    website: "https://www.passportindia.gov.in",
    tags: ["passport", "travel", "identity", "all-india"]
  },
  // DRIVING LICENSE
  {
    id: "driving-license",
    name: "Driving License",
    nameHi: "ड्राइविंग लाइसेंस",
    nameMr: "ड्रायव्हिंग लायसन्स",
    description: "Apply for learner's or permanent driving license - Available at all RTO offices",
    descriptionHi: "लर्नर या स्थायी ड्राइविंग लाइसेंस के लिए आवेदन करें - सभी आरटीओ कार्यालयों में उपलब्ध",
    descriptionMr: "शिकाऊ किंवा कायमस्वरूपी ड्रायव्हिंग लायसन्ससाठी अर्ज करा - सर्व आरटीओ कार्यालयांमध्ये उपलब्ध",
    category: "Other",
    office: "Regional Transport Office (RTO)",
    officeHi: "क्षेत्रीय परिवहन कार्यालय (आरटीओ)",
    officeMr: "प्रादेशिक परिवहन कार्यालय (आरटीओ)",
    address: "District RTO Office",
    phone: "1800-267-9999",
    email: "rto@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Age proof (Birth certificate/10th marksheet)",
      "Address proof (Aadhaar/Voter ID)",
      "Medical certificate (Form 1A)",
      "Passport size photographs",
      "Learner's license (for permanent DL)"
    ],
    documentsHi: [
      "आयु प्रमाण (जन्म प्रमाण पत्र/10वीं मार्कशीट)",
      "पता प्रमाण (आधार/वोटर आईडी)",
      "मेडिकल सर्टिफिकेट (फॉर्म 1A)",
      "पासपोर्ट साइज फोटो",
      "लर्नर लाइसेंस (स्थायी डीएल के लिए)"
    ],
    documentsMr: [
      "वय पुरावा (जन्म दाखला/10वी गुणपत्रिका)",
      "पत्ता पुरावा (आधार/मतदार ओळखपत्र)",
      "वैद्यकीय प्रमाणपत्र (फॉर्म 1A)",
      "पासपोर्ट साइज फोटो",
      "शिकाऊ परवाना (कायमस्वरूपी डीएलसाठी)"
    ],
    fees: "₹200 (Learner), ₹1,000 (Permanent)",
    feesHi: "₹200 (लर्नर), ₹1,000 (स्थायी)",
    feesMr: "₹200 (शिकाऊ), ₹1,000 (कायमस्वरूपी)",
    processingTime: "Immediate (Learner), 30 days (Permanent)",
    processingTimeHi: "तत्काल (लर्नर), 30 दिन (स्थायी)",
    processingTimeMr: "तात्काळ (शिकाऊ), 30 दिवस (कायमस्वरूपी)",
    isOnline: true,
    website: "https://parivahan.gov.in",
    tags: ["driving", "license", "transport", "rto", "all-india"]
  },
  // PAN CARD
  {
    id: "pan-card",
    name: "PAN Card",
    nameHi: "पैन कार्ड",
    nameMr: "पॅन कार्ड",
    description: "Permanent Account Number for tax purposes - Apply online or at NSDL/UTIITSL centers",
    descriptionHi: "कर उद्देश्यों के लिए स्थायी खाता संख्या - ऑनलाइन या NSDL/UTIITSL केंद्रों पर आवेदन करें",
    descriptionMr: "कर उद्देशांसाठी कायमस्वरूपी खाते क्रमांक - ऑनलाइन किंवा NSDL/UTIITSL केंद्रांवर अर्ज करा",
    category: "Revenue",
    office: "Income Tax Department / NSDL / UTIITSL",
    officeHi: "आयकर विभाग / NSDL / UTIITSL",
    officeMr: "आयकर विभाग / NSDL / UTIITSL",
    address: "PAN Service Centers",
    phone: "020-27218080",
    email: "tininfo@nsdl.co.in",
    workingHours: "9:00 AM - 6:00 PM (Mon-Sat)",
    workingHoursHi: "सुबह 9:00 - शाम 6:00 (सोम-शनि)",
    workingHoursMr: "सकाळी 9:00 - संध्याकाळी 6:00 (सोम-शनि)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Proof of identity (Aadhaar/Voter ID/Passport)",
      "Proof of address",
      "Date of birth proof",
      "Passport size photographs"
    ],
    documentsHi: [
      "पहचान प्रमाण (आधार/वोटर आईडी/पासपोर्ट)",
      "पता प्रमाण",
      "जन्म तिथि प्रमाण",
      "पासपोर्ट साइज फोटो"
    ],
    documentsMr: [
      "ओळख पुरावा (आधार/मतदार ओळखपत्र/पासपोर्ट)",
      "पत्ता पुरावा",
      "जन्मतारखेचा पुरावा",
      "पासपोर्ट साइज फोटो"
    ],
    fees: "₹107 (Indian address), ₹1,017 (Foreign address)",
    feesHi: "₹107 (भारतीय पता), ₹1,017 (विदेशी पता)",
    feesMr: "₹107 (भारतीय पत्ता), ₹1,017 (परदेशी पत्ता)",
    processingTime: "15-20 days",
    processingTimeHi: "15-20 दिन",
    processingTimeMr: "15-20 दिवस",
    isOnline: true,
    website: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    tags: ["pan", "tax", "income-tax", "identity", "all-india"]
  },
  // VOTER ID
  {
    id: "voter-id",
    name: "Voter ID Card (EPIC)",
    nameHi: "मतदाता पहचान पत्र",
    nameMr: "मतदार ओळखपत्र",
    description: "Electoral Photo Identity Card for voting - Apply online through National Voters' Service Portal",
    descriptionHi: "मतदान के लिए चुनावी फोटो पहचान पत्र - राष्ट्रीय मतदाता सेवा पोर्टल के माध्यम से ऑनलाइन आवेदन करें",
    descriptionMr: "मतदानासाठी निवडणूक फोटो ओळखपत्र - राष्ट्रीय मतदार सेवा पोर्टलद्वारे ऑनलाइन अर्ज करा",
    category: "Other",
    office: "Election Commission of India / District Election Office",
    officeHi: "भारत निर्वाचन आयोग / जिला निर्वाचन कार्यालय",
    officeMr: "भारत निवडणूक आयोग / जिल्हा निवडणूक कार्यालय",
    address: "District Election Office",
    phone: "1950",
    email: "eci@eci.gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Age proof (18+ years)",
      "Address proof (Aadhaar/Ration card/Utility bill)",
      "Passport size photographs",
      "Form 6 (for new registration)"
    ],
    documentsHi: [
      "आयु प्रमाण (18+ वर्ष)",
      "पता प्रमाण (आधार/राशन कार्ड/उपयोगिता बिल)",
      "पासपोर्ट साइज फोटो",
      "फॉर्म 6 (नए पंजीकरण के लिए)"
    ],
    documentsMr: [
      "वय पुरावा (18+ वर्षे)",
      "पत्ता पुरावा (आधार/रेशन कार्ड/युटिलिटी बिल)",
      "पासपोर्ट साइज फोटो",
      "फॉर्म 6 (नवीन नोंदणीसाठी)"
    ],
    fees: "Free",
    feesHi: "निःशुल्क",
    feesMr: "मोफत",
    processingTime: "30-45 days",
    processingTimeHi: "30-45 दिन",
    processingTimeMr: "30-45 दिवस",
    isOnline: true,
    website: "https://www.nvsp.in",
    tags: ["voter-id", "election", "identity", "epic", "all-india"]
  },
  // AADHAAR CARD
  {
    id: "aadhaar-card",
    name: "Aadhaar Card",
    nameHi: "आधार कार्ड",
    nameMr: "आधार कार्ड",
    description: "Unique Identification Number for Indian residents - Enroll at Aadhaar Seva Kendras",
    descriptionHi: "भारतीय निवासियों के लिए विशिष्ट पहचान संख्या - आधार सेवा केंद्रों पर नामांकन करें",
    descriptionMr: "भारतीय रहिवाशांसाठी अद्वितीय ओळख क्रमांक - आधार सेवा केंद्रांवर नोंदणी करा",
    category: "Other",
    office: "Aadhaar Seva Kendra / UIDAI",
    officeHi: "आधार सेवा केंद्र / यूआईडीएआई",
    officeMr: "आधार सेवा केंद्र / यूआयडीएआय",
    address: "Aadhaar Enrollment Centers",
    phone: "1947",
    email: "help@uidai.gov.in",
    workingHours: "9:00 AM - 6:00 PM (Mon-Sat)",
    workingHoursHi: "सुबह 9:00 - शाम 6:00 (सोम-शनि)",
    workingHoursMr: "सकाळी 9:00 - संध्याकाळी 6:00 (सोम-शनि)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Proof of identity (Birth certificate/School certificate/PAN)",
      "Proof of address (Ration card/Utility bill/Rent agreement)",
      "Date of birth proof"
    ],
    documentsHi: [
      "पहचान प्रमाण (जन्म प्रमाण पत्र/स्कूल प्रमाण पत्र/पैन)",
      "पता प्रमाण (राशन कार्ड/उपयोगिता बिल/किराया समझौता)",
      "जन्म तिथि प्रमाण"
    ],
    documentsMr: [
      "ओळख पुरावा (जन्म दाखला/शाळा प्रमाणपत्र/पॅन)",
      "पत्ता पुरावा (रेशन कार्ड/युटिलिटी बिल/भाडे करार)",
      "जन्मतारखेचा पुरावा"
    ],
    fees: "Free (First time), ₹50 (Update)",
    feesHi: "निःशुल्क (पहली बार), ₹50 (अपडेट)",
    feesMr: "मोफत (पहिल्यांदा), ₹50 (अपडेट)",
    processingTime: "90 days",
    processingTimeHi: "90 दिन",
    processingTimeMr: "90 दिवस",
    isOnline: true,
    website: "https://uidai.gov.in",
    tags: ["aadhaar", "identity", "uid", "biometric", "all-india"]
  },
  // PROPERTY TAX
  {
    id: "property-tax",
    name: "Property Tax Payment",
    nameHi: "संपत्ति कर भुगतान",
    nameMr: "मालमत्ता कर भरणा",
    description: "Annual property tax payment to Municipal Corporation - Pay online or at municipal offices",
    descriptionHi: "नगर निगम को वार्षिक संपत्ति कर भुगतान - ऑनलाइन या नगरपालिका कार्यालयों में भुगतान करें",
    descriptionMr: "महानगरपालिकेला वार्षिक मालमत्ता कर भरणा - ऑनलाइन किंवा महानगरपालिका कार्यालयांमध्ये भरा",
    category: "Revenue",
    office: "Municipal Corporation / Nagar Palika",
    officeHi: "नगर निगम / नगर पालिका",
    officeMr: "महानगरपालिका / नगर पालिका",
    address: "Municipal Office",
    phone: "1800-XXX-XXXX",
    email: "propertytax@municipal.gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Property ownership documents",
      "Previous tax receipts",
      "Property ID / Assessment number",
      "Aadhaar card"
    ],
    documentsHi: [
      "संपत्ति स्वामित्व दस्तावेज",
      "पिछली कर रसीदें",
      "संपत्ति आईडी / मूल्यांकन संख्या",
      "आधार कार्ड"
    ],
    documentsMr: [
      "मालमत्ता मालकी कागदपत्रे",
      "मागील कर पावत्या",
      "मालमत्ता आयडी / मूल्यांकन क्रमांक",
      "आधार कार्ड"
    ],
    fees: "Varies by property value and location",
    feesHi: "संपत्ति मूल्य और स्थान के अनुसार भिन्न",
    feesMr: "मालमत्ता मूल्य आणि स्थानानुसार बदलते",
    processingTime: "Immediate (Online payment)",
    processingTimeHi: "तत्काल (ऑनलाइन भुगतान)",
    processingTimeMr: "तात्काळ (ऑनलाइन पेमेंट)",
    isOnline: true,
    website: "https://www.municipal.gov.in",
    tags: ["property-tax", "municipal", "tax", "revenue", "all-india"]
  },
  // MARRIAGE CERTIFICATE
  {
    id: "marriage-certificate",
    name: "Marriage Certificate",
    nameHi: "विवाह प्रमाण पत्र",
    nameMr: "विवाह नोंदणी प्रमाणपत्र",
    description: "Legal proof of marriage registration - Register at Sub-Registrar office or online",
    descriptionHi: "विवाह पंजीकरण का कानूनी प्रमाण - उप-पंजीयक कार्यालय या ऑनलाइन पंजीकरण करें",
    descriptionMr: "विवाह नोंदणीचा कायदेशीर पुरावा - उप-निबंधक कार्यालय किंवा ऑनलाइन नोंदणी करा",
    category: "Revenue",
    office: "Sub-Registrar Office / Marriage Registrar",
    officeHi: "उप-पंजीयक कार्यालय / विवाह पंजीयक",
    officeMr: "उप-निबंधक कार्यालय / विवाह निबंधक",
    address: "Sub-Registrar Office",
    phone: "1077",
    email: "marriage@registrar.gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Marriage invitation card",
      "Age proof of bride and groom",
      "Address proof of both parties",
      "Passport size photographs",
      "Two witnesses with ID proof"
    ],
    documentsHi: [
      "विवाह निमंत्रण पत्र",
      "वर और वधू का आयु प्रमाण",
      "दोनों पक्षों का पता प्रमाण",
      "पासपोर्ट साइज फोटो",
      "आईडी प्रमाण के साथ दो गवाह"
    ],
    documentsMr: [
      "लग्न निमंत्रण पत्र",
      "वर आणि वधूचा वय पुरावा",
      "दोन्ही पक्षांचा पत्ता पुरावा",
      "पासपोर्ट साइज फोटो",
      "आयडी पुराव्यासह दोन साक्षीदार"
    ],
    fees: "₹100-500 (varies by state)",
    feesHi: "₹100-500 (राज्य के अनुसार भिन्न)",
    feesMr: "₹100-500 (राज्यानुसार बदलते)",
    processingTime: "7-30 days",
    processingTimeHi: "7-30 दिन",
    processingTimeMr: "7-30 दिवस",
    isOnline: true,
    website: "https://www.india.gov.in/topics/social-development/marriage-registration",
    tags: ["marriage", "certificate", "registration", "revenue", "all-india"]
  },
  // DEATH CERTIFICATE
  {
    id: "death-certificate",
    name: "Death Certificate",
    nameHi: "मृत्यु प्रमाण पत्र",
    nameMr: "मृत्यू प्रमाणपत्र",
    description: "Official document certifying death registration - Apply at Municipal Corporation or Gram Panchayat",
    descriptionHi: "मृत्यु पंजीकरण को प्रमाणित करने वाला आधिकारिक दस्तावेज - नगर निगम या ग्राम पंचायत में आवेदन करें",
    descriptionMr: "मृत्यू नोंदणी प्रमाणित करणारे अधिकृत कागदपत्र - महानगरपालिका किंवा ग्राम पंचायतमध्ये अर्ज करा",
    category: "Revenue",
    office: "Registrar Office / Municipal Corporation",
    officeHi: "रजिस्ट्रार कार्यालय / नगर निगम",
    officeMr: "रजिस्ट्रार कार्यालय / महानगरपालिका",
    address: "Municipal Office / Gram Panchayat",
    phone: "1077",
    email: "registrar@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    taluka: "All Talukas",
    state: "All India",
    documents: [
      "Hospital death summary / Medical certificate",
      "Deceased person's identity proof",
      "Applicant's identity proof",
      "Address proof"
    ],
    documentsHi: [
      "अस्पताल मृत्यु सारांश / मेडिकल सर्टिफिकेट",
      "मृतक व्यक्ति का पहचान प्रमाण",
      "आवेदक का पहचान प्रमाण",
      "पता प्रमाण"
    ],
    documentsMr: [
      "हॉस्पिटल मृत्यू सारांश / वैद्यकीय प्रमाणपत्र",
      "मृत व्यक्तीचा ओळख पुरावा",
      "अर्जदाराचा ओळख पुरावा",
      "पत्ता पुरावा"
    ],
    fees: "₹50 (Free if registered within 21 days)",
    feesHi: "₹50 (21 दिनों के भीतर पंजीकृत होने पर निःशुल्क)",
    feesMr: "₹50 (21 दिवसांच्या आत नोंदणी केल्यास मोफत)",
    processingTime: "7-15 days",
    processingTimeHi: "7-15 दिन",
    processingTimeMr: "7-15 दिवस",
    isOnline: true,
    website: "https://crsorgi.gov.in",
    tags: ["death", "certificate", "registration", "revenue", "all-india"]
  }
];

// Import expanded services
import { expandedServices } from './servicesExpanded';

// Merge all services
export const allServices: Service[] = [...services, ...expandedServices];

// Filter services by category and district
export function getServicesByCategory(category: string): Service[] {
  return allServices.filter(service => service.category === category);
}

export function getServicesByDistrict(district: string): Service[] {
  return allServices.filter(service => 
    service.district === "All Districts" || service.district === district
  );
}

export function getServicesByState(state: string): Service[] {
  return allServices.filter(service => 
    service.state === state || service.state === "All India"
  );
}

export function getServicesByDistrictAndTaluka(district: string, taluka?: string): Service[] {
  return allServices.filter(service => {
    const districtMatch = service.district === "All Districts" || service.district === district;
    const talukaMatch = !taluka || service.taluka === taluka;
    return districtMatch && talukaMatch;
  });
}

export function searchServices(query: string, filters?: {
  district?: string;
  taluka?: string;
  state?: string;
  category?: string;
}): Service[] {
  const searchTerm = query.toLowerCase();
  let results = allServices.filter(service => 
    service.name.toLowerCase().includes(searchTerm) ||
    service.nameHi.toLowerCase().includes(searchTerm) ||
    service.nameMr.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );

  // Apply filters
  if (filters) {
    if (filters.district) {
      results = results.filter(s => s.district === filters.district || s.district === "All Districts");
    }
    if (filters.taluka) {
      results = results.filter(s => s.taluka === filters.taluka);
    }
    if (filters.state) {
      results = results.filter(s => s.state === filters.state || s.state === "All India");
    }
    if (filters.category) {
      results = results.filter(s => s.category === filters.category);
    }
  }

  return results;
}

export const TOTAL_SERVICES = allServices.length;