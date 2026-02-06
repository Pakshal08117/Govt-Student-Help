// Government Services Data

export interface Service {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  category: "Health" | "Education" | "Agriculture" | "Revenue" | "Public Works" | "Other";
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

// Sample services data - Comprehensive list of Government Services
export const services: Service[] = [
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    nameHi: "जन्म प्रमाण पत्र",
    nameMr: "जन्म दाखला",
    description: "Official document certifying birth registration",
    descriptionHi: "जन्म पंजीकरण को प्रमाणित करने वाला आधिकारिक दस्तावेज",
    descriptionMr: "जन्म नोंदणी प्रमाणित करणारे अधिकृत कागदपत्र",
    category: "Revenue",
    office: "Registrar Office",
    officeHi: "रजिस्ट्रार कार्यालय",
    officeMr: "रजिस्ट्रार कार्यालय",
    address: "District Collectorate",
    phone: "1077",
    email: "registrar@gov.in",
    workingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    workingHoursHi: "सुबह 10:00 - शाम 5:00 (सोम-शुक्र)",
    workingHoursMr: "सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)",
    district: "All Districts",
    documents: [
      "Hospital discharge summary",
      "Parents' identity proof",
      "Address proof",
      "Marriage certificate of parents"
    ],
    documentsHi: [
      "अस्पताल डिस्चार्ज सारांश",
      "माता-पिता का पहचान प्रमाण",
      "पता प्रमाण",
      "माता-पिता का विवाह प्रमाण पत्र"
    ],
    documentsMr: [
      "हॉस्पिटल डिस्चार्ज सारांश",
      "पालकांचा ओळख पुरावा",
      "पत्ता पुरावा",
      "पालकांचे लग्न प्रमाणपत्र"
    ],
    fees: "₹50",
    feesHi: "₹50",
    feesMr: "₹50",
    processingTime: "7-15 days",
    processingTimeHi: "7-15 दिन",
    processingTimeMr: "7-15 दिवस",
    isOnline: true,
    website: "https://crsorgi.gov.in",
    tags: ["birth", "certificate", "registration", "revenue"]
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
  }
];

// Filter services by category and district
export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}

export function getServicesByDistrict(district: string): Service[] {
  return services.filter(service => 
    service.district === "All Districts" || service.district === district
  );
}

export function searchServices(query: string): Service[] {
  const searchTerm = query.toLowerCase();
  return services.filter(service => 
    service.name.toLowerCase().includes(searchTerm) ||
    service.nameHi.toLowerCase().includes(searchTerm) ||
    service.nameMr.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}