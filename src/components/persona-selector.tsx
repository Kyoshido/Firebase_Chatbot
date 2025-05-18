
'use client';

import type { Persona as PersonaTypeDefinition } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crown, Shield, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
// No longer needs getDictionary here if dictionary is passed as prop

interface PersonaSelectorProps {
  personas: Omit<PersonaTypeDefinition, 'name'| 'description'>[];
  dictionary: Dictionary; // Expect dictionary to be passed from parent
}

const iconComponents: Record<PersonaTypeDefinition['iconName'], LucideIcon> = {
  Crown,
  Shield,
};

export default function PersonaSelector({ personas, dictionary }: PersonaSelectorProps) {
  // No longer fetches dictionary internally, expects it as a prop
  if (!dictionary || Object.keys(dictionary).length === 0) {
    // Optional: Add a loading state or render basic version if dictionary isn't ready
    // This case should ideally be handled by the parent passing a valid dictionary.
    return <div>Loading personas...</div>; 
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
      {personas.map((persona) => {
        const IconComponent = iconComponents[persona.iconName];
        if (!IconComponent) {
          console.error(`Icon component for "${persona.iconName}" not found.`);
          return null; 
        }
        const name = (dictionary[persona.nameKey as keyof Dictionary] as string) || persona.nameKey;
        const description = (dictionary[persona.descriptionKey as keyof Dictionary] as string) || persona.descriptionKey;

        return (
          <Card key={persona.slug} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="items-center text-center">
              <div className="mb-4 p-3 bg-accent/20 rounded-full inline-block">
                <IconComponent className="w-12 h-12 text-accent" />
              </div>
              <CardTitle className="text-2xl text-primary">{name}</CardTitle>
              <CardDescription className="text-sm h-16">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center flex-grow">
              <div className="relative w-48 h-96 mb-6 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={persona.image.src}
                  alt={persona.image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={persona.image.aiHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Link href={`/chat?persona=${persona.slug}`} passHref className="mt-auto w-full">
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {((dictionary.chatWith as string) || "Chat with {personaName}").replace('{personaName}', name.split(' ')[0])}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
