/**
 * Official Government & Student Help Assistant for India
 * 
 * YOUR RESPONSIBILITY:
 * - Explain government schemes, scholarships, and services
 * - Assist citizens and students with accurate information
 * - Follow Indian government communication standards
 * 
 * STRICT RULES:
 * 1. Do NOT guess or invent data
 * 2. Do NOT repeat information
 * 3. Do NOT speak unless explicitly allowed
 * 4. Keep responses short, structured, and factual
 * 5. Use bullet points or numbered lists
 * 6. No emojis, no opinions, no casual language
 * 7. If information is unavailable, say: "Information not available from official sources."
 * 
 * You are NOT a general chatbot.
 * You are a civic information assistant.
 */

import { validateAdminQuery, getOfficialCount, formatHierarchyResponse } from '@/utils/indiaAdminValidator';
import { classifyIntent, getIntentDescription, type UserIntent } from '@/utils/intentClassifier';

export interface OfficialResponse {
  message: string;
  type: 'info' | 'navigation' | 'error' | 'data';
  data?: any;
  intent?: UserIntent;
}

/**
 * Generate official government response
 */
export function generateOfficialResponse(query: string, lang: string = 'en'): OfficialResponse {
  const input = query.toLowerCase().trim();
  
  // Classify intent first
  const intent = classifyIntent(input);
  console.log(`[Intent Classification] Query: "${query}" → Intent: ${intent}`);
  
  // Validate administrative queries first (LOCATION intent)
  const adminValidation = validateAdminQuery(input);
  if (adminValidation.response) {
    return {
      message: formatForOfficial(adminValidation.response),
      type: 'data',
      intent: 'LOCATION'
    };
  }
  
  // Scholarship queries
  if (containsKeywords(input, ['scholarship', 'छात्रवृत्ति', 'शिष्यवृत्ती'])) {
    return {
      message: getScholarshipInfo(lang),
      type: 'info',
      intent: 'SCHOLARSHIP'
    };
  }
  
  // Medical/Health queries
  if (containsKeywords(input, ['medical', 'health', 'hospital', 'treatment', 'वैद्यकीय', 'आरोग्य', 'इलाज'])) {
    return {
      message: getMedicalInfo(lang),
      type: 'info',
      intent: 'SCHEME'
    };
  }
  
  // Financial assistance queries
  if (containsKeywords(input, ['financial', 'loan', 'money', 'आर्थिक', 'कर्ज', 'पैसा'])) {
    return {
      message: getFinancialInfo(lang),
      type: 'info',
      intent: 'SCHEME'
    };
  }
  
  // Agriculture queries
  if (containsKeywords(input, ['farmer', 'agriculture', 'crop', 'शेतकरी', 'कृषि', 'खेती'])) {
    return {
      message: getAgricultureInfo(lang),
      type: 'info',
      intent: 'SCHEME'
    };
  }
  
  // Document queries
  if (containsKeywords(input, ['birth certificate', 'जन्म प्रमाण', 'जन्म दाखला'])) {
    return {
      message: getDocumentInfo('birth', lang),
      type: 'info',
      intent: 'PLATFORM_HELP'
    };
  }
  
  if (containsKeywords(input, ['ration card', 'राशन कार्ड', 'रेशन कार्ड'])) {
    return {
      message: getDocumentInfo('ration', lang),
      type: 'info',
      intent: 'PLATFORM_HELP'
    };
  }
  
  if (containsKeywords(input, ['income certificate', 'आय प्रमाण', 'उत्पन्न दाखला'])) {
    return {
      message: getDocumentInfo('income', lang),
      type: 'info',
      intent: 'PLATFORM_HELP'
    };
  }
  
  // Navigation commands
  if (containsKeywords(input, ['open schemes', 'schemes page', 'योजना'])) {
    return {
      message: 'Redirecting to Schemes page.',
      type: 'navigation',
      data: { route: '/schemes' },
      intent: 'PLATFORM_HELP'
    };
  }
  
  if (containsKeywords(input, ['open services', 'services page', 'सेवा'])) {
    return {
      message: 'Redirecting to Services page.',
      type: 'navigation',
      data: { route: '/services' },
      intent: 'PLATFORM_HELP'
    };
  }
  
  if (containsKeywords(input, ['open admin', 'admin panel', 'प्रशासक', 'एडमिन'])) {
    return {
      message: 'Redirecting to Admin panel.',
      type: 'navigation',
      data: { route: '/admin' },
      intent: 'ADMIN'
    };
  }
  
  // Helpline queries
  if (containsKeywords(input, ['helpline', 'contact', 'phone number', 'हेल्पलाइन'])) {
    return {
      message: getHelplineInfo(lang),
      type: 'info',
      intent: 'PLATFORM_HELP'
    };
  }
  
  // Platform features
  if (containsKeywords(input, ['features', 'what can', 'how to use', 'वैशिष्ट्य'])) {
    return {
      message: getPlatformInfo(lang),
      type: 'info',
      intent: 'PLATFORM_HELP'
    };
  }
  
  // Default response - use classified intent
  return {
    message: getDefaultResponse(lang),
    type: 'info',
    intent: intent
  };
}

