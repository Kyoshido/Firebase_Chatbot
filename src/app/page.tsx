
import PersonaSelector from '@/components/persona-selector';
import type { Persona } from '@/types';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';

const personasData: Omit<Persona, 'name' | 'description'>[] = [
  {
    nameKey: 'persona.princess.name',
    slug: 'princess',
    descriptionKey: 'persona.princess.description',
    iconName: 'Crown',
    image: {
      src: '/images/princess.jpg', // Updated path
      alt: 'Kreslená Zlatovláska', 
      aiHint: 'Zlatovláska kreslená',
    },
  },
  {
    nameKey: 'persona.knight.name',
    slug: 'knight',
    descriptionKey: 'persona.knight.description',
    iconName: 'Shield',
    image: {
      src: '/images/knight.jpg', // Updated path
      alt: 'Kreslený Lancelot',
      aiHint: 'Lancelot kreslený',
    },
  },
];

export default async function HomePage() {
  const dictionary = await getDictionary(); // Defaulting to 'cs'

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2 text-primary">{(dictionary.welcomeToStoryPal as string) || "Vítejte!"}</h1>
      <p className="text-xl text-muted-foreground mb-12">{(dictionary.chooseFriend as string) || "Vyberte si kamaráda:"}</p>
      <PersonaSelector personas={personasData} dictionary={dictionary} />
    </div>
  );
}

