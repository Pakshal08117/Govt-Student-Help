/**
 * India Administrative Hierarchy Validator
 * 
 * This utility validates and ensures correct handling of Indian administrative
 * hierarchy queries for government information platforms.
 */

import { 
  INDIA_ADMIN_HIERARCHY_JSON, 
  INDIA_STATS,
  getSubDistrictTermForState 
} from '@/data/indiaAdminHierarchy';

/**
 * Correct hierarchy order that must NEVER be changed
 */
export const CORRECT_HIERARCHY_ORDER = [
  "Country",
  "State/UT",
  "District",
  "Tehsil/Taluka/Mandal/Sub-division",
  "Development Block",
  "Gram Panchayat",
  "Village"
] as const;

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate that hierarchy order is correct
 */
export function validateHierarchyOrder(levels: string[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if levels follow correct order
  const correctOrder = [
    "country", "state", "ut", "district", 
    "tehsil", "taluka", "mandal", "subdivision",
    "block", "panchayat", "village"
  ];

  let lastIndex = -1;
  for (const level of levels) {
    const normalized = level.toLowerCase().replace(/[^a-z]/g, '');
    const currentIndex = correctOrder.findIndex(c => normalized.includes(c));
    
    if (currentIndex !== -1 && currentIndex < lastIndex) {
      errors.push(`Hierarchy order violated: ${level} appears after a lower level`);
    }
    lastIndex = Math.max(lastIndex, currentIndex);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate that Tehsil/Taluka/Mandal are treated as the same level
 */
export function validateSubDistrictTerminology(query: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const subDistrictTerms = ['tehsil', 'taluka', 'mandal', 'sub-division'];
  const foundTerms = subDistrictTerms.filter(term => 
    query.toLowerCase().includes(term)
  );

  // Check if query treats them as different levels
  if (foundTerms.length > 1) {
    const hasSeparateLevels = 
      query.toLowerCase().includes('after') ||
      query.toLowerCase().includes('before') ||
      query.toLowerCase().includes('between');
    
    if (hasSeparateLevels) {
      errors.push(
        'Tehsil, Taluka, Mandal, and Sub-division represent the SAME administrative level. ' +
        'They are just different names used in different states.'
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get official count for an administrative level
 */
export function getOfficialCount(level: string): {
  count: number | null;
  approximate: boolean;
  note?: string;
} {
  const normalized = level.toLowerCase().replace(/[^a-z]/g, '');

  if (normalized.includes('state') && !normalized.includes('union')) {
    return { count: INDIA_STATS.TOTAL_STATES, approximate: false };
  }
  
  if (normalized.includes('union') || normalized.includes('ut')) {
    return { count: INDIA_STATS.TOTAL_UTS, approximate: false };
  }
  
  if (normalized.includes('district')) {
    return { 
      count: INDIA_STATS.APPROX_DISTRICTS, 
      approximate: true,
      note: 'The number varies due to administrative reorganization'
    };
  }
  
  if (normalized.includes('tehsil') || normalized.includes('taluka') || 
      normalized.includes('mandal') || normalized.includes('subdivision')) {
    return { 
      count: INDIA_STATS.APPROX_SUB_DISTRICTS, 
      approximate: true,
      note: 'Approximate count, varies by state'
    };
  }
  
  if (normalized.includes('panchayat') || normalized.includes('gram')) {
    return { 
      count: INDIA_STATS.APPROX_GRAM_PANCHAYATS, 
      approximate: true,
      note: 'Approximate count'
    };
  }
  
  if (normalized.includes('village')) {
    return { 
      count: INDIA_STATS.APPROX_VILLAGES, 
      approximate: true,
      note: 'Approximate count'
    };
  }

  return { count: null, approximate: false };
}

/**
 * Format response for administrative hierarchy query
 */
export function formatHierarchyResponse(): string {
  return `
**India's Administrative Hierarchy** (Top to Bottom):

1. **Country**: India (1)
2. **States**: 28
3. **Union Territories**: 8
4. **Total States + UTs**: 36
5. **Districts**: ~806 (approximate - subject to reorganization)
6. **Sub-districts**: ~7,800+ 
   - Called **Tehsil** in: UP, MP, Rajasthan, Haryana, Punjab, etc.
   - Called **Taluka** in: Maharashtra, Gujarat, Karnataka, Goa
   - Called **Mandal** in: Andhra Pradesh, Telangana
   - Called **Sub-division** in: West Bengal, Assam, Bihar, Jharkhand, Odisha
   - ⚠️ **Important**: These are the SAME administrative level, just different names!
7. **Development Blocks**: Several thousand (state-dependent)
8. **Gram Panchayats**: ~2.5 lakh+ (~250,000+)
9. **Villages**: ~6 lakh+ (~600,000+)

**Note**: Numbers marked with ~ are approximate and may change due to administrative reorganization.
`.trim();
}

/**
 * Validate a complete query about Indian administration
 */
export function validateAdminQuery(query: string): {
  isValid: boolean;
  response: string;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Validate sub-district terminology
  const termValidation = validateSubDistrictTerminology(query);
  if (!termValidation.isValid) {
    errors.push(...termValidation.errors);
  }

  // Check if asking for exact district numbers
  if (query.toLowerCase().includes('how many district') || 
      query.toLowerCase().includes('number of district')) {
    const count = getOfficialCount('district');
    return {
      isValid: true,
      response: `India has approximately **${count.count} districts**. ${count.note}`,
      errors: []
    };
  }

  // Check if asking for hierarchy
  if (query.toLowerCase().includes('hierarchy') || 
      query.toLowerCase().includes('structure') ||
      query.toLowerCase().includes('levels')) {
    return {
      isValid: true,
      response: formatHierarchyResponse(),
      errors: []
    };
  }

  return {
    isValid: errors.length === 0,
    response: '',
    errors
  };
}

/**
 * Get sub-district term for a state with validation
 */
export function getValidatedSubDistrictTerm(stateName: string): {
  term: string;
  isValid: boolean;
  message: string;
} {
  try {
    const term = getSubDistrictTermForState(stateName);
    return {
      term,
      isValid: true,
      message: `In ${stateName}, the sub-district level is called "${term}".`
    };
  } catch (error) {
    return {
      term: 'Tehsil',
      isValid: false,
      message: `Could not determine sub-district term for ${stateName}. Using default: Tehsil.`
    };
  }
}

/**
 * Export reference data for validation
 */
export const REFERENCE_DATA = {
  hierarchy: INDIA_ADMIN_HIERARCHY_JSON,
  stats: INDIA_STATS,
  correctOrder: CORRECT_HIERARCHY_ORDER
} as const;
