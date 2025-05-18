import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css'; // Adjusted path
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/app-header';
import { cn } from '@/lib/utils';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';

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
  params: { lang: Locale };
}

export async function generateMetadata({ params: { lang } }: RootLayoutProps): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.appTitle,
    description: dictionary.welcomeToStoryPal, // Or a more general description
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
  params: { lang },
}: RootLayoutProps) {
  const dictionary = await getDictionary(lang);
  const currentYear = new Date().getFullYear();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased font-sans')} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <AppHeader lang={lang} dictionary={dictionary} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="py-4 text-center text-sm text-muted-foreground">
            {dictionary.footerText.replace('{year}', currentYear.toString())}
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
