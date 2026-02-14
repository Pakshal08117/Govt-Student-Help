/**
 * Explainable AI Assistant for Indian Government Schemes
 * 
 * This is a rule-based, deterministic system that:
 * 1. Classifies user intent from natural language
 * 2. Evaluates eligibility based on clear rules
 * 3. Provides explanations for all decisions
 * 4. Handles missing information gracefully
 * 
 * NO ML LIBRARIES - Pure TypeScript logic
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type Intent = 
  | 'schemes'        // General schemes inquiry
  | 'scholarship'    // Education/scholarship specific
  | 'health'         // Health insurance/medical
  | 'housing'        // Housing/shelter schemes
  | 'agriculture'    // Farming/agriculture schemes
  | 'employment'     // Job/skill development
  | 'help'           // General help/guidance
  | 'unknown';       // Cannot determine intent

export type Gender = 'male' | 'female' | 'other';
export type Category = 'general' | 'obc' | 'sc' | 'st' | 'ews';
export type UserType = 'student' | 'farmer' | 'citizen' | 'woman' | 'senior_citizen' | 'disabled';

export interface UserProfile {
  age?: number;
  gender?: Gender;
  category?: Category;
  annualIncome?: number;  // in rupees
  state?: string;
  userType?: UserType;
  isStudent?: boolean;
  isFarmer?: boolean;
  hasDisability?: boolean;
  hasBankAccount?: boolean;
  hasAadhar?: boolean;
}

export interface EligibilityRule {
  field: keyof UserProfile;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'exists';
  value: any;
  reason: string;  // Human-readable explanation
}

export interface SchemeDefinition {
  id: string;
  name: string;
  nameHi: string;
  category: Intent;
  description: string;
  eligibilityRules: EligibilityRule[];
  requiredDocuments: string[];
  officialLink: string;
  benefits: string;
}

export interface EligibilityResult {
  scheme: SchemeDefinition;
  isEligible: boolean;
  reasons: string[];  // Why eligible or not eligible
  missingInfo: string[];  // What info is needed
  confidence: number;  // 0-100, based on available info
}

export interface AIResponse {
  intent: Intent;
  eligibleSchemes: EligibilityResult[];
  notEligibleSchemes: EligibilityResult[];
  missingInformation: string[];
  followUpQuestions: string[];
  documentsRequired: string[];
  officialLinks: string[];
  explanation: string;  // Overall explanation in simple terms
}

// ============================================================================
// INTENT CLASSIFICATION SYSTEM
// ============================================================================

/**
 * Intent Classification using keyword matching
 * Simple, explainable, deterministic approach
 */
const intentKeywords: Record<Intent, string[]> = {
  scholarship: [
    'scholarship', 'छात्रवृत्ति', 'शिष्यवृत्ती',
    'education', 'शिक्षा', 'study', 'student', 'college', 'school',
    'nsp', 'inspire', 'merit', 'fee', 'tuition'
  ],
  health: [
    'health', 'स्वास्थ्य', 'आरोग्य',
    'medical', 'hospital', 'insurance', 'ayushman', 'treatment',
    'medicine', 'doctor', 'clinic', 'disease', 'illness'
  ],
  housing: [
    'housing', 'आवास', 'घर', 'house', 'home', 'shelter',
    'pmay', 'awas', 'rent', 'construction', 'flat', 'apartment'
  ],
  agriculture: [
    'agriculture', 'कृषि', 'शेती', 'farming', 'farmer', 'किसान',
    'crop', 'land', 'kisan', 'pm-kisan', 'irrigation', 'seed'
  ],
  employment: [
    'employment', 'रोजगार', 'job', 'work', 'skill', 'training',
    'mudra', 'loan', 'business', 'startup', 'pmkvy', 'rozgar'
  ],
  help: [
    'help', 'मदद', 'सहायता', 'guide', 'how', 'what', 'where',
    'information', 'माहिती', 'जानकारी', 'support'
  ],
  schemes: [
    'scheme', 'योजना', 'yojana', 'government', 'सरकार', 'सरकारी',
    'benefit', 'लाभ', 'apply', 'अर्ज', 'आवेदन'
  ],
  unknown: []
};

