/**
 * Official Administrative Hierarchy of India
 * 
 * This file contains the complete administrative structure of India
 * as per official government data. Use this as reference data across
 * the application for consistency.
 */

export interface AdminHierarchy {
  level: number;
  name: string;
  count: number | string;
  description: string;
  alternateNames?: string[];
  isDynamic?: boolean;
}

/**
 * Complete Administrative Hierarchy of India (Top to Bottom)
 */
export const INDIA_ADMIN_HIERARCHY: AdminHierarchy[] = [
  {
    level: 1,
    name: "Country",
    count: 1,
    description: "India"
  },
  {
    level: 2,
    name: "States",
    count: 28,
    description: "Indian States with their own governments"
  },
  {
    level: 3,
    name: "Union Territories",
    count: 8,
    description: "Centrally administered territories"
  },
  {
    level: 4,
    name: "States + Union Territories",
    count: 36,
    description: "Total administrative regions"
  },
  {
    level: 5,
    name: "Districts",
    count: "~806",
    description: "District-level administrative divisions",
    isDynamic: true
  },
  {
    level: 6,
    name: "Sub-districts",
    count: "~7,800+",
    description: "Sub-district level administrative units",
    alternateNames: ["Tehsil", "Taluka", "Mandal", "Sub-division"],
    isDynamic: true
  },
  {
    level: 7,
    name: "Development Blocks",
    count: "Several thousand",
    description: "Block-level administrative units (state-dependent)",
    isDynamic: true
  },
  {
    level: 8,
    name: "Gram Panchayats",
    count: "~2.5 lakh+",
    description: "Village-level local self-government units (~250,000+)",
    isDynamic: true
  },
  {
    level: 9,
    name: "Villages",
    count: "~6 lakh+",
    description: "Rural settlements (~600,000+)",
    isDynamic: true
  }
];

/**
 * Administrative Level Constants
 */
export const ADMIN_LEVELS = {
  COUNTRY: 1,
  STATE: 2,
  UNION_TERRITORY: 3,
  STATE_UT_COMBINED: 4,
  DISTRICT: 5,
  SUB_DISTRICT: 6,
  BLOCK: 7,
  GRAM_PANCHAYAT: 8,
  VILLAGE: 9
} as const;

/**
 * Sub-district level terminology
 * Note: These terms represent the SAME administrative level
 */
export const SUB_DISTRICT_TERMS = {
  TEHSIL: "Tehsil",
  TALUKA: "Taluka",
  MANDAL: "Mandal",
  SUB_DIVISION: "Sub-division"
} as const;

/**
 * Official counts
 */
export const INDIA_STATS = {
  TOTAL_STATES: 28,
  TOTAL_UTS: 8,
  TOTAL_STATES_UTS: 36,
  APPROX_DISTRICTS: 806,
  APPROX_SUB_DISTRICTS: 7800,
  APPROX_GRAM_PANCHAYATS: 250000,
  APPROX_VILLAGES: 600000
} as const;

/**
 * Get hierarchy level name
 */
export function getHierarchyLevelName(level: number): string {
  const item = INDIA_ADMIN_HIERARCHY.find(h => h.level === level);
  return item?.name || "Unknown";
}

/**
 * Get hierarchy level description
 */
export function getHierarchyLevelDescription(level: number): string {
  const item = INDIA_ADMIN_HIERARCHY.find(h => h.level === level);
  return item?.description || "";
}

/**
 * Check if a term is a valid sub-district term
 */
export function isSubDistrictTerm(term: string): boolean {
  const normalizedTerm = term.toLowerCase();
  return Object.values(SUB_DISTRICT_TERMS)
    .some(t => t.toLowerCase() === normalizedTerm);
}

/**
 * Get the complete hierarchy as a formatted string
 */
export function getFormattedHierarchy(): string {
  return INDIA_ADMIN_HIERARCHY
    .map(h => {
      const alternates = h.alternateNames ? ` (${h.alternateNames.join(" / ")})` : "";
      return `${h.level}. ${h.name}${alternates}: ${h.count}`;
    })
    .join("\n");
}

/**
 * Validation: Check if district count is within expected range
 */
export function isValidDistrictCount(count: number): boolean {
  return count >= 700 && count <= 900; // Approximate range
}

/**
 * Get sub-district term used in a specific state
 * Returns the commonly used term for that state
 */
