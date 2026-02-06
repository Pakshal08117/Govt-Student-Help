/**
 * Demo and Test Cases for Explainable AI Assistant
 * 
 * This file demonstrates how the system works with real examples
 */

import {
  explainableAIAssistant,
  checkSchemeEligibility,
  classifyIntent,
  type UserProfile
} from './explainableAI';

// ============================================================================
// TEST CASE 1: Student looking for scholarship
// ============================================================================

console.log('='.repeat(80));
console.log('TEST CASE 1: Student from SC category looking for scholarship');
console.log('='.repeat(80));

const studentProfile: UserProfile = {
  age: 20,
  gender: 'male',
  category: 'sc',
  annualIncome: 600000,
  state: 'Maharashtra',
  isStudent: true,
  hasAadhar: true,
  hasBankAccount: true
};

const result1 = explainableAIAssistant(
  "I need scholarship for my college education",
  studentProfile
);

console.log('\n📝 User Query:', "I need scholarship for my college education");
console.log('👤 User Profile:', JSON.stringify(studentProfile, null, 2));
console.log('\n🎯 Detected Intent:', result1.intent);
console.log('\n✅ Eligible Schemes:', result1.eligibleSchemes.length);
result1.eligibleSchemes.forEach(e => {
  console.log(`\n  • ${e.scheme.name}`);
  console.log(`    Confidence: ${e.confidence}%`);
  console.log(`    Reasons:`);
  e.reasons.forEach(r => console.log(`      ${r}`));
});

console.log('\n❌ Not Eligible Schemes:', result1.notEligibleSchemes.length);
result1.notEligibleSchemes.forEach(e => {
  console.log(`\n  • ${e.scheme.name}`);
  console.log(`    Reasons:`);
  e.reasons.forEach(r => console.log(`      ${r}`));
});

console.log('\n📄 Documents Required:', result1.documentsRequired.join(', '));
console.log('\n🔗 Official Links:', result1.officialLinks.join(', '));
console.log('\n💬 Explanation:\n', result1.explanation);

// ============================================================================
// TEST CASE 2: Farmer looking for schemes
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('TEST CASE 2: Farmer looking for agricultural schemes');
console.log('='.repeat(80));

const farmerProfile: UserProfile = {
  age: 45,
  gender: 'male',
  category: 'general',
  state: 'Punjab',
  isFarmer: true,
  hasAadhar: true,
  hasBankAccount: true
};

const result2 = explainableAIAssistant(
  "मुझे किसान योजना चाहिए",  // Hindi: I need farmer scheme
  farmerProfile
);

console.log('\n📝 User Query:', "मुझे किसान योजना चाहिए");
console.log('👤 User Profile:', JSON.stringify(farmerProfile, null, 2));
console.log('\n🎯 Detected Intent:', result2.intent);
console.log('\n✅ Eligible Schemes:', result2.eligibleSchemes.length);
result2.eligibleSchemes.forEach(e => {
  console.log(`\n  • ${e.scheme.name} (${e.scheme.nameHi})`);
  console.log(`    Benefits: ${e.scheme.benefits}`);
});

console.log('\n💬 Explanation:\n', result2.explanation);

// ============================================================================
// TEST CASE 3: Incomplete profile - Missing information
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('TEST CASE 3: User with incomplete profile');
console.log('='.repeat(80));

const incompleteProfile: UserProfile = {
  age: 25,
  gender: 'female',
  // Missing: category, income, student status, etc.
};

const result3 = explainableAIAssistant(
  "What schemes am I eligible for?",
  incompleteProfile
);

console.log('\n📝 User Query:', "What schemes am I eligible for?");
console.log('👤 User Profile:', JSON.stringify(incompleteProfile, null, 2));
console.log('\n🎯 Detected Intent:', result3.intent);
console.log('\n❓ Missing Information:', result3.missingInformation.join(', '));
console.log('\n🤔 Follow-up Questions:');
result3.followUpQuestions.forEach((q, i) => {
  console.log(`  ${i + 1}. ${q}`);
});

console.log('\n💬 Explanation:\n', result3.explanation);

