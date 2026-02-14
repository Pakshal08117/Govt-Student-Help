// Offline Data Caching Utility
// Provides IndexedDB-based caching for offline data access

const DB_NAME = 'GovtHelpOfflineDB';
const DB_VERSION = 1;
const SCHEMES_STORE = 'schemes';
const USER_DATA_STORE = 'userData';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(SCHEMES_STORE)) {
        db.createObjectStore(SCHEMES_STORE, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(USER_DATA_STORE)) {
        db.createObjectStore(USER_DATA_STORE, { keyPath: 'key' });
      }
    };
  });
}

// Generic cache set function
export async function setCachedData<T>(
  storeName: string,
  key: string,
  data: T,
  duration: number = CACHE_DURATION
): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    const cachedData: CachedData<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + duration,
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.put({ id: key, ...cachedData });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    db.close();
  } catch (error) {
    console.error('[Offline Cache] Error setting cached data:', error);
  }
}

// Generic cache get function
export async function getCachedData<T>(
  storeName: string,
  key: string
): Promise<T | null> {
  try {
    const db = await openDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);

    const result = await new Promise<any>((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    db.close();

    if (!result) {
      return null;
    }

    // Check if cache is expired
    if (result.expiresAt < Date.now()) {
      await deleteCachedData(storeName, key);
      return null;
    }

    return result.data as T;
  } catch (error) {
    console.error('[Offline Cache] Error getting cached data:', error);
    return null;
  }
}

// Delete cached data
export async function deleteCachedData(
  storeName: string,
  key: string
): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    db.close();
  } catch (error) {
    console.error('[Offline Cache] Error deleting cached data:', error);
  }
}

// Clear all cached data
export async function clearAllCache(): Promise<void> {
  try {
    const db = await openDB();
    const stores = [SCHEMES_STORE, USER_DATA_STORE];

    for (const storeName of stores) {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    db.close();
    console.log('[Offline Cache] All cache cleared');
  } catch (error) {
    console.error('[Offline Cache] Error clearing cache:', error);
  }
}

// Scheme-specific caching functions
export async function cacheSchemes(schemes: any[]): Promise<void> {
  await setCachedData(SCHEMES_STORE, 'all-schemes', schemes);
}

export async function getCachedSchemes(): Promise<any[] | null> {
  return await getCachedData(SCHEMES_STORE, 'all-schemes');
}

// User data caching functions
export async function cacheUserData(key: string, data: any): Promise<void> {
  await setCachedData(USER_DATA_STORE, key, data);
}

export async function getCachedUserData(key: string): Promise<any | null> {
  return await getCachedData(USER_DATA_STORE, key);
}

// Check if data is available offline
export async function isDataAvailableOffline(): Promise<boolean> {
  try {
    const schemes = await getCachedSchemes();
    return schemes !== null && schemes.length > 0;
  } catch (error) {
    return false;
  }
}

// Get cache size (approximate)
export async function getCacheSize(): Promise<number> {
  try {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return estimate.usage || 0;
    }
    return 0;
  } catch (error) {
    console.error('[Offline Cache] Error getting cache size:', error);
    return 0;
  }
}
