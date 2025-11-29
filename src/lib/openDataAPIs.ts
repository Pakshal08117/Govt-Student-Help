// Open Data APIs for Maharashtra Government Data
// These APIs provide real-time government data

export interface OpenDataSource {
  name: string;
  url: string;
  type: 'json' | 'csv' | 'xml';
  updateFrequency: string;
}

// Maharashtra Open Data Portal APIs
export const openDataSources: OpenDataSource[] = [
  {
    name: "Maharashtra Government Schemes",
    url: "https://data.gov.in/api/datastore/resource.json?resource_id=schemes",
    type: "json",
    updateFrequency: "daily"
  },
  {
    name: "District Offices",
    url: "https://data.gov.in/api/datastore/resource.json?resource_id=offices",
    type: "json",
    updateFrequency: "weekly"
  }
];

// Fetch data from open data sources
export async function fetchOpenData(source: OpenDataSource) {
  try {
    const response = await fetch(source.url);
    if (!response.ok) throw new Error('Failed to fetch data');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error);
    return null;
  }
}

// Parse CSV data
export function parseCSV(csvText: string): any[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split(',');
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header.trim()] = values[index]?.trim() || '';
    });
    
    data.push(row);
  }

  return data;
}

// Auto-update data at intervals
export function setupAutoUpdate(
  callback: () => void,
  intervalMinutes: number = 60
) {
  const intervalMs = intervalMinutes * 60 * 1000;
  
  // Initial fetch
  callback();
  
  // Set up interval
  const intervalId = setInterval(callback, intervalMs);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
}

// Sync data with Supabase
export async function syncDataToSupabase(
  supabase: any,
  tableName: string,
  data: any[]
) {
  try {
    const { error } = await supabase
      .from(tableName)
      .upsert(data, { onConflict: 'id' });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error syncing data:', error);
    return { success: false, error };
  }
}
