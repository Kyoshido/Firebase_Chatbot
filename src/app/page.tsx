import PersonaSelector from '@/components/persona-selector';
import type { Persona } from '@/types';
// Removed: import { Crown, Shield } from 'lucide-react';

const personas: Persona[] = [
  {
    name: 'Princess Amalia',
    slug: 'princess',
    description: 'Chat with a kind and adventurous princess from a magical kingdom!',
    iconName: 'Crown', // Changed from Icon: Crown
    image: {
      src: 'https://placehold.co/300x300.png',
      alt: 'A friendly cartoon princess',
      aiHint: 'princess character cartoon',
    },
  },
  {
    name: 'Sir Reginald the Brave',
    slug: 'knight',
    description: 'Embark on exciting quests and share brave tales with a noble knight!',
    iconName: 'Shield', // Changed from Icon: Shield
    image: {
      src: 'https://placehold.co/300x300.png',
      alt: 'A brave cartoon knight',
      aiHint: 'knight character cartoon',
    },
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2 text-primary">Welcome to StoryPal Chat!</h1>
      <p className="text-xl text-muted-foreground mb-12">Choose a friend to talk to:</p>
      <PersonaSelector personas={personas} />
    </div>
  );
}
