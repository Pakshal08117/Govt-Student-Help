// Document assistance services with pricing
export interface DocumentService {
  id: string;
  name_en: string;
  name_mr: string;
  name_hi: string;
  description_en: string;
  description_mr: string;
  description_hi: string;
  price: number;
  processingTime: string;
  steps: {
    step_en: string;
    step_mr: string;
    step_hi: string;
  }[];
  requiredItems: string[];
}

export const documentServices: DocumentService[] = [
  {
    id: "aadhar-assistance",
    name_en: "Aadhar Card Application Assistance",
    name_mr: "आधार कार्ड अर्ज सहाय्य",
    name_hi: "आधार कार्ड आवेदन सहायता",
    description_en: "Complete guidance for Aadhar card application with document preparation",
    description_mr: "कागदपत्र तयारीसह आधार कार्ड अर्जासाठी संपूर्ण मार्गदर्शन",
    description_hi: "दस्तावेज़ तैयारी के साथ आधार कार्ड आवेदन के लिए पूर्ण मार्गदर्शन",
    price: 2,
    processingTime: "1-2 days for guidance, 90 days for card",
    steps: [
      {
        step_en: "Visit nearest Aadhar enrollment center with our guidance",
        step_mr: "आमच्या मार्गदर्शनासह जवळच्या आधार नोंदणी केंद्राला भेट द्या",
        step_hi: "हमारे मार्गदर्शन के साथ निकटतम आधार नामांकन केंद्र पर जाएं"
      },
      {
        step_en: "We help you fill the enrollment form correctly",
        step_mr: "आम्ही तुम्हाला नोंदणी फॉर्म योग्यरित्या भरण्यास मदत करतो",
        step_hi: "हम आपको नामांकन फॉर्म सही तरीके से भरने में मदद करते हैं"
      },
      {
        step_en: "Provide biometric data (we guide you through the process)",
        step_mr: "बायोमेट्रिक डेटा प्रदान करा (आम्ही प्रक्रियेद्वारे मार्गदर्शन करतो)",
        step_hi: "बायोमेट्रिक डेटा प्रदान करें (हम प्रक्रिया के माध्यम से मार्गदर्शन करते हैं)"
      },
      {
        step_en: "Submit required documents (we verify before submission)",
        step_mr: "आवश्यक कागदपत्रे सबमिट करा (आम्ही सबमिशनपूर्वी पडताळतो)",
        step_hi: "आवश्यक दस्तावेज़ जमा करें (हम सबमिशन से पहले सत्यापित करते हैं)"
      },
      {
        step_en: "Track your application status with our help",
        step_mr: "आमच्या मदतीने तुमच्या अर्जाची स्थिती ट्रॅक करा",
        step_hi: "हमारी मदद से अपने आवेदन की स्थिति ट्रैक करें"
      }
    ],
    requiredItems: ["Birth certificate or school certificate", "Address proof", "One photograph"]
  },
  {
    id: "income-certificate-assistance",
    name_en: "Income Certificate Application Assistance",
    name_mr: "उत्पन्न प्रमाणपत्र अर्ज सहाय्य",
    name_hi: "आय प्रमाण पत्र आवेदन सहायता",
    description_en: "Expert help in obtaining income certificate with proper documentation",
    description_mr: "योग्य कागदपत्रांसह उत्पन्न प्रमाणपत्र मिळविण्यात तज्ञ मदत",
    description_hi: "उचित दस्तावेज़ीकरण के साथ आय प्रमाण पत्र प्राप्त करने में विशेषज्ञ सहायता",
    price: 2,
    processingTime: "1 day for guidance, 7-15 days for certificate",
    steps: [
      {
        step_en: "We help you gather all required salary/income documents",
        step_mr: "आम्ही तुम्हाला सर्व आवश्यक पगार/उत्पन्न कागदपत्रे गोळा करण्यास मदत करतो",
        step_hi: "हम आपको सभी आवश्यक वेतन/आय दस्तावेज़ एकत्र करने में मदद करते हैं"
      },
      {
        step_en: "Prepare and verify affidavit (we provide format)",
        step_mr: "प्रतिज्ञापत्र तयार करा आणि पडताळा (आम्ही फॉरमॅट प्रदान करतो)",
        step_hi: "शपथ पत्र तैयार करें और सत्यापित करें (हम प्रारूप प्रदान करते हैं)"
      },
      {
        step_en: "Submit application at Tehsil office with our guidance",
        step_mr: "आमच्या मार्गदर्शनासह तहसील कार्यालयात अर्ज सबमिट करा",
        step_hi: "हमारे मार्गदर्शन के साथ तहसील कार्यालय में आवेदन जमा करें"
      },
      {
        step_en: "Follow up on application status",
        step_mr: "अर्ज स्थितीवर पाठपुरावा करा",
        step_hi: "आवेदन स्थिति पर अनुवर्ती कार्रवाई करें"
      }
    ],
    requiredItems: ["Aadhar card", "Ration card", "Salary slips or bank statement", "Affidavit"]
  },
  {
    id: "caste-certificate-assistance",
    name_en: "Caste Certificate Application Assistance",
    name_mr: "जात प्रमाणपत्र अर्ज सहाय्य",
    name_hi: "जाति प्रमाण पत्र आवेदन सहायता",
    description_en: "Complete support for caste certificate application process",
    description_mr: "जात प्रमाणपत्र अर्ज प्रक्रियेसाठी संपूर्ण समर्थन",
    description_hi: "जाति प्रमाण पत्र आवेदन प्रक्रिया के लिए पूर्ण समर्थन",
    price: 2,
    processingTime: "1 day for guidance, 15-30 days for certificate",
    steps: [
      {
        step_en: "Collect parent's caste certificate (we guide where to get)",
        step_mr: "पालकांचे जात प्रमाणपत्र गोळा करा (आम्ही कुठे मिळेल ते सांगतो)",
        step_hi: "माता-पिता का जाति प्रमाण पत्र एकत्र करें (हम बताते हैं कहां मिलेगा)"
      },
      {
        step_en: "Prepare affidavit on stamp paper (we provide format)",
        step_mr: "स्टॅम्प पेपरवर प्रतिज्ञापत्र तयार करा (आम्ही फॉरमॅट देतो)",
        step_hi: "स्टाम्प पेपर पर शपथ पत्र तैयार करें (हम प्रारूप देते हैं)"
      },
      {
        step_en: "Submit at Tehsil office with proper documentation",
        step_mr: "योग्य कागदपत्रांसह तहसील कार्यालयात सबमिट करा",
        step_hi: "उचित दस्तावेज़ीकरण के साथ तहसील कार्यालय में जमा करें"
      },
      {
        step_en: "Track verification process",
        step_mr: "पडताळणी प्रक्रिया ट्रॅक करा",
        step_hi: "सत्यापन प्रक्रिया ट्रैक करें"
      }
    ],
    requiredItems: ["School leaving certificate", "Parent's caste certificate", "Aadhar card", "Affidavit"]
  }
];

// Application fees structure
export interface ApplicationFee {
  schemeId: string;
  baseFee: number;
  documentAssistanceFee: number;
  processingFee: number;
  total: number;
}

export function calculateApplicationFee(
  schemeId: string,
  needsDocumentAssistance: boolean,
  missingDocuments: number
): ApplicationFee {
  const baseFee = 0; // Most government schemes are free
  const documentAssistanceFee = needsDocumentAssistance ? missingDocuments * 2 : 0;
  const processingFee = 10; // Nominal processing fee
  
  return {
    schemeId,
    baseFee,
    documentAssistanceFee,
    processingFee,
    total: baseFee + documentAssistanceFee + processingFee
  };
}