export function classifyIntent(userQuery: string): Intent {
  const query = userQuery.toLowerCase().trim();
  
  // Count keyword matches for each intent
  const scores: Record<Intent, number> = {
    scholarship: 0,
    health: 0,
    housing: 0,
    agriculture: 0,
    employment: 0,
    help: 0,
    schemes: 0,
    unknown: 0
  };
  
  // Score each intent based on keyword matches
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    for (const keyword of keywords) {
      if (query.includes(keyword)) {
        scores[intent as Intent] += 1;
      }
    }
  }
  
  // Find intent with highest score
  let maxScore = 0;
  let detectedIntent: Intent = 'unknown';
  
  for (const [intent, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent as Intent;
    }
  }
  
  // If no clear intent, default to 'schemes' for general inquiry
  if (maxScore === 0) {
    return 'schemes';
  }
  
  return detectedIntent;
}

// ============================================================================
// SCHEME DEFINITIONS WITH ELIGIBILITY RULES
// ============================================================================

export const schemeDatabase: SchemeDefinition[] = [
  {
    id: 'nsp-scholarship',
    name: 'National Scholarship Portal',
    nameHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
    category: 'scholarship',
    description: 'Scholarships for students from SC/ST/OBC/Minority communities',
    eligibilityRules: [
      { field: 'isStudent', operator: 'eq', value: true, reason: 'Must be a student' },
      { field: 'age', operator: 'gte', value: 6, reason: 'Must be at least 6 years old' },
      { field: 'age', operator: 'lte', value: 30, reason: 'Must be under 30 years old' },
      { field: 'category', operator: 'in', value: ['sc', 'st', 'obc'], reason: 'Must be from SC/ST/OBC category' },
      { field: 'annualIncome', operator: 'lte', value: 800000, reason: 'Family income must be below ₹8 lakhs/year' }
    ],
    requiredDocuments: ['Aadhar Card', 'Income Certificate', 'Caste Certificate', 'Bank Account', 'Educational Documents'],
    officialLink: 'https://scholarships.gov.in',
    benefits: 'Financial assistance for education from ₹10,000 to ₹50,000 per year'
  },
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameHi: 'प्रधानमंत्री किसान सम्मान निधि',
    category: 'agriculture',
    description: 'Direct income support of ₹6,000/year to farmer families',
    eligibilityRules: [
      { field: 'isFarmer', operator: 'eq', value: true, reason: 'Must be a farmer' },
      { field: 'hasAadhar', operator: 'eq', value: true, reason: 'Must have Aadhar card' },
      { field: 'hasBankAccount', operator: 'eq', value: true, reason: 'Must have bank account' }
    ],
    requiredDocuments: ['Aadhar Card', 'Bank Account Details', 'Land Ownership Documents'],
    officialLink: 'https://pmkisan.gov.in',
    benefits: '₹6,000 per year in 3 installments of ₹2,000 each'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - PM-JAY',
    nameHi: 'आयुष्मान भारत',
    category: 'health',
    description: 'Health insurance coverage of ₹5 lakhs per family per year',
    eligibilityRules: [
      { field: 'annualIncome', operator: 'lte', value: 500000, reason: 'Family income must be below ₹5 lakhs/year' },
      { field: 'hasAadhar', operator: 'eq', value: true, reason: 'Must have Aadhar card' }
    ],
    requiredDocuments: ['Aadhar Card', 'Ration Card', 'Income Certificate'],
    officialLink: 'https://pmjay.gov.in',
    benefits: 'Free health insurance up to ₹5 lakhs per family per year'
  },
  {
    id: 'pmay',
    name: 'Pradhan Mantri Awas Yojana',
    nameHi: 'प्रधानमंत्री आवास योजना',
    category: 'housing',
    description: 'Affordable housing for all - subsidy on home loans',
    eligibilityRules: [
      { field: 'annualIncome', operator: 'lte', value: 1800000, reason: 'Family income must be below ₹18 lakhs/year' },
      { field: 'age', operator: 'gte', value: 18, reason: 'Must be at least 18 years old' },
      { field: 'hasAadhar', operator: 'eq', value: true, reason: 'Must have Aadhar card' }
    ],
    requiredDocuments: ['Aadhar Card', 'Income Certificate', 'Property Documents', 'Bank Account'],
    officialLink: 'https://pmaymis.gov.in',
    benefits: 'Interest subsidy on home loans up to ₹2.67 lakhs'
  },
  {
    id: 'mudra-loan',
    name: 'Pradhan Mantri MUDRA Yojana',
    nameHi: 'प्रधानमंत्री मुद्रा योजना',
    category: 'employment',
    description: 'Loans up to ₹10 lakhs for small businesses',
    eligibilityRules: [
      { field: 'age', operator: 'gte', value: 18, reason: 'Must be at least 18 years old' },
      { field: 'hasAadhar', operator: 'eq', value: true, reason: 'Must have Aadhar card' },
      { field: 'hasBankAccount', operator: 'eq', value: true, reason: 'Must have bank account' }
    ],
    requiredDocuments: ['Aadhar Card', 'PAN Card', 'Business Plan', 'Bank Account', 'Address Proof'],
    officialLink: 'https://www.mudra.org.in',
    benefits: 'Collateral-free loans: Shishu (up to ₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L)'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    nameHi: 'सुकन्या समृद्धि योजना',
    category: 'schemes',
    description: 'Savings scheme for girl child with high interest rate',
    eligibilityRules: [
      { field: 'gender', operator: 'eq', value: 'female', reason: 'Only for girl child' },
      { field: 'age', operator: 'lte', value: 10, reason: 'Girl child must be under 10 years old' },
      { field: 'hasAadhar', operator: 'eq', value: true, reason: 'Must have Aadhar card' }
    ],
    requiredDocuments: ['Birth Certificate', 'Aadhar Card', 'Parent ID Proof', 'Address Proof'],
    officialLink: 'https://www.india.gov.in/sukanya-samriddhi-yojana',
    benefits: 'High interest rate (7.6%), tax benefits, maturity at 21 years'
  },
  {
    id: 'beti-bachao',
    name: 'Beti Bachao Beti Padhao',
    nameHi: 'बेटी बचाओ बेटी पढ़ाओ',
    category: 'schemes',
    description: 'Campaign to save and educate girl child',
    eligibilityRules: [
      { field: 'gender', operator: 'eq', value: 'female', reason: 'Only for girl child' },
      { field: 'age', operator: 'lte', value: 18, reason: 'Must be under 18 years old' }
    ],
    requiredDocuments: ['Birth Certificate', 'Aadhar Card', 'School Certificate'],
    officialLink: 'https://wcd.nic.in/bbbp-schemes',
    benefits: 'Educational support, awareness programs, financial assistance'
  },
  {
    id: 'pmjdy',
    name: 'Pradhan Mantri Jan Dhan Yojana',
    nameHi: 'प्रधानमंत्री जन धन योजना',
    category: 'schemes',
    description: 'Zero balance bank account with insurance benefits',
    eligibilityRules: [
      { field: 'age', operator: 'gte', value: 10, reason: 'Must be at least 10 years old' },
      { field: 'hasAadhar', operator: 'eq', value: true, reason: 'Must have Aadhar card' }
    ],
    requiredDocuments: ['Aadhar Card', 'Address Proof', 'Photograph'],
    officialLink: 'https://pmjdy.gov.in',
    benefits: 'Zero balance account, RuPay debit card, ₹2 lakh accident insurance'
  }
];

