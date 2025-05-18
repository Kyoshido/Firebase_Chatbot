'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';

interface LanguageSwitcherProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 'language' | 'czech' | 'english'>;
}

export default function LanguageSwitcher({ lang, dictionary }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getLocalizedPath = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale; // Assumes locale is the first segment
    return segments.join('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{dictionary.language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={getLocalizedPath('cs')} prefetch={false} className={lang === 'cs' ? 'font-bold' : ''}>
            {dictionary.czech}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={getLocalizedPath('en')} prefetch={false} className={lang === 'en' ? 'font-bold' : ''}>
            {dictionary.english}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
