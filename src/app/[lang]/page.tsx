import PersonaSelector from '@/components/persona-selector';
import type { Persona } from '@/types';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';

const personasData: Omit<Persona, 'name' | 'description'>[] = [
  {
    nameKey: 'persona.princess.name',
    slug: 'princess',
    descriptionKey: 'persona.princess.description',
    iconName: 'Crown',
    image: {
      src: 'https://placehold.co/300x300.png',
      alt: 'A friendly cartoon princess', // Alt text could also be a translation key
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
      alt: 'A brave cartoon knight', // Alt text could also be a translation key
      aiHint: 'knight character cartoon',
    },
  },
];

interface HomePageProps {
  params: { lang: Locale };
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  const dictionary = await getDictionary(lang);

  const translatedPersonas: Persona[] = personasData.map(p => ({
    ...p,
    // name: dictionary[p.nameKey as keyof typeof dictionary] || p.nameKey, //This causes type error
    // description: dictionary[p.descriptionKey as keyof typeof dictionary] || p.descriptionKey, //This causes type error
  }));


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2 text-primary">{dictionary.welcomeToStoryPal}</h1>
      <p className="text-xl text-muted-foreground mb-12">{dictionary.chooseFriend}</p>
      <PersonaSelector personas={personasData} dictionary={dictionary} lang={lang} />
    </div>
  );
}
