'use client';

import type { Persona as PersonaTypeDefinition } from '@/types'; // Renamed to avoid conflict
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crown, Shield, type LucideIcon } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';

interface PersonaSelectorProps {
  personas: Omit<PersonaTypeDefinition, 'name'| 'description'>[]; // Use Omit as name and description are now from dictionary
  dictionary: Dictionary;
  lang: Locale;
}

const iconComponents: Record<PersonaTypeDefinition['iconName'], LucideIcon> = {
  Crown,
  Shield,
};

export default function PersonaSelector({ personas, dictionary, lang }: PersonaSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
      {personas.map((persona) => {
        const IconComponent = iconComponents[persona.iconName];
        if (!IconComponent) {
          console.error(`Icon component for "${persona.iconName}" not found.`);
          return null; 
        }
        const name = dictionary[persona.nameKey as keyof Dictionary] || persona.nameKey;
        const description = dictionary[persona.descriptionKey as keyof Dictionary] || persona.descriptionKey;

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
              <div className="relative w-48 h-48 mb-6 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={persona.image.src}
                  alt={persona.image.alt} // Consider translating alt if it's descriptive
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={persona.image.aiHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Link href={`/${lang}/chat?persona=${persona.slug}`} passHref className="mt-auto w-full">
                <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {(dictionary.chatWith || "Chat with {personaName}").replace('{personaName}', name.split(' ')[0])}
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
