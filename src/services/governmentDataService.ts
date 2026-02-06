/**
 * Government Data Service
 * 
 * Fetches real scheme data from data.gov.in and other .gov.in sources
 * Caches data in Supabase with daily refresh
 * Falls back to cached data if API fails
 */

import { supabase } from '@/integrations/supabase/client';

// Data source configuration
const DATA_SOURCES = {
  SCHOLARSHIPS: {
    // National Scholarship Portal data from data.gov.in
    url: 'https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6',
    apiKey: '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b', // Public API key from data.gov.in
    format: 'json',
    limit: 100,
  },
  PM_SCHEMES: {
    // PM schemes data (fallback to static if API unavailable)
    url: 'https://www.india.gov.in/api/schemes',
    format: 'json',
  }
};

interface GovernmentScheme {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  category: string;
  state: string;
  benefits: string[];
  eligibility: any;
  website?: string;
  helpline?: string;
  lastUpdated?: string;
}

interface CachedData {
  data_source: string;
  data_type: string;
  raw_data: any;
  normalized_data: GovernmentScheme[];
  fetch_date: string;
  metadata?: any;
}

/**
 * Normalize data.gov.in scholarship data to our scheme structure
 */
function normalizeScholarshipData(rawData: any[]): GovernmentScheme[] {
  if (!Array.isArray(rawData)) return [];

  return rawData.map((item, index) => {
    // data.gov.in scholarship data structure varies
    // This handles common fields from National Scholarship Portal
    const scheme: GovernmentScheme = {
      id: `gov-scholarship-${item.id || index}`,
      name: item.scheme_name || item.name || item.title || 'Government Scholarship',
      nameHi: item.scheme_name_hindi || item.name_hindi,
      description: item.description || item.scheme_description || 'Government scholarship scheme for eligible students',
      descriptionHi: item.description_hindi || item.scheme_description_hindi,
      category: item.category || item.scheme_type || 'Education',
      state: item.state || item.applicable_state || 'All India',
      benefits: [
        item.benefit_amount || item.scholarship_amount || 'Financial assistance for education',
        item.additional_benefits || 'Support for educational expenses'
      ].filter(Boolean),
      eligibility: {
        education: item.education_level || item.class || 'As per scheme guidelines',
        income: item.income_limit || item.family_income || 'As per scheme guidelines',
        category: item.caste_category || item.social_category || 'As per scheme guidelines',
      },
      website: item.website || item.application_url || 'https://scholarships.gov.in',
      helpline: item.helpline || item.contact_number || '1800-11-8004',
      lastUpdated: item.last_updated || item.updated_date || new Date().toISOString(),
    };

    return scheme;
  });
}

/**
 * Fetch data from data.gov.in API
 */
