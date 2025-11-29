export interface Scheme {
  id: string;
  name_en: string;
  name_mr: string;
  name_hi: string;
  category: string;
  description_en: string;
  description_mr: string;
  description_hi: string;
  eligibility: {
    age?: string;
    income?: string;
    residence: string;
    documents: string[];
  };
  benefits_en: string[];
  benefits_mr: string[];
  benefits_hi: string[];
  helpline: string;
  website?: string;
  districts: string[];
}

export const schemes: Scheme[] = [
  {
    id: "mahatma-jyotiba-phule-jan-arogya-yojana",
    name_en: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    name_mr: "महात्मा ज्योतिबा फुले जन आरोग्य योजना",
    name_hi: "महात्मा ज्योतिबा फुले जन आरोग्य योजना",
    category: "Health",
    description_en: "Free health insurance coverage up to ₹1.5 lakh per family per year for hospitalization",
    description_mr: "दरवर्षी प्रति कुटुंब ₹1.5 लाख पर्यंत मोफत आरोग्य विमा संरक्षण",
    description_hi: "प्रति परिवार प्रति वर्ष ₹1.5 लाख तक मुफ्त स्वास्थ्य बीमा कवरेज",
    eligibility: {
      income: "Below ₹1 lakh annual income",
      residence: "Maharashtra Residents",
      documents: ["Aadhar Card", "Ration Card", "Income Certificate"]
    },
    benefits_en: [
      "Cashless treatment up to ₹1.5 lakh",
      "Coverage for 1071 procedures",
      "Pre and post hospitalization coverage"
    ],
    benefits_mr: [
      "₹1.5 लाख पर्यंत रोखरहित उपचार",
      "1071 प्रक्रियांसाठी संरक्षण",
      "रुग्णालयात दाखल होण्यापूर्वी आणि नंतरचे संरक्षण"
    ],
    benefits_hi: [
      "₹1.5 लाख तक कैशलेस उपचार",
      "1071 प्रक्रियाओं के लिए कवरेज",
      "अस्पताल में भर्ती से पहले और बाद की कवरेज"
    ],
    helpline: "14444",
    website: "https://www.jeevandayee.gov.in/",
    districts: ["All"]
  },
  {
    id: "lek-ladki-yojana",
    name_en: "Lek Ladki Yojana",
    name_mr: "लेक लाडकी योजना",
    name_hi: "लेक लाडकी योजना",
    category: "Education",
    description_en: "Financial assistance for girl child education from birth to higher education",
    description_mr: "मुलींच्या जन्मापासून उच्च शिक्षणापर्यंत आर्थिक सहाय्य",
    description_hi: "बालिका के जन्म से उच्च शिक्षा तक वित्तीय सहायता",
    eligibility: {
      residence: "Maharashtra Residents",
      income: "Yellow or Orange Ration Card holders",
      documents: ["Birth Certificate", "Ration Card", "Aadhar Card", "Bank Account"]
    },
    benefits_en: [
      "₹5,000 at birth",
      "₹6,000 at Class 1 admission",
      "₹7,000 at Class 6 admission",
      "₹8,000 at Class 11 admission",
      "₹75,000 at age 18"
    ],
    benefits_mr: [
      "जन्माच्या वेळी ₹5,000",
      "इयत्ता 1 प्रवेशावर ₹6,000",
      "इयत्ता 6 प्रवेशावर ₹7,000",
      "इयत्ता 11 प्रवेशावर ₹8,000",
      "18 वर्षांच्या वयात ₹75,000"
    ],
    benefits_hi: [
      "जन्म पर ₹5,000",
      "कक्षा 1 में प्रवेश पर ₹6,000",
      "कक्षा 6 में प्रवेश पर ₹7,000",
      "कक्षा 11 में प्रवेश पर ₹8,000",
      "18 वर्ष की आयु में ₹75,000"
    ],
    helpline: "1800-120-8040",
    districts: ["All"]
  },
  {
    id: "shetkari-sanman-nidhi",
    name_en: "Namo Shetkari Sanman Nidhi Yojana",
    name_mr: "नमो शेतकरी सन्मान निधी योजना",
    name_hi: "नमो शेतकारी सन्मान निधि योजना",
    category: "Agriculture",
    description_en: "Direct income support of ₹6,000 per year to farmers",
    description_mr: "शेतकऱ्यांना दरवर्षी ₹6,000 थेट उत्पन्न सहाय्य",
    description_hi: "किसानों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता",
    eligibility: {
      residence: "Maharashtra Farmers",
      documents: ["7/12 Extract", "8A Extract", "Aadhar Card", "Bank Account"]
    },
    benefits_en: [
      "₹2,000 per installment",
      "3 installments per year",
      "Direct bank transfer"
    ],
    benefits_mr: [
      "प्रति हप्ता ₹2,000",
      "वर्षातून 3 हप्ते",
      "थेट बँक हस्तांतरण"
    ],
    benefits_hi: [
      "प्रति किस्त ₹2,000",
      "वर्ष में 3 किस्तें",
      "सीधे बैंक हस्तांतरण"
    ],
    helpline: "1800-233-4251",
    districts: ["All"]
  },
  {
    id: "rajarshi-shahu-scholarship",
    name_en: "Rajarshi Shahu Maharaj Scholarship",
    name_mr: "राजर्षी शाहू महाराज शिष्यवृत्ती",
    name_hi: "राजर्षी शाहू महाराज छात्रवृत्ति",
    category: "Education",
    description_en: "Scholarship for OBC students pursuing higher education",
    description_mr: "उच्च शिक्षण घेणाऱ्या ओबीसी विद्यार्थ्यांसाठी शिष्यवृत्ती",
    description_hi: "उच्च शिक्षा प्राप्त करने वाले ओबीसी छात्रों के लिए छात्रवृत्ति",
    eligibility: {
      residence: "Maharashtra Residents",
      income: "Family income below ₹8 lakh per annum",
      documents: ["Caste Certificate", "Income Certificate", "Mark Sheets", "Aadhar Card"]
    },
    benefits_en: [
      "Tuition fees reimbursement",
      "Maintenance allowance",
      "For professional and non-professional courses"
    ],
    benefits_mr: [
      "शिक्षण शुल्क परतावा",
      "देखभाल भत्ता",
      "व्यावसायिक आणि गैर-व्यावसायिक अभ्यासक्रमांसाठी"
    ],
    benefits_hi: [
      "ट्यूशन फीस की प्रतिपूर्ति",
      "रखरखाव भत्ता",
      "व्यावसायिक और गैर-व्यावसायिक पाठ्यक्रमों के लिए"
    ],
    helpline: "022-49150800",
    website: "https://mahadbtmahait.gov.in/",
    districts: ["All"]
  },
  {
    id: "solar-pump-subsidy",
    name_en: "Mukhyamantri Saur Krishi Pump Yojana",
    name_mr: "मुख्यमंत्री सौर कृषी पंप योजना",
    name_hi: "मुख्यमंत्री सौर कृषि पंप योजना",
    category: "Agriculture",
    description_en: "Subsidy for installation of solar-powered agricultural pumps",
    description_mr: "सौर ऊर्जेवर चालणाऱ्या कृषी पंपांच्या स्थापनेसाठी अनुदान",
    description_hi: "सौर ऊर्जा से चलने वाले कृषि पंपों की स्थापना के लिए सब्सिडी",
    eligibility: {
      residence: "Maharashtra Farmers",
      documents: ["7/12 Extract", "Aadhar Card", "Bank Account", "Electricity Bill"]
    },
    benefits_en: [
      "Up to 95% subsidy for 3 HP pump",
      "Up to 90% subsidy for 5 HP pump",
      "Free electricity for 25 years"
    ],
    benefits_mr: [
      "3 एचपी पंपासाठी 95% पर्यंत अनुदान",
      "5 एचपी पंपासाठी 90% पर्यंत अनुदान",
      "25 वर्षांसाठी मोफत वीज"
    ],
    benefits_hi: [
      "3 एचपी पंप के लिए 95% तक सब्सिडी",
      "5 एचपी पंप के लिए 90% तक सब्सिडी",
      "25 वर्षों के लिए मुफ्त बिजली"
    ],
    helpline: "1800-233-3435",
    website: "https://www.mahadiscom.in/",
    districts: ["All"]
  }
];

