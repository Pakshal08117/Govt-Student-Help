/**
 * Comprehensive translations for all supported languages
 * This file extends the base translations with all missing keys
 */

// Common keys that all languages should have
export const commonKeys = {
  // Core Navigation & Branding
  home: true,
  services: true,
  about: true,
  contact: true,
  findSchemes: true,
  appName: true,
  tagline: true,
  heroTitle: true,
  heroDesc: true,
  
  // User Categories
  forWhom: true,
  students: true,
  citizens: true,
  schemeApplicants: true,
  quickLinks: true,
  madeFor: true,
  evolution: true,
  
  // User Type Selection
  selectUserType: true,
  studentDesc: true,
  citizenDesc: true,
  schemeApplicantDesc: true,
  schemeSeekers: true,
  schemeSeekerDesc: true,
  
  // Index Page Specific
  govInitiative: true,
  govAndStudent: true,
  helpPlatform: true,
  oneStopAssistance: true,
  governmentSchemesShort: true,
  statesAndUTs: true,
  supportAvailable: true,
  freeServices: true,
  exploreAllSchemes: true,
  whoAreYou: true,
  chooseCategory: true,
  viewSchemes: true,
  popularGovSchemes: true,
  mostAccessedSchemes: true,
  viewAllSchemes: true,
  trustedByMillions: true,
  citizensHelped: true,
  applicationsProcessed: true,
  governmentVerified: true,
  freeService: true,
  
  // Location Selection
  selectState: true,
  selectDistrict: true,
  allIndia: true,
  search: true,
  
  // Categories
  categories: true,
  health: true,
  education: true,
  agriculture: true,
  revenue: true,
  publicWorks: true,
  more: true,
  scholarship: true,
  welfare: true,
  employment: true,
  
  // Language Toggle
  lang: true,
  
  // Schemes & Scholarships
  schemes: true,
  governmentSchemes: true,
  browseSchemes: true,
  searchSchemes: true,
  showingNearbySchemes: true,
  emergencyHelplines: true,
  visitWebsite: true,
  needHelpWithDocuments: true,
  noSchemesFound: true,
  scholarships: true,
  studentSchemes: true,
  citizenSchemes: true,
  welfareSchemes: true,
  
  // Tags
  tagStudent: true,
  tagCitizen: true,
  tagGovernment: true,
  tagScholarship: true,
  tagWelfare: true,
  tagEducation: true,
  
  // Application & Tracking
  apply: true,
  eligibility: true,
  howToApply: true,
  step1: true,
  step2: true,
  step3: true,
  step4: true,
  checkEligibility: true,
  gatherDocuments: true,
  fillForm: true,
  submitAndTrack: true,
  trackApplication: true,
  applicationStatus: true,
  pending: true,
  approved: true,
  rejected: true,
  
  // Admin Panel
  adminPanel: true,
  manageApplications: true,
  totalApplications: true,
  recentApplications: true,
  loading: true,
  noApplicationsYet: true,
  review: true,
  approve: true,
  reject: true,
  
  // Contact & Support
  contactTitle: true,
  name: true,
  message: true,
  submit: true,
  support: true,
  supportPhone: true,
  supportEmail: true,
  
  // Government Contacts
  govContacts: true,
  helpline1077: true,
  helpline1077Phone: true,
  helpline1077Desc: true,
  
  // Emergency Services
  emergencyServices: true,
  police: true,
  fire: true,
  ambulance: true,
  disasterMgmt: true,
  
  // About Page
  aboutTitle: true,
  aboutBody: true,
};

// Fallback translations - use English if translation is missing
export function getFallbackTranslation(key: string, lang: string, allStrings: any): string {
  // Try the requested language
  if (allStrings[lang] && allStrings[lang][key]) {
    return allStrings[lang][key];
  }
  
  // Fall back to English
  if (allStrings.en && allStrings.en[key]) {
    return allStrings.en[key];
  }
  
  // Return the key itself as last resort
  return key;
}
