/**
 * EXPANDED SERVICES - Comprehensive but Optimized
 * ~2000+ services generated efficiently
 */

import { Service } from './services';
import { states } from './locations';

// Memoized service generation for performance
const generateExpandedServices = (): Service[] => {
  const services: Service[] = [];
  
  // Optimized service creation
  function createService(
    baseId: string,
    baseName: string,
    baseNameHi: string,
    category: Service['category'],
    state: string,
    district: string
  ): Service {
    const id = `${baseId}-${state}-${district}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    return {
      id,
      name: `${baseName} - ${district}`,
      nameHi: `${baseNameHi} - ${district}`,
      nameMr: `${baseNameHi} - ${district}`,
      description: `${baseName} service in ${district}, ${state}`,
      descriptionHi: `${baseNameHi} सेवा ${district}, ${state} में`,
      descriptionMr: `${baseNameHi} सेवा ${district}, ${state} मध्ये`,
      category,
      office: `${district} District Office`,
      officeHi: `${district} जिला कार्यालय`,
      officeMr: `${district} जिल्हा कार्यालय`,
      address: `${district} District, ${state}`,
      phone: '1077',
      email: `${district.toLowerCase().replace(/\s+/g, '')}@gov.in`,
      workingHours: '10:00 AM - 5:00 PM (Mon-Fri)',
      workingHoursHi: 'सुबह 10:00 - शाम 5:00 (सोम-शुक्र)',
      workingHoursMr: 'सकाळी 10:00 - संध्याकाळी 5:00 (सोम-शुक्र)',
      district,
      state,
      documents: ['Aadhaar Card', 'Address Proof'],
      documentsHi: ['आधार कार्ड', 'पता प्रमाण'],
      documentsMr: ['आधार कार्ड', 'पत्ता पुरावा'],
      fees: 'Varies',
      feesHi: 'भिन्न',
      feesMr: 'बदलते',
      processingTime: '7-30 days',
      processingTimeHi: '7-30 दिन',
      processingTimeMr: '7-30 दिवस',
      isOnline: true,
      website: 'https://www.india.gov.in',
      tags: [category, district, state]
    };
  }

  // Comprehensive service types (20 types)
  const serviceTypes = [
    { id: 'birth-cert', name: 'Birth Certificate', nameHi: 'जन्म प्रमाण पत्र', category: 'Revenue' as const },
    { id: 'death-cert', name: 'Death Certificate', nameHi: 'मृत्यु प्रमाण पत्र', category: 'Revenue' as const },
    { id: 'income-cert', name: 'Income Certificate', nameHi: 'आय प्रमाण पत्र', category: 'Revenue' as const },
    { id: 'caste-cert', name: 'Caste Certificate', nameHi: 'जाति प्रमाण पत्र', category: 'Revenue' as const },
    { id: 'domicile-cert', name: 'Domicile Certificate', nameHi: 'निवास प्रमाण पत्र', category: 'Revenue' as const },
    { id: 'ration-card', name: 'Ration Card', nameHi: 'राशन कार्ड', category: 'Social Welfare' as const },
    { id: 'health-card', name: 'Health Card', nameHi: 'स्वास्थ्य कार्ड', category: 'Health' as const },
    { id: 'disability-cert', name: 'Disability Certificate', nameHi: 'विकलांगता प्रमाण पत्र', category: 'Social Welfare' as const },
    { id: 'senior-card', name: 'Senior Citizen Card', nameHi: 'वरिष्ठ नागरिक कार्ड', category: 'Social Welfare' as const },
    { id: 'marriage-reg', name: 'Marriage Registration', nameHi: 'विवाह पंजीकरण', category: 'Revenue' as const },
    { id: 'property-tax', name: 'Property Tax', nameHi: 'संपत्ति कर', category: 'Revenue' as const },
    { id: 'water-conn', name: 'Water Connection', nameHi: 'जल कनेक्शन', category: 'Public Works' as const },
    { id: 'electricity-conn', name: 'Electricity Connection', nameHi: 'बिजली कनेक्शन', category: 'Public Works' as const },
    { id: 'building-permit', name: 'Building Permit', nameHi: 'भवन अनुमति', category: 'Public Works' as const },
    { id: 'trade-license', name: 'Trade License', nameHi: 'व्यापार लाइसेंस', category: 'Employment' as const },
    { id: 'food-license', name: 'Food License', nameHi: 'खाद्य लाइसेंस', category: 'Employment' as const },
    { id: 'shop-license', name: 'Shop Act License', nameHi: 'दुकान लाइसेंस', category: 'Employment' as const },
    { id: 'land-records', name: 'Land Records', nameHi: 'भूमि रिकॉर्ड', category: 'Revenue' as const },
    { id: 'noc-cert', name: 'NOC Certificate', nameHi: 'एनओसी प्रमाण पत्र', category: 'Other' as const },
    { id: 'police-verify', name: 'Police Verification', nameHi: 'पुलिस सत्यापन', category: 'Other' as const }
  ];

  // Generate for all major states (10 states)
  const majorStates = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat',
    'Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Madhya Pradesh', 'Telangana'
  ];

  // Batch generation for performance
  states.forEach(state => {
    const districtCount = majorStates.includes(state.name) ? 5 : 2;
    const districts = state.districts.slice(0, districtCount);
    
    districts.forEach(district => {
      serviceTypes.forEach(serviceType => {
        services.push(createService(
          serviceType.id,
          serviceType.name,
          serviceType.nameHi,
          serviceType.category,
          state.name,
          district
        ));
      });
    });
  });

  return services;
};

// Generate once at module load - cached for performance
export const expandedServices: Service[] = generateExpandedServices();
export const TOTAL_EXPANDED_SERVICES = expandedServices.length;

console.log(`✅ Generated ${TOTAL_EXPANDED_SERVICES} location-specific services (optimized)`);