export const helplines = [
  {
    name_en: "Maharashtra Citizen Helpline",
    name_mr: "महाराष्ट्र नागरिक हेल्पलाइन",
    name_hi: "महाराष्ट्र नागरिक हेल्पलाइन",
    number: "1077",
    description_en: "24x7 Citizen Services Helpline",
    description_mr: "24x7 नागरिक सेवा हेल्पलाइन",
    description_hi: "24x7 नागरिक सेवा हेल्पलाइन"
  },
  {
    name_en: "Women Helpline",
    name_mr: "महिला हेल्पलाइन",
    name_hi: "महिला हेल्पलाइन",
    number: "1091",
    description_en: "Women in distress helpline",
    description_mr: "संकटात असलेल्या महिलांसाठी हेल्पलाइन",
    description_hi: "संकट में महिलाओं के लिए हेल्पलाइन"
  },
  {
    name_en: "Child Helpline",
    name_mr: "बाल हेल्पलाइन",
    name_hi: "बाल हेल्पलाइन",
    number: "1098",
    description_en: "Child protection and welfare",
    description_mr: "बाल संरक्षण आणि कल्याण",
    description_hi: "बाल संरक्षण और कल्याण"
  },
  {
    name_en: "Police Emergency",
    name_mr: "पोलीस आपत्कालीन",
    name_hi: "पुलिस आपातकालीन",
    number: "100",
    description_en: "Police emergency services",
    description_mr: "पोलीस आपत्कालीन सेवा",
    description_hi: "पुलिस आपातकालीन सेवाएं"
  },
  {
    name_en: "Ambulance",
    name_mr: "रुग्णवाहिका",
    name_hi: "एम्बुलेंस",
    number: "108",
    description_en: "Emergency medical services",
    description_mr: "आपत्कालीन वैद्यकीय सेवा",
    description_hi: "आपातकालीन चिकित्सा सेवाएं"
  },
  {
    name_en: "Fire Brigade",
    name_mr: "अग्निशामक दल",
    name_hi: "दमकल",
    number: "101",
    description_en: "Fire emergency services",
    description_mr: "अग्नि आपत्कालीन सेवा",
    description_hi: "अग्नि आपातकालीन सेवाएं"
  }
];