async function fetchFromDataGovIn(): Promise<any[]> {
  const { url, apiKey, format, limit } = DATA_SOURCES.SCHOLARSHIPS;
  
  try {
    const apiUrl = `${url}?api-key=${apiKey}&format=${format}&limit=${limit}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // data.gov.in returns data in 'records' field
    return data.records || data.data || data || [];
  } catch (error) {
    console.error('Error fetching from data.gov.in:', error);
    throw error;
  }
}

/**
 * Fetch fallback data from static government sources
 */
async function fetchFallbackData(): Promise<GovernmentScheme[]> {
  // Fallback to curated government schemes if API fails
  return [
    {
      id: 'nsp-pre-matric-sc',
      name: 'Pre-Matric Scholarship for SC Students',
      nameHi: 'अनुसूचित जाति के छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति',
      description: 'Financial assistance to SC students studying in classes IX and X to reduce dropout rates',
      descriptionHi: 'कक्षा IX और X में पढ़ने वाले अनुसूचित जाति के छात्रों को ड्रॉपआउट दर कम करने के लिए वित्तीय सहायता',
      category: 'Education',
      state: 'All India',
      benefits: [
        'Day scholars: ₹225-450 per month',
        'Hostellers: ₹600-750 per month',
        'Books and stationery allowance'
      ],
      eligibility: {
        category: 'Scheduled Caste (SC)',
        education: 'Class IX and X',
        income: 'Family income up to ₹2.5 lakh per annum',
      },
      website: 'https://scholarships.gov.in',
      helpline: '0120-6619540',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'nsp-post-matric-sc',
      name: 'Post-Matric Scholarship for SC Students',
      nameHi: 'अनुसूचित जाति के छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
      description: 'Financial assistance to SC students for post-matriculation studies',
      descriptionHi: 'अनुसूचित जाति के छात्रों को मैट्रिक के बाद की पढ़ाई के लिए वित्तीय सहायता',
      category: 'Education',
      state: 'All India',
      benefits: [
        'Maintenance allowance: ₹380-1200 per month',
        'Reimbursement of compulsory fees',
        'Study tour charges',
        'Thesis typing/printing charges'
      ],
      eligibility: {
        category: 'Scheduled Caste (SC)',
        education: 'Post-matriculation (Class XI onwards)',
        income: 'Family income up to ₹2.5 lakh per annum',
      },
      website: 'https://scholarships.gov.in',
      helpline: '0120-6619540',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'nsp-merit-cum-means',
      name: 'Merit-cum-Means Scholarship for Minorities',
      nameHi: 'अल्पसंख्यकों के लिए मेरिट-कम-मीन्स छात्रवृत्ति',
      description: 'Scholarship for meritorious students from minority communities',
      descriptionHi: 'अल्पसंख्यक समुदायों के मेधावी छात्रों के लिए छात्रवृत्ति',
      category: 'Education',
      state: 'All India',
      benefits: [
        'Professional courses: ₹20,000 per year',
        'Technical courses: ₹10,000 per year',
        'General courses: ₹5,000 per year'
      ],
      eligibility: {
        category: 'Minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)',
        education: 'Class XI to Post-graduation',
        income: 'Family income up to ₹2.5 lakh per annum',
        marks: 'Minimum 50% marks in previous examination',
      },
      website: 'https://scholarships.gov.in',
      helpline: '011-23583788',
      lastUpdated: new Date().toISOString(),
    },
  ];
}

/**
 * Check if cached data needs refresh (older than 24 hours)
 */
async function needsRefresh(dataSource: string, dataType: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('needs_data_refresh', {
      p_data_source: dataSource,
      p_data_type: dataType,
    });

    if (error) {
      console.error('Error checking refresh status:', error);
      return true; // Assume refresh needed if check fails
    }

    return data === true;
  } catch (error) {
    console.error('Error in needsRefresh:', error);
    return true;
  }
}

/**
 * Get cached data from Supabase
 */
async function getCachedData(dataSource: string, dataType: string): Promise<GovernmentScheme[] | null> {
  try {
    const { data, error } = await supabase.rpc('get_latest_government_data', {
      p_data_source: dataSource,
      p_data_type: dataType,
    });

    if (error) {
      console.error('Error fetching cached data:', error);
      return null;
    }

    return data as GovernmentScheme[] | null;
  } catch (error) {
    console.error('Error in getCachedData:', error);
    return null;
  }
}

/**
 * Save data to Supabase cache
 */
async function saveCachedData(
  dataSource: string,
  dataType: string,
  rawData: any,
  normalizedData: GovernmentScheme[]
): Promise<void> {
  try {
    const { error } = await supabase
      .from('government_data_cache')
      .insert({
        data_source: dataSource,
        data_type: dataType,
        raw_data: rawData,
        normalized_data: normalizedData,
        fetch_date: new Date().toISOString(),
        metadata: {
          count: normalizedData.length,
          source: 'data.gov.in',
          api_version: '1.0',
        },
      });

    if (error) {
      console.error('Error saving cached data:', error);
    }
  } catch (error) {
    console.error('Error in saveCachedData:', error);
  }
}

/**
 * Main function to get government schemes
 * - Checks cache first
 * - Fetches from API if cache is stale
 * - Falls back to cached data if API fails
 * - Falls back to static data if no cache exists
 */
export async function getGovernmentSchemes(): Promise<{
  schemes: GovernmentScheme[];
  source: 'api' | 'cache' | 'fallback';
  lastUpdated: string;
}> {
  const dataSource = 'data.gov.in';
  const dataType = 'scholarships';

  try {
    // Step 1: Check if we need to refresh
    const shouldRefresh = await needsRefresh(dataSource, dataType);

    if (shouldRefresh) {
      console.log('Cache is stale or missing, fetching fresh data...');
      
      try {
        // Step 2: Try to fetch from data.gov.in
        const rawData = await fetchFromDataGovIn();
        const normalizedData = normalizeScholarshipData(rawData);

        if (normalizedData.length > 0) {
          // Step 3: Save to cache (non-blocking)
          saveCachedData(dataSource, dataType, rawData, normalizedData).catch(err => {
            console.error('Failed to save cache (non-critical):', err);
          });

          return {
            schemes: normalizedData,
            source: 'api',
            lastUpdated: new Date().toISOString(),
          };
        }
      } catch (apiError) {
        console.error('API fetch failed, falling back to cache:', apiError);
      }
    }

    // Step 4: Try to get cached data
    const cachedData = await getCachedData(dataSource, dataType);
    
    if (cachedData && cachedData.length > 0) {
      return {
        schemes: cachedData,
        source: 'cache',
        lastUpdated: new Date().toISOString(),
      };
    }

    // Step 5: Final fallback to static data
    console.log('No cache available, using fallback data');
    const fallbackData = await fetchFallbackData();
    
    // Save fallback data to cache for future use
    saveCachedData(dataSource, dataType, fallbackData, fallbackData).catch(err => {
      console.error('Failed to save fallback cache (non-critical):', err);
    });

    return {
      schemes: fallbackData,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };

  } catch (error) {
    console.error('Critical error in getGovernmentSchemes:', error);
    
    // Last resort: return fallback data
    const fallbackData = await fetchFallbackData();
    return {
      schemes: fallbackData,
      source: 'fallback',
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Background refresh function (can be called on app mount)
 * Non-blocking, runs in background
 */
export function refreshGovernmentDataInBackground(): void {
  // Run in background without blocking
  setTimeout(async () => {
    try {
      await getGovernmentSchemes();
      console.log('Background data refresh completed');
    } catch (error) {
      console.error('Background refresh failed (non-critical):', error);
    }
  }, 2000); // Wait 2 seconds after app load
}

/**
 * Get data source status for display
 */
export async function getDataSourceStatus(): Promise<{
  hasCache: boolean;
  cacheAge: string;
  needsRefresh: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from('government_data_cache')
      .select('fetch_date')
      .eq('data_source', 'data.gov.in')
      .eq('data_type', 'scholarships')
      .eq('is_active', true)
      .order('fetch_date', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return {
        hasCache: false,
        cacheAge: 'Never',
        needsRefresh: true,
      };
    }

    const fetchDate = new Date(data.fetch_date);
    const now = new Date();
    const ageHours = Math.floor((now.getTime() - fetchDate.getTime()) / (1000 * 60 * 60));
    
    return {
      hasCache: true,
      cacheAge: ageHours < 1 ? 'Less than 1 hour ago' : `${ageHours} hours ago`,
      needsRefresh: ageHours >= 24,
    };
  } catch (error) {
    console.error('Error getting data source status:', error);
    return {
      hasCache: false,
      cacheAge: 'Unknown',
      needsRefresh: true,
    };
  }
}