/**
 * Helper function to check if input contains any keywords
 */
function containsKeywords(input: string, keywords: string[]): boolean {
  return keywords.some(keyword => input.includes(keyword.toLowerCase()));
}

/**
 * Format response for official tone (remove ALL emojis, format properly)
 */
function formatForOfficial(text: string): string {
  // Remove ALL emojis and special characters
  const withoutEmojis = text
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/[•✅✓✔️❌✗✘]/g, '•')
    .replace(/[👋🎯🎤🌟✨💡🔒📝📍🛑]/g, '');
  
  // Clean up extra whitespace
  return withoutEmojis.replace(/\s+/g, ' ').trim();
}

/**
 * Response templates in official government tone
 */

function getScholarshipInfo(lang: string): string {
  if (lang === 'hi') {
    return `छात्रवृत्ति जानकारी:

1. राष्ट्रीय छात्रवृत्ति पोर्टल: scholarships.gov.in
2. PM छात्रवृत्ति योजना: भूतपूर्व सैनिकों के बच्चों के लिए
3. हेल्पलाइन: 0120-6619540
4. योजना अनुभाग में 40+ छात्रवृत्तियां उपलब्ध

आवेदन प्रक्रिया के लिए योजना पृष्ठ देखें।`;
  }
  
  if (lang === 'mr') {
    return `शिष्यवृत्ती माहिती:

1. राष्ट्रीय शिष्यवृत्ती पोर्टल: scholarships.gov.in
2. PM शिष्यवृत्ती योजना: भूतपूर्व सैनिकांच्या मुलांसाठी
3. हेल्पलाइन: 0120-6619540
4. योजना विभागात 40+ शिष्यवृत्ती उपलब्ध

अर्ज प्रक्रियेसाठी योजना पृष्ठ पहा।`;
  }
  
  return `Scholarship Information:

1. National Scholarship Portal: scholarships.gov.in
2. PM Scholarship Scheme: For children of ex-servicemen
3. Helpline: 0120-6619540
4. 40+ scholarships available in Schemes section

Visit Schemes page for application process.`;
}

function getMedicalInfo(lang: string): string {
  if (lang === 'hi') {
    return `चिकित्सा सहायता:

1. आयुष्मान भारत PM-JAY योजना
2. राज्य स्वास्थ्य बीमा योजनाएं
3. आपातकालीन सेवा: 108 (एम्बुलेंस)
4. हेल्पलाइन: 14555

निकटतम सरकारी अस्पताल से संपर्क करें।`;
  }
  
  if (lang === 'mr') {
    return `वैद्यकीय मदत:

1. आयुष्मान भारत PM-JAY योजना
2. राज्य आरोग्य विमा योजना
3. आपत्कालीन सेवा: 108 (रुग्णवाहिका)
4. हेल्पलाइन: 14555

जवळच्या सरकारी रुग्णालयाशी संपर्क साधा।`;
  }
  
  return `Medical Assistance:

1. Ayushman Bharat PM-JAY Scheme
2. State Health Insurance Schemes
3. Emergency Service: 108 (Ambulance)
4. Helpline: 14555

Contact nearest government hospital.`;
}

function getFinancialInfo(lang: string): string {
  if (lang === 'hi') {
    return `वित्तीय सहायता योजनाएं:

1. PM किसान सम्मान निधि
2. मुद्रा लोन योजना
3. महात्मा गांधी NREGA
4. स्टैंड अप इंडिया योजना

पात्रता और आवेदन के लिए योजना अनुभाग देखें।`;
  }
  
  if (lang === 'mr') {
    return `आर्थिक मदत योजना:

1. PM किसान सम्मान निधी
2. मुद्रा लोन योजना
3. महात्मा गांधी NREGA
4. स्टँड अप इंडिया योजना

पात्रता आणि अर्जासाठी योजना विभाग पहा।`;
  }
  
  return `Financial Assistance Schemes:

1. PM Kisan Samman Nidhi
2. Mudra Loan Scheme
3. Mahatma Gandhi NREGA
4. Stand Up India Scheme

Check Schemes section for eligibility and application.`;
}