// ============================================================================
// ELIGIBILITY EVALUATION ENGINE
// ============================================================================

/**
 * Evaluates a single eligibility rule
 * Returns: { passes: boolean, reason: string }
 */
function evaluateRule(
  rule: EligibilityRule,
  profile: UserProfile
): { passes: boolean; reason: string; missing: boolean } {
  const value = profile[rule.field];
  
  // Check if required information is missing
  if (value === undefined || value === null) {
    return {
      passes: false,
      reason: `Missing information: ${rule.reason}`,
      missing: true
    };
  }
  
  let passes = false;
  
  switch (rule.operator) {
    case 'eq':
      passes = value === rule.value;
      break;
    case 'neq':
      passes = value !== rule.value;
      break;
    case 'gt':
      passes = (value as number) > (rule.value as number);
      break;
    case 'lt':
      passes = (value as number) < (rule.value as number);
      break;
    case 'gte':
      passes = (value as number) >= (rule.value as number);
      break;
    case 'lte':
      passes = (value as number) <= (rule.value as number);
      break;
    case 'in':
      passes = (rule.value as any[]).includes(value);
      break;
    case 'exists':
      passes = value !== undefined && value !== null;
      break;
  }
  
  return {
    passes,
    reason: rule.reason,
    missing: false
  };
}

