import PersonaSelector from '@/components/persona-selector';
import type { Persona } from '@/types';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';

// Consistent data structure with nameKey and descriptionKey
const personasData: Omit<Persona, 'name' | 'description'>[] = [
  {
    nameKey: 'persona.princess.name',
    slug: 'princess',
    descriptionKey: 'persona.princess.description',
    iconName: 'Crown',
    image: {
      src: 'https://placehold.co/300x300.png',
      alt: 'A friendly cartoon princess', // Consider making this a translation key as well
      aiHint: 'princess character cartoon',
    },
  },
  {
    nameKey: 'persona.knight.name',
    slug: 'knight',
    descriptionKey: 'persona.knight.description',
    iconName: 'Shield',
    image: {
      src: 'https://placehold.co/300x300.png',
      alt: 'A brave cartoon knight', // Consider making this a translation key as well
      aiHint: 'knight character cartoon',
    },
  },
];

export default async function HomePage() {
  const lang: Locale = 'cs'; // Default to Czech for the root page
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2 text-primary">{dictionary.welcomeToStoryPal}</h1>
      <p className="text-xl text-muted-foreground mb-12">{dictionary.chooseFriend}</p>
      <PersonaSelector personas={personasData} dictionary={dictionary} lang={lang} />
    </div>
  );
}