function getAgricultureInfo(lang: string): string {
  if (lang === 'hi') {
    return `कृषि योजनाएं:

1. PM किसान योजना: 6000 रुपये प्रति वर्ष
2. प्रधानमंत्री फसल बीमा योजना
3. किसान क्रेडिट कार्ड
4. कृषि हेल्पलाइन: 1551

विवरण के लिए योजना अनुभाग देखें।`;
  }
  
  if (lang === 'mr') {
    return `कृषी योजना:

1. PM किसान योजना: 6000 रुपये दरवर्षी
2. प्रधानमंत्री पीक विमा योजना
3. किसान क्रेडिट कार्ड
4. कृषी हेल्पलाइन: 1551

तपशीलासाठी योजना विभाग पहा।`;
  }
  
  return `Agriculture Schemes:

1. PM Kisan Scheme: Rs. 6000 per year
2. Pradhan Mantri Fasal Bima Yojana
3. Kisan Credit Card
4. Agriculture Helpline: 1551

Check Schemes section for details.`;
}

function getDocumentInfo(type: 'birth' | 'ration' | 'income', lang: string): string {
  const docs = {
    birth: {
      en: `Birth Certificate Requirements:

Documents Required:
• Hospital discharge certificate
• Parents' identity proof (Aadhaar)
• Address proof
• Application form

Process:
• Visit Registrar Office
• Submit documents
• Pay fee: Rs. 50
• Processing time: 7-15 days`,
      hi: `जन्म प्रमाण पत्र आवश्यकताएं:

आवश्यक दस्तावेज:
• अस्पताल डिस्चार्ज प्रमाण पत्र
• माता-पिता का पहचान प्रमाण (आधार)
• पता प्रमाण
• आवेदन फॉर्म

प्रक्रिया:
• रजिस्ट्रार कार्यालय जाएं
• दस्तावेज जमा करें
• शुल्क: 50 रुपये
• प्रसंस्करण समय: 7-15 दिन`,
      mr: `जन्म दाखला आवश्यकता:

आवश्यक कागदपत्रे:
• रुग्णालय डिस्चार्ज प्रमाणपत्र
• पालकांचा ओळख पुरावा (आधार)
• पत्ता पुरावा
• अर्ज फॉर्म

प्रक्रिया:
• रजिस्ट्रार कार्यालयात जा
• कागदपत्रे सादर करा
• शुल्क: 50 रुपये
• प्रक्रिया वेळ: 7-15 दिवस`
    },
    ration: {
      en: `Ration Card Requirements:

Documents Required:
• Aadhaar cards of all family members
• Address proof
• Income certificate
• Passport size photographs

Process:
• Visit Food & Civil Supplies Office
• Submit application
• Fee: Free
• Processing time: 15-30 days`,
      hi: `राशन कार्ड आवश्यकताएं:

आवश्यक दस्तावेज:
• सभी परिवार सदस्यों के आधार कार्ड
• पता प्रमाण
• आय प्रमाण पत्र
• पासपोर्ट आकार की तस्वीरें

प्रक्रिया:
• खाद्य और नागरिक आपूर्ति कार्यालय जाएं
• आवेदन जमा करें
• शुल्क: निःशुल्क
• प्रसंस्करण समय: 15-30 दिन`,
      mr: `रेशन कार्ड आवश्यकता:

आवश्यक कागदपत्रे:
• सर्व कुटुंबीयांचे आधार कार्ड
• पत्ता पुरावा
• उत्पन्न दाखला
• पासपोर्ट आकाराचे फोटो

प्रक्रिया:
• अन्न आणि नागरी पुरवठा कार्यालयात जा
• अर्ज सादर करा
• शुल्क: मोफत
• प्रक्रिया वेळ: 15-30 दिवस`
    },
    income: {
      en: `Income Certificate Requirements:

Documents Required:
• Aadhaar card
• Salary slips / Income proof
• Bank statements (6 months)
• Self-declaration affidavit

Process:
• Visit Tehsildar Office
• Submit documents
• Pay fee: Rs. 30
• Processing time: 7-15 days`,
      hi: `आय प्रमाण पत्र आवश्यकताएं:

आवश्यक दस्तावेज:
• आधार कार्ड
• वेतन पर्ची / आय प्रमाण
• बैंक स्टेटमेंट (6 महीने)
• स्व-घोषणा शपथ पत्र

प्रक्रिया:
• तहसीलदार कार्यालय जाएं
• दस्तावेज जमा करें
• शुल्क: 30 रुपये
• प्रसंस्करण समय: 7-15 दिन`,
      mr: `उत्पन्न दाखला आवश्यकता:

आवश्यक कागदपत्रे:
• आधार कार्ड
• पगार पर्ची / उत्पन्न पुरावा
• बँक स्टेटमेंट (6 महिने)
• स्व-घोषणा प्रतिज्ञापत्र

प्रक्रिया:
• तहसीलदार कार्यालयात जा
• कागदपत्रे सादर करा
• शुल्क: 30 रुपये
• प्रक्रिया वेळ: 7-15 दिवस`
    }
  };
  
  const langKey = lang === 'hi' ? 'hi' : lang === 'mr' ? 'mr' : 'en';
  return docs[type][langKey];
}

