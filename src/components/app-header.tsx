import Link from 'next/link';
import { MessagesSquare, ToyBrick } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <ToyBrick className="w-8 h-8 text-accent" />
          <span>StoryPal Chat</span>
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
