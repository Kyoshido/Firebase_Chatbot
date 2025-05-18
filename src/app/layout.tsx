import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css'; // Adjusted path
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/app-header';
import { cn } from '@/lib/utils';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import FooterTextClient from '@/components/footer-text-client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary();
  return {
    title: (dictionary.appTitle as string) || 'StoryPal Chat',
    description: (dictionary.welcomeToStoryPal as string) || 'Welcome to StoryPal Chat!',
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  const dictionary = await getDictionary();

  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased font-sans')} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <AppHeader dictionary={dictionary} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="py-4 text-center text-sm text-muted-foreground">
            <FooterTextClient template={dictionary.footerText as string} placeholderYear={new Date().getFullYear().toString()} />
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
