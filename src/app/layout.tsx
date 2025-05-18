
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/app-header';
import { cn } from '@/lib/utils';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';
import FooterTextClient from '@/components/footer-text-client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const lang: Locale = 'cs'; // Default to Czech for the root layout
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.appTitle,
    description: dictionary.welcomeToStoryPal, // Using a relevant key from dictionary
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang: Locale = 'cs'; // Default to Czech
  const dictionary = await getDictionary(lang);
  // const currentYear = new Date().getFullYear(); // Moved to client component

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased font-sans')} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <AppHeader lang={lang} dictionary={dictionary} />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="py-4 text-center text-sm text-muted-foreground">
            <FooterTextClient template={dictionary.footerText} placeholderYear={new Date().getFullYear().toString()} />
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
