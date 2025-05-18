import type { LucideIcon } from 'lucide-react';

export type PersonaIconName = 'Crown' | 'Shield';

export interface Persona {
  name: string;
  slug: 'princess' | 'knight';
  description: string;
  iconName: PersonaIconName; // Changed from Icon: LucideIcon
  image: {
    src: string;
    alt: string;
    aiHint: string;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  personaName?: string; // Name of the AI persona
  timestamp: number;
}

export type PersonaType = 'princess' | 'knight';
