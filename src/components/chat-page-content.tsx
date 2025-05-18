'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatInterface from '@/components/chat-interface';
import type { PersonaType } from '@/types';
import { Crown, Shield } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';

interface PersonaDetails {
  [key: string]: { nameKey: string; Icon: typeof Crown | typeof Shield };
}

const personaDetailsData: PersonaDetails = {
  princess: { nameKey: 'persona.princess.name', Icon: Crown },
  knight: { nameKey: 'persona.knight.name', Icon: Shield },
};

interface ChatPageContentProps {
  dictionary: Dictionary; 
}

export default function ChatPageContent({ dictionary }: ChatPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personaSlug = searchParams.get('persona') as PersonaType | null;
  const [isValidPersona, setIsValidPersona] = useState<boolean | null>(null);

  useEffect(() => {
    if (personaSlug && (personaSlug === 'princess' || personaSlug === 'knight')) {
      setIsValidPersona(true);
    } else {
      setIsValidPersona(false);
      const timer = setTimeout(() => {
         if (!searchParams.get('persona') || (searchParams.get('persona') !== 'princess' && searchParams.get('persona') !== 'knight')) {
            router.push(`/`); // Redirect to root (Czech) home page
         }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [personaSlug, router, searchParams]);

  if (isValidPersona === null) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-muted-foreground">{dictionary?.loadingChat || 'Loading chat...'}</p>
      </div>
    );
  }

  if (!isValidPersona || !personaSlug) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl font-semibold text-destructive">{dictionary?.invalidPersona || 'Invalid Persona Selected'}</p>
        <p className="text-muted-foreground">{dictionary?.redirectingToSelection || 'Redirecting to persona selection...'}</p>
      </div>
    );
  }
  
  const currentPersonaDetails = personaDetailsData[personaSlug];
  const personaNameKey = currentPersonaDetails.nameKey as keyof Dictionary;
  const personaName = (dictionary?.[personaNameKey] as string) || 
                      (currentPersonaDetails.nameKey.split('.').pop() || personaSlug);

  return (
    <ChatInterface 
      personaSlug={personaSlug} 
      personaName={personaName}
      PersonaIcon={currentPersonaDetails.Icon}
      dictionary={dictionary || {}}
    />
  );
}
