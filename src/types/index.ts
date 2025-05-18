import type { LucideIcon } from 'lucide-react';

export type PersonaIconName = 'Crown' | 'Shield';

export interface Persona {
  nameKey: string; // e.g., 'persona.princess.name'
  slug: 'princess' | 'knight';
  descriptionKey: string; // e.g., 'persona.princess.description'
  iconName: PersonaIconName;
  image: {
    src: string;
    alt: string; // This could also be a translation key if needed
    aiHint: string;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  personaName?: string; // Name of the AI persona (will be translated)
  timestamp: number;
}

export type PersonaType = 'princess' | 'knight';