export function getSubDistrictTermForState(stateName: string): string {
  const stateTermMap: Record<string, string> = {
    // States using "Tehsil"
    "Uttar Pradesh": SUB_DISTRICT_TERMS.TEHSIL,
    "Madhya Pradesh": SUB_DISTRICT_TERMS.TEHSIL,
    "Rajasthan": SUB_DISTRICT_TERMS.TEHSIL,
    "Haryana": SUB_DISTRICT_TERMS.TEHSIL,
    "Punjab": SUB_DISTRICT_TERMS.TEHSIL,
    "Himachal Pradesh": SUB_DISTRICT_TERMS.TEHSIL,
    "Uttarakhand": SUB_DISTRICT_TERMS.TEHSIL,
    "Jammu and Kashmir": SUB_DISTRICT_TERMS.TEHSIL,
    "Delhi": SUB_DISTRICT_TERMS.TEHSIL,
    
    // States using "Taluka"
    "Maharashtra": SUB_DISTRICT_TERMS.TALUKA,
    "Gujarat": SUB_DISTRICT_TERMS.TALUKA,
    "Karnataka": SUB_DISTRICT_TERMS.TALUKA,
    "Goa": SUB_DISTRICT_TERMS.TALUKA,
    
    // States using "Mandal"
    "Andhra Pradesh": SUB_DISTRICT_TERMS.MANDAL,
    "Telangana": SUB_DISTRICT_TERMS.MANDAL,
    
    // States using "Sub-division" or "Tehsil"
    "West Bengal": SUB_DISTRICT_TERMS.SUB_DIVISION,
    "Assam": SUB_DISTRICT_TERMS.SUB_DIVISION,
    "Bihar": SUB_DISTRICT_TERMS.SUB_DIVISION,
    "Jharkhand": SUB_DISTRICT_TERMS.SUB_DIVISION,
    "Odisha": SUB_DISTRICT_TERMS.SUB_DIVISION,
  };
  
  return stateTermMap[stateName] || SUB_DISTRICT_TERMS.TEHSIL; // Default to Tehsil
}

/**
 * Complete JSON structure for India's administrative hierarchy
 * Suitable for government information platforms and APIs
 */
export const INDIA_ADMIN_HIERARCHY_JSON = {
  "country": "India",
  "administrative_hierarchy": [
    {
      "level": 1,
      "name": "Country",
      "count": 1,
      "approximate": false,
      "description": "India"
    },
    {
      "level": 2,
      "name": "States",
      "count": 28,
      "approximate": false,
      "description": "Indian States with their own governments"
    },
    {
      "level": 3,
      "name": "Union Territories",
      "count": 8,
      "approximate": false,
      "description": "Centrally administered territories"
    },
    {
      "level": 4,
      "name": "States and Union Territories Combined",
      "count": 36,
      "approximate": false,
      "description": "Total administrative regions"
    },
    {
      "level": 5,
      "name": "Districts",
      "count": 806,
      "approximate": true,
      "description": "District-level administrative divisions",
      "note": "Subject to reorganization"
    },
    {
      "level": 6,
      "name": "Sub-districts",
      "count": 7800,
      "approximate": true,
      "description": "Sub-district level administrative units",
      "alternate_names": ["Tehsil", "Taluka", "Mandal", "Sub-division"],
      "note": "These terms represent the same administrative level"
    },
    {
      "level": 7,
      "name": "Development Blocks",
      "count": null,
      "approximate": true,
      "description": "Block-level administrative units",
      "note": "Several thousand, state-dependent"
    },
    {
      "level": 8,
      "name": "Gram Panchayats",
      "count": 250000,
      "approximate": true,
      "description": "Village-level local self-government units"
    },
    {
      "level": 9,
      "name": "Villages",
      "count": 600000,
      "approximate": true,
      "description": "Rural settlements"
    }
  ],
  "sub_district_terminology": {
    "Tehsil": [
      "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Haryana", "Punjab", 
      "Himachal Pradesh", "Uttarakhand", "Jammu and Kashmir", "Delhi", 
      "Chandigarh", "Ladakh", "Chhattisgarh", "Arunachal Pradesh", "Manipur", 
      "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura", "Kerala", 
      "Tamil Nadu", "Andaman and Nicobar Islands", "Lakshadweep", "Puducherry"
    ],
    "Taluka": [
      "Maharashtra", "Gujarat", "Karnataka", "Goa", 
      "Dadra and Nagar Haveli and Daman and Diu"
    ],
    "Mandal": [
      "Andhra Pradesh", "Telangana"
    ],
    "Sub-division": [
      "West Bengal", "Assam", "Bihar", "Jharkhand", "Odisha"
    ]
  },
  "union_territories": [
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ],
  "metadata": {
    "last_updated": "2026-02-10",
    "version": "1.0.0",
    "source": "Government of India Official Administrative Structure",
    "data_accuracy": "Based on Census of India and Ministry of Home Affairs records"
  }
} as const;
