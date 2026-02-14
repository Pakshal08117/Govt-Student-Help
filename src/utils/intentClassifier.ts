/**
 * Intent Classification System for Government Assistant
 * 
 * Classifies user queries into predefined intents for better routing
 */

export type UserIntent = 
  | 'LOCATION'
  | 'SCHEME'
  | 'SCHOLARSHIP'
  | 'PLATFORM_HELP'
  | 'ADMIN'
  | 'EXPLANATION'
  | 'OUT_OF_SCOPE';

interface IntentKeywords {
  [key: string]: string[];
}

/**
 * Keywords for each intent category
 */
const INTENT_KEYWORDS: IntentKeywords = {
  LOCATION: [
    // English
    'state', 'states', 'district', 'districts', 'taluka', 'talukas', 'tehsil', 'tehsils',
    'mandal', 'mandals', 'village', 'villages', 'city', 'cities', 'town', 'towns',
    'panchayat', 'panchayats', 'block', 'blocks', 'subdivision', 'subdivisions',
    'maharashtra', 'gujarat', 'karnataka', 'delhi', 'mumbai', 'pune', 'bangalore',
    'uttar pradesh', 'madhya pradesh', 'rajasthan', 'bihar', 'west bengal',
    'andhra pradesh', 'telangana', 'tamil nadu', 'kerala', 'punjab', 'haryana',
    'how many districts', 'how many states', 'administrative structure',
    // Hindi
    'राज्य', 'जिला', 'तालुका', 'तहसील', 'मंडल', 'गांव', 'शहर', 'पंचायत', 'ब्लॉक',
    'कितने जिले', 'कितने राज्य', 'प्रशासनिक संरचना',
    // Marathi
    'राज्य', 'जिल्हा', 'तालुका', 'तहसील', 'गाव', 'शहर', 'पंचायत', 'ब्लॉक',
    'किती जिल्हे', 'किती राज्ये', 'प्रशासकीय रचना'
  ],
  
  SCHEME: [
    // English
    'scheme', 'schemes', 'yojana', 'yojanas', 'program', 'programs', 'programme',
    'pm kisan', 'ayushman bharat', 'mudra loan', 'nrega', 'stand up india',
    'financial help', 'financial aid', 'financial assistance', 'loan', 'loans',
    'subsidy', 'subsidies', 'benefit', 'benefits', 'welfare', 'government scheme',
    'farmer scheme', 'agriculture scheme', 'medical scheme', 'health scheme',
    // Hindi
    'योजना', 'योजनाएं', 'कार्यक्रम', 'सहायता', 'लाभ', 'सब्सिडी', 'ऋण',
    'किसान योजना', 'कृषि योजना', 'स्वास्थ्य योजना', 'वित्तीय सहायता',
    // Marathi
    'योजना', 'कार्यक्रम', 'मदत', 'लाभ', 'सबसिडी', 'कर्ज',
    'शेतकरी योजना', 'कृषी योजना', 'आरोग्य योजना', 'आर्थिक मदत'
  ],
  
  SCHOLARSHIP: [
    // English
    'scholarship', 'scholarships', 'student aid', 'student help', 'education aid',
    'nsp', 'national scholarship portal', 'pm scholarship', 'merit scholarship',
    'school fees', 'college fees', 'education loan', 'student loan',
    'scholarship apply', 'scholarship eligibility', 'scholarship form',
    // Hindi
    'छात्रवृत्ति', 'छात्रवृत्तियां', 'छात्र सहायता', 'शिक्षा सहायता',
    'स्कूल फीस', 'कॉलेज फीस', 'शिक्षा ऋण', 'छात्र ऋण',
    // Marathi
    'शिष्यवृत्ती', 'विद्यार्थी मदत', 'शिक्षण मदत',
    'शाळा फी', 'कॉलेज फी', 'शिक्षण कर्ज', 'विद्यार्थी कर्ज'
  ],
  
  PLATFORM_HELP: [
    // English
    'how to use', 'how to apply', 'how to register', 'how to login',
    'website help', 'platform help', 'features', 'what can you do',
    'how does this work', 'help me', 'guide', 'tutorial', 'instructions',
    'navigate', 'navigation', 'menu', 'page', 'section',
    'track application', 'check status', 'application status',
    // Hindi
    'कैसे उपयोग करें', 'कैसे आवेदन करें', 'कैसे पंजीकरण करें', 'कैसे लॉगिन करें',
    'वेबसाइट मदद', 'प्लेटफॉर्म मदद', 'सुविधाएं', 'आप क्या कर सकते हैं',
    'यह कैसे काम करता है', 'मेरी मदद करें', 'गाइड', 'निर्देश',
    'आवेदन ट्रैक करें', 'स्थिति जांचें', 'आवेदन स्थिति',
    // Marathi
    'कसे वापरावे', 'कसा अर्ज करावा', 'कसे नोंदणी करावी', 'कसे लॉगिन करावे',
    'वेबसाइट मदत', 'प्लॅटफॉर्म मदत', 'वैशिष्ट्ये', 'तुम्ही काय करू शकता',
    'हे कसे काम करते', 'माझी मदत करा', 'मार्गदर्शक', 'सूचना',
    'अर्ज ट्रॅक करा', 'स्थिती तपासा', 'अर्ज स्थिती'
  ],
  
  ADMIN: [
    // English
    'admin', 'admin panel', 'admin login', 'administrator', 'dashboard',
    'admin access', 'admin page', 'backend', 'management panel',
    'open admin', 'go to admin', 'admin section',
    // Hindi
    'एडमिन', 'प्रशासक', 'प्रशासक पैनल', 'प्रशासक लॉगिन', 'डैशबोर्ड',
    'एडमिन खोलें', 'प्रशासक अनुभाग',
    // Marathi
    'प्रशासक', 'प्रशासक पॅनेल', 'प्रशासक लॉगिन', 'डॅशबोर्ड',
    'प्रशासक उघडा', 'प्रशासक विभाग'
  ],
  
  EXPLANATION: [
    // English - User explaining their situation
    'i need', 'i want', 'i am', 'i have', 'my daughter', 'my son', 'my family',
    'i am a farmer', 'i am a student', 'i am unemployed', 'i am disabled',
    'need help', 'need money', 'need treatment', 'need education',
    'looking for', 'searching for', 'require', 'want to apply',
    'my situation', 'my problem', 'my issue', 'help me with',
    // Hindi
    'मुझे चाहिए', 'मैं चाहता हूं', 'मैं हूं', 'मेरे पास है', 'मेरी बेटी', 'मेरा बेटा',
    'मैं किसान हूं', 'मैं छात्र हूं', 'मैं बेरोजगार हूं',
    'मदद चाहिए', 'पैसे चाहिए', 'इलाज चाहिए', 'शिक्षा चाहिए',
    'मेरी स्थिति', 'मेरी समस्या', 'मेरी मदद करें',
    // Marathi
    'मला हवे', 'मला पाहिजे', 'मी आहे', 'माझ्याकडे आहे', 'माझी मुलगी', 'माझा मुलगा',
    'मी शेतकरी आहे', 'मी विद्यार्थी आहे', 'मी बेरोजगार आहे',
    'मदत हवी', 'पैसे हवेत', 'उपचार हवा', 'शिक्षण हवे',
    'माझी परिस्थिती', 'माझी समस्या', 'माझी मदत करा'
  ]
};

