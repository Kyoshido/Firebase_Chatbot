import 'server-only';
import type { Locale } from '@/types/i18n';

// We enumerate all dictionaries here for better linting and typescript support
const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  cs: () => import('@/locales/cs.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const load = dictionaries[locale] || dictionaries.cs; // Fallback to Czech
  return load();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
