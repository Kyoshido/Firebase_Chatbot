import Link from 'next/link';
import { ToyBrick } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionaries';

interface AppHeaderProps {
  dictionary: Pick<Dictionary, 'storyPalChat'>;
}

export default function AppHeader({ dictionary }: AppHeaderProps) {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <ToyBrick className="w-8 h-8 text-accent" />
          <span>{dictionary.storyPalChat}</span>
        </Link>
        {/* LanguageSwitcher removed */}
      </div>
    </header>
  );
}