/**
 * Classify user query into intent
 */
export function classifyIntent(query: string): UserIntent {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check each intent category
  const intentScores: { [key: string]: number } = {
    LOCATION: 0,
    SCHEME: 0,
    SCHOLARSHIP: 0,
    PLATFORM_HELP: 0,
    ADMIN: 0,
    EXPLANATION: 0
  };
  
  // Calculate scores for each intent
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        intentScores[intent]++;
      }
    }
  }
  
  // Find intent with highest score
  let maxScore = 0;
  let detectedIntent: UserIntent = 'OUT_OF_SCOPE';
  
  for (const [intent, score] of Object.entries(intentScores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent as UserIntent;
    }
  }
  
  // If no keywords matched, return OUT_OF_SCOPE
  if (maxScore === 0) {
    return 'OUT_OF_SCOPE';
  }
  
  return detectedIntent;
}

/**
 * Get intent description for logging/debugging
 */
export function getIntentDescription(intent: UserIntent): string {
  const descriptions: { [key in UserIntent]: string } = {
    LOCATION: 'Query about states, districts, talukas, or villages',
    SCHEME: 'Query about government schemes or yojanas',
    SCHOLARSHIP: 'Query about student aid or scholarships',
    PLATFORM_HELP: 'Query about how to use the website',
    ADMIN: 'Query about admin panel or login',
    EXPLANATION: 'User explaining their situation or problem',
    OUT_OF_SCOPE: 'Query outside defined scope'
  };
  
  return descriptions[intent];
}

/**
 * Check if intent requires special handling
 */
export function requiresSpecialHandling(intent: UserIntent): boolean {
  return intent === 'EXPLANATION' || intent === 'OUT_OF_SCOPE';
}