/**
 * Evaluates eligibility for a single scheme
 */
function evaluateSchemeEligibility(
  scheme: SchemeDefinition,
  profile: UserProfile
): EligibilityResult {
  const reasons: string[] = [];
  const missingInfo: string[] = [];
  let passedRules = 0;
  let totalRules = scheme.eligibilityRules.length;
  
  // Evaluate each rule
  for (const rule of scheme.eligibilityRules) {
    const result = evaluateRule(rule, profile);
    
    if (result.missing) {
      missingInfo.push(result.reason);
    } else if (result.passes) {
      passedRules++;
      reasons.push(`✓ ${result.reason}`);
    } else {
      reasons.push(`✗ ${result.reason}`);
    }
  }
  
  // Calculate confidence based on available information
  const availableRules = totalRules - missingInfo.length;
  const confidence = availableRules > 0 
    ? Math.round((passedRules / availableRules) * 100)
    : 0;
  
  // Scheme is eligible if all available rules pass and no missing info
  const isEligible = passedRules === totalRules && missingInfo.length === 0;
  
  return {
    scheme,
    isEligible,
    reasons,
    missingInfo,
    confidence
  };
}

/**
 * Generates follow-up questions based on missing information
 */
function generateFollowUpQuestions(missingFields: Set<string>): string[] {
  const questions: string[] = [];
  
  const questionMap: Record<string, string> = {
    age: 'What is your age?',
    gender: 'What is your gender? (Male/Female/Other)',
    category: 'What is your caste category? (General/OBC/SC/ST/EWS)',
    annualIncome: 'What is your annual family income?',
    state: 'Which state do you live in?',
    isStudent: 'Are you currently a student?',
    isFarmer: 'Are you a farmer?',
    hasDisability: 'Do you have any disability?',
    hasBankAccount: 'Do you have a bank account?',
    hasAadhar: 'Do you have an Aadhar card?'
  };
  
  for (const field of missingFields) {
    if (questionMap[field]) {
      questions.push(questionMap[field]);
    }
  }
  
  return questions;
}

// ============================================================================
// MAIN AI ASSISTANT FUNCTION
// ============================================================================

/**
 * Main function: Explainable AI Assistant
 * 
 * How it works:
 * 1. Classify user intent from their query
 * 2. Filter schemes matching the intent
 * 3. Evaluate eligibility for each scheme
 * 4. Separate eligible and not eligible schemes
 * 5. Identify missing information
 * 6. Generate follow-up questions
 * 7. Return comprehensive, explainable results
 */