// ============================================================================
// TEST CASE 4: Girl child - Gender-specific schemes
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('TEST CASE 4: Girl child looking for schemes');
console.log('='.repeat(80));

const girlChildProfile: UserProfile = {
  age: 8,
  gender: 'female',
  category: 'general',
  annualIncome: 400000,
  hasAadhar: true,
  hasBankAccount: true
};

const result4 = explainableAIAssistant(
  "schemes for my daughter",
  girlChildProfile
);

console.log('\n📝 User Query:', "schemes for my daughter");
console.log('👤 User Profile:', JSON.stringify(girlChildProfile, null, 2));
console.log('\n🎯 Detected Intent:', result4.intent);
console.log('\n✅ Eligible Schemes:', result4.eligibleSchemes.length);
result4.eligibleSchemes.forEach(e => {
  console.log(`\n  • ${e.scheme.name}`);
  console.log(`    Benefits: ${e.scheme.benefits}`);
  console.log(`    Confidence: ${e.confidence}%`);
});

console.log('\n💬 Explanation:\n', result4.explanation);

// ============================================================================
// TEST CASE 5: Health insurance inquiry
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('TEST CASE 5: Low-income family looking for health insurance');
console.log('='.repeat(80));

const healthProfile: UserProfile = {
  age: 35,
  gender: 'male',
  category: 'obc',
  annualIncome: 300000,
  state: 'Bihar',
  hasAadhar: true,
  hasBankAccount: true
};

const result5 = explainableAIAssistant(
  "I need health insurance for my family",
  healthProfile
);

console.log('\n📝 User Query:', "I need health insurance for my family");
console.log('👤 User Profile:', JSON.stringify(healthProfile, null, 2));
console.log('\n🎯 Detected Intent:', result5.intent);
console.log('\n✅ Eligible Schemes:', result5.eligibleSchemes.length);
result5.eligibleSchemes.forEach(e => {
  console.log(`\n  • ${e.scheme.name}`);
  console.log(`    Benefits: ${e.scheme.benefits}`);
  console.log(`    Documents: ${e.scheme.requiredDocuments.join(', ')}`);
  console.log(`    Apply at: ${e.scheme.officialLink}`);
});

console.log('\n💬 Explanation:\n', result5.explanation);

// ============================================================================
// TEST CASE 6: Intent classification test
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('TEST CASE 6: Intent Classification Examples');
console.log('='.repeat(80));

const testQueries = [
  "I need scholarship for engineering",
  "मुझे स्वास्थ्य बीमा चाहिए",  // Hindi: I need health insurance
  "How to apply for housing scheme?",
  "PM-KISAN registration",
  "मुद्रा लोन कैसे मिलेगा",  // Hindi: How to get MUDRA loan
  "Help me find schemes",
  "What is Ayushman Bharat?"
];

console.log('\n🎯 Intent Detection Results:\n');
testQueries.forEach(query => {
  const intent = classifyIntent(query);
  console.log(`Query: "${query}"`);
  console.log(`Intent: ${intent}\n`);
});

// ============================================================================
// TEST CASE 7: Specific scheme eligibility check
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('TEST CASE 7: Check eligibility for specific scheme');
console.log('='.repeat(80));

const businessProfile: UserProfile = {
  age: 30,
  gender: 'female',
  category: 'general',
  annualIncome: 500000,
  hasAadhar: true,
  hasBankAccount: true
};

const mudraCheck = checkSchemeEligibility('mudra-loan', businessProfile);

if (mudraCheck) {
  console.log('\n📋 Scheme:', mudraCheck.scheme.name);
  console.log('✅ Eligible:', mudraCheck.isEligible);
  console.log('📊 Confidence:', mudraCheck.confidence + '%');
  console.log('\n📝 Evaluation:');
  mudraCheck.reasons.forEach(r => console.log(`  ${r}`));
  
  if (mudraCheck.missingInfo.length > 0) {
    console.log('\n❓ Missing Information:');
    mudraCheck.missingInfo.forEach(m => console.log(`  • ${m}`));
  }
}

console.log('\n\n' + '='.repeat(80));
console.log('ALL TESTS COMPLETED');
console.log('='.repeat(80));
