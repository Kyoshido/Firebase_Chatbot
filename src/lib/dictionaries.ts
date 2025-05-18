
import 'server-only';
import type { Locale } from '@/types/i18n';

// Define a base dictionary type. Consumers should expect keys might be missing if loading fails.
export type BaseDictionary = { [key: string]: string | BaseDictionary | undefined };

const loadDictionaryFile = async (locale: Locale): Promise<BaseDictionary> => {
  let module;
  try {
    if (locale === 'en') {
      module = await import('@/locales/en.json');
    } else if (locale === 'cs') {
      module = await import('@/locales/cs.json');
    } else {
      // Fallback to default locale if an unknown locale is passed.
      console.warn(`Unsupported locale: ${locale}, falling back to 'cs'`);
      module = await import('@/locales/cs.json');
    }

    // Check if module and module.default are valid objects with content
    if (module && module.default && typeof module.default === 'object' && Object.keys(module.default).length > 0) {
      return module.default as BaseDictionary;
    } else {
      console.error(`Dictionary for locale '${locale}' is missing, empty, or module.default is not a non-empty object. Loaded module content:`, module ? module.default : 'module is undefined');
      return {}; // Return empty object to prevent 'dictionary' being undefined
    }
  } catch (error) {
    console.error(`Error importing dictionary for locale ${locale}:`, error);
    return {}; // Fallback on import error
  }
};

// Simple in-memory cache for dictionaries
const dictionaryCache = new Map<Locale, BaseDictionary>();

export const getDictionary = async (locale: Locale): Promise<BaseDictionary> => {
  if (dictionaryCache.has(locale)) {
    const cachedDict = dictionaryCache.get(locale);
    // Ensure the cached dictionary is not just an empty object from a previous failure, unless that's all that loaded
    if (cachedDict) { // removed Object.keys().length > 0 check to return {} if that's what was cached
        return cachedDict;
    }
  }

  const dict = await loadDictionaryFile(locale);
  dictionaryCache.set(locale, dict); // Cache whatever is loaded, even an empty object
  return dict;
};

// Dictionary type will now be BaseDictionary, which is at least an empty object.
export type Dictionary = BaseDictionary;