function getHelplineInfo(lang: string): string {
  if (lang === 'hi') {
    return `महत्वपूर्ण हेल्पलाइन नंबर:

राष्ट्रीय:
1. नागरिक हेल्पलाइन: 1077 (24x7)
2. NSP हेल्पलाइन: 0120-6619540
3. PM किसान: 155261
4. आयुष्मान भारत: 14555

आपातकालीन:
1. पुलिस: 100
2. एम्बुलेंस: 108
3. अग्निशमन: 101
4. महिला हेल्पलाइन: 181`;
  }
  
  if (lang === 'mr') {
    return `महत्वाचे हेल्पलाइन नंबर:

राष्ट्रीय:
1. नागरिक हेल्पलाइन: 1077 (24x7)
2. NSP हेल्पलाइन: 0120-6619540
3. PM किसान: 155261
4. आयुष्मान भारत: 14555

आपत्कालीन:
1. पोलीस: 100
2. रुग्णवाहिका: 108
3. अग्निशामक: 101
4. महिला हेल्पलाइन: 181`;
  }
  
  return `Important Helpline Numbers:

National:
1. Citizen Helpline: 1077 (24x7)
2. NSP Helpline: 0120-6619540
3. PM Kisan: 155261
4. Ayushman Bharat: 14555

Emergency:
1. Police: 100
2. Ambulance: 108
3. Fire: 101
4. Women Helpline: 181`;
}

function getPlatformInfo(lang: string): string {
  if (lang === 'hi') {
    return `प्लेटफॉर्म सुविधाएं:

1. 40+ सरकारी योजनाएं
2. 12 भारतीय भाषाओं में समर्थन
3. आवेदन ट्रैकिंग
4. दस्तावेज़ मार्गदर्शन
5. AI सहायक
6. 24x7 हेल्पलाइन जानकारी

योजना, सेवाएं, और ट्रैकिंग अनुभाग देखें।`;
  }
  
  if (lang === 'mr') {
    return `प्लॅटफॉर्म सुविधा:

1. 40+ सरकारी योजना
2. 12 भारतीय भाषांमध्ये समर्थन
3. अर्ज ट्रॅकिंग
4. कागदपत्र मार्गदर्शन
5. AI सहाय्यक
6. 24x7 हेल्पलाइन माहिती

योजना, सेवा, आणि ट्रॅकिंग विभाग पहा।`;
  }
  
  return `Platform Features:

1. 40+ Government Schemes
2. Support in 12 Indian languages
3. Application Tracking
4. Document Guidance
5. AI Assistant
6. 24x7 Helpline Information

Visit Schemes, Services, and Tracking sections.`;
}

function getDefaultResponse(lang: string): string {
  if (lang === 'hi') {
    return `सहायता के लिए पूछें:

1. छात्रवृत्ति जानकारी
2. चिकित्सा सहायता
3. वित्तीय योजनाएं
4. कृषि योजनाएं
5. दस्तावेज़ आवश्यकताएं
6. हेल्पलाइन नंबर

विशिष्ट प्रश्न पूछें।`;
  }
  
  if (lang === 'mr') {
    return `मदतीसाठी विचारा:

1. शिष्यवृत्ती माहिती
2. वैद्यकीय मदत
3. आर्थिक योजना
4. कृषी योजना
5. कागदपत्र आवश्यकता
6. हेल्पलाइन नंबर

विशिष्ट प्रश्न विचारा।`;
  }
  
  return `Ask for assistance:

1. Scholarship information
2. Medical assistance
3. Financial schemes
4. Agriculture schemes
5. Document requirements
6. Helpline numbers

Ask specific questions.`;
}
