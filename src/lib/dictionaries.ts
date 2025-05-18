
import 'server-only';

// Define a base dictionary type.
export type BaseDictionary = { [key: string]: string | BaseDictionary | undefined };

const loadCzechDictionary = async (): Promise<BaseDictionary> => {
  try {
    // Dynamically import the cs.json file.
    const module = await import('@/locales/cs.json');
    
    // Check if module and module.default are valid objects with content
    if (module && module.default && typeof module.default === 'object' && Object.keys(module.default).length > 0) {
      return module.default as BaseDictionary;
    } else {
      console.error(`Czech dictionary (cs.json) is missing, empty, or module.default is not a non-empty object. Loaded module content:`, module ? module.default : 'module is undefined');
      return {}; // Return empty object to prevent 'dictionary' being undefined
    }
  } catch (error) {
    console.error(`Error importing Czech dictionary (cs.json):`, error);
    return {}; // Fallback on import error
  }
};

// Simple in-memory cache for the Czech dictionary - only for production
let czechDictionaryProductionCache: BaseDictionary | null = null;

export const getDictionary = async (): Promise<BaseDictionary> => {
  if (process.env.NODE_ENV === 'development') {
    // In development, always reload to try and pick up JSON changes.
    // Bypass the cache entirely.
    console.log('DEV MODE: Forcing reload of Czech dictionary from cs.json');
    return await loadCzechDictionary();
  }

  // In production, use the cache.
  if (czechDictionaryProductionCache && Object.keys(czechDictionaryProductionCache).length > 0) {
    return czechDictionaryProductionCache;
  }

  const dict = await loadCzechDictionary();
  czechDictionaryProductionCache = dict; // Cache for production
  return dict;
};

// Dictionary type will now be BaseDictionary, which is at least an empty object.
export type Dictionary = BaseDictionary;

