'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatInterface from '@/components/chat-interface';
import type { PersonaType } } from '@/types';
import { Crown, Shield } from 'lucide-react';

const personaDetails = {
  princess: { name: 'Princess Amalia', Icon: Crown },
  knight: { name: 'Sir Reginald', Icon: Shield },
};

export default function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const personaSlug = searchParams.get('persona') as PersonaType | null;
  const [isValidPersona, setIsValidPersona] = useState<boolean | null>(null);

  useEffect(() => {
    if (personaSlug && (personaSlug === 'princess' || personaSlug === 'knight')) {
      setIsValidPersona(true);
    } else {
      setIsValidPersona(false);
      // Redirect to home if persona is invalid or not present after a short delay
      // This handles cases where searchParams might not be immediately available.
      const timer = setTimeout(() => {
         if (!searchParams.get('persona') || (searchParams.get('persona') !== 'princess' && searchParams.get('persona') !== 'knight')) {
            router.push('/');
         }
      }, 50); // Small delay to allow params to populate
      return () => clearTimeout(timer);
    }
  }, [personaSlug, router, searchParams]);

  if (isValidPersona === null) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  if (!isValidPersona || !personaSlug) {
     // This state should ideally be brief due to the useEffect redirect logic
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl font-semibold text-destructive mb-4">Invalid Persona Selected</p>
        <p className="text-muted-foreground">Redirecting to persona selection...</p>
      </div>
    );
  }
  
  const currentPersona = personaDetails[personaSlug];

  return (
    <ChatInterface 
      personaSlug={personaSlug} 
      personaName={currentPersona.name}
      PersonaIcon={currentPersona.Icon}
    />
  );
}
