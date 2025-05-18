import PersonaSelector from '@/components/persona-selector';
import type { Persona } from '@/types';
import { getDictionary } from '@/lib/dictionaries';

const personasData: Omit<Persona, 'name' | 'description'>[] = [
  {
    nameKey: 'persona.princess.name',
    slug: 'princess',
    descriptionKey: 'persona.princess.description',
    iconName: 'Crown',
    image: {
      src: 'https://placehold.co/300x300.png',
      alt: 'A friendly cartoon princess', 
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
      alt: 'A brave cartoon knight',
      aiHint: 'knight character cartoon',
    },
  },
];

export default async function HomePage() {
  const dictionary = await getDictionary();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2 text-primary">{(dictionary.welcomeToStoryPal as string) || "Welcome!"}</h1>
      <p className="text-xl text-muted-foreground mb-12">{(dictionary.chooseFriend as string) || "Choose a friend:"}</p>
      <PersonaSelector personas={personasData} dictionary={dictionary} />
    </div>
  );
}
