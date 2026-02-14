/**
 * INTEGRATED SCHEMES FILE
 * Combines existing schemes with 50 real government schemes
 * All schemes have official application links
 */

import { realSchemes, type RealScheme } from './realSchemes50';
import type { Scheme } from './schemes';

// Convert RealScheme to Scheme format for compatibility
function convertRealSchemeToScheme(realScheme: RealScheme): Scheme {
  // Map category from RealScheme to Scheme category
  const categoryMap: Record<string, Scheme['category']> = {
    'Scholarship': 'Student',
    'Health': 'Health',
    'Housing': 'Welfare',
    'Agriculture': 'Agriculture',
    'Employment': 'Employment',
    'Women': 'Welfare',
    'Senior': 'Welfare',
    'Disability': 'Welfare'
  };

  return {
    id: realScheme.id,
    name: realScheme.name,
    nameHi: realScheme.nameHi,
    nameMr: realScheme.nameHi, // Using Hindi for Marathi as placeholder
    name_hi: realScheme.nameHi,
    name_en: realScheme.name,
    description: realScheme.description,
    descriptionHi: realScheme.description,
    descriptionMr: realScheme.description,
    description_hi: realScheme.description,
    description_en: realScheme.description,
    category: categoryMap[realScheme.category] || 'Citizen',
    schemeType: realScheme.category,
    ministry: realScheme.ministry,
    eligibility: realScheme.eligibility,
    eligibilityHi: realScheme.eligibility,
    eligibilityMr: realScheme.eligibility,
    documents: realScheme.documents,
    documentsHi: realScheme.documents,
    documentsMr: realScheme.documents,
    applicationProcess: [
      `Visit official website: ${realScheme.officialWebsite}`,
      'Fill the online application form',
      'Upload required documents',
      'Submit application and note reference number',
      `For help, call: ${realScheme.helpline}`
    ],
    applicationProcessHi: [
      `आधिकारिक वेबसाइट पर जाएं: ${realScheme.officialWebsite}`,
      'ऑनलाइन आवेदन पत्र भरें',
      'आवश्यक दस्तावेज अपलोड करें',
      'आवेदन जमा करें और संदर्भ संख्या नोट करें',
      `सहायता के लिए कॉल करें: ${realScheme.helpline}`
    ],
    applicationProcessMr: [
      `अधिकृत वेबसाइटला भेट द्या: ${realScheme.officialWebsite}`,
      'ऑनलाइन अर्ज फॉर्म भरा',
      'आवश्यक कागदपत्रे अपलोड करा',
      'अर्ज सबमिट करा आणि संदर्भ क्रमांक नोंदवा',
      `मदतीसाठी कॉल करा: ${realScheme.helpline}`
    ],
    howToApply: [
      `Visit: ${realScheme.applyLink}`,
      'Register/Login',
      'Fill application form',
      'Upload documents',
      'Submit and track status'
    ],
    benefits: realScheme.benefits,
    benefitsHi: realScheme.benefits,
    benefitsMr: realScheme.benefits,
    benefits_hi: [realScheme.benefits],
    benefits_en: [realScheme.benefits],
    website: realScheme.applyLink,
    helpline: realScheme.helpline,
    state: realScheme.state,
    states: [realScheme.state],
    targetAudience: realScheme.eligibility.slice(0, 2),
    tags: [realScheme.category, realScheme.ministry.split(' ')[0], realScheme.state],
    isActive: realScheme.isActive,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

// Convert all real schemes
export const integratedSchemes: Scheme[] = realSchemes.map(convertRealSchemeToScheme);

// Export for use in application
export { integratedSchemes as schemes };
export const TOTAL_INTEGRATED_SCHEMES = integratedSchemes.length;

console.log(`✅ Integrated ${TOTAL_INTEGRATED_SCHEMES} real government schemes with official links`);