export function explainableAIAssistant(
  userQuery: string,
  userProfile: UserProfile
): AIResponse {
  // Step 1: Classify intent
  const intent = classifyIntent(userQuery);
  
  // Step 2: Filter schemes by intent
  let relevantSchemes = schemeDatabase;
  if (intent !== 'schemes' && intent !== 'help' && intent !== 'unknown') {
    relevantSchemes = schemeDatabase.filter(s => s.category === intent);
  }
  
  // Step 3: Evaluate eligibility for each scheme
  const evaluations = relevantSchemes.map(scheme => 
    evaluateSchemeEligibility(scheme, userProfile)
  );
  
  // Step 4: Separate eligible and not eligible
  const eligibleSchemes = evaluations.filter(e => e.isEligible);
  const notEligibleSchemes = evaluations.filter(e => !e.isEligible);
  
  // Step 5: Collect all missing information
  const allMissingInfo = new Set<string>();
  evaluations.forEach(e => {
    e.missingInfo.forEach(info => allMissingInfo.add(info));
  });
  
  // Step 6: Extract unique missing fields for follow-up questions
  const missingFields = new Set<keyof UserProfile>();
  evaluations.forEach(e => {
    e.scheme.eligibilityRules.forEach(rule => {
      if (userProfile[rule.field] === undefined || userProfile[rule.field] === null) {
        missingFields.add(rule.field);
      }
    });
  });
  
  const followUpQuestions = generateFollowUpQuestions(missingFields);
  
  // Step 7: Collect all required documents
  const allDocuments = new Set<string>();
  eligibleSchemes.forEach(e => {
    e.scheme.requiredDocuments.forEach(doc => allDocuments.add(doc));
  });
  
  // Step 8: Collect official links
  const officialLinks = eligibleSchemes.map(e => e.scheme.officialLink);
  
  // Step 9: Generate explanation
  const explanation = generateExplanation(intent, eligibleSchemes, notEligibleSchemes, allMissingInfo);
  
  return {
    intent,
    eligibleSchemes,
    notEligibleSchemes,
    missingInformation: Array.from(allMissingInfo),
    followUpQuestions,
    documentsRequired: Array.from(allDocuments),
    officialLinks,
    explanation
  };
}

/**
 * Generates human-readable explanation
 */
function generateExplanation(
  intent: Intent,
  eligible: EligibilityResult[],
  notEligible: EligibilityResult[],
  missingInfo: Set<string>
): string {
  let explanation = '';
  
  // Explain intent detection
  explanation += `I understood you're looking for ${intent === 'schemes' ? 'government schemes' : intent + ' schemes'}.\n\n`;
  
  // Explain eligible schemes
  if (eligible.length > 0) {
    explanation += `✅ Good news! You are eligible for ${eligible.length} scheme(s):\n`;
    eligible.forEach(e => {
      explanation += `\n• ${e.scheme.name}: ${e.scheme.benefits}\n`;
      explanation += `  Reasons: ${e.reasons.filter(r => r.startsWith('✓')).join(', ')}\n`;
    });
    explanation += '\n';
  }
  
  // Explain not eligible schemes
  if (notEligible.length > 0) {
    explanation += `❌ You are not eligible for ${notEligible.length} scheme(s):\n`;
    notEligible.forEach(e => {
      explanation += `\n• ${e.scheme.name}\n`;
      const failedReasons = e.reasons.filter(r => r.startsWith('✗'));
      if (failedReasons.length > 0) {
        explanation += `  Reasons: ${failedReasons.join(', ')}\n`;
      }
      if (e.missingInfo.length > 0) {
        explanation += `  Missing info: ${e.missingInfo.join(', ')}\n`;
      }
    });
    explanation += '\n';
  }
  
  // Explain missing information
  if (missingInfo.size > 0) {
    explanation += `ℹ️ To check more schemes, please provide: ${Array.from(missingInfo).join(', ')}\n`;
  }
  
  return explanation;
}

// ============================================================================
// HELPER FUNCTIONS FOR INTEGRATION
// ============================================================================

/**
 * Quick check: Is user eligible for a specific scheme?
 */
export function checkSchemeEligibility(
  schemeId: string,
  userProfile: UserProfile
): EligibilityResult | null {
  const scheme = schemeDatabase.find(s => s.id === schemeId);
  if (!scheme) return null;
  
  return evaluateSchemeEligibility(scheme, userProfile);
}

/**
 * Get all schemes by category
 */
export function getSchemesByCategory(category: Intent): SchemeDefinition[] {
  return schemeDatabase.filter(s => s.category === category);
}

/**
 * Get scheme details by ID
 */
export function getSchemeById(schemeId: string): SchemeDefinition | undefined {
  return schemeDatabase.find(s => s.id === schemeId);
}
