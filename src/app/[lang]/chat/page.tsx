
import ChatPageContent from '@/components/chat-page-content';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Locale } from '@/types/i18n';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';
import type { Metadata } from 'next';

function ChatLoadingSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-2xl mx-auto">
      <Skeleton className="h-12 w-1/2 mb-4" />
      <div className="flex-grow space-y-4 overflow-y-auto p-4 border rounded-lg">
        <div className="flex justify-start">
          <Skeleton className="h-16 w-3/4 rounded-lg" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-12 w-1/2 rounded-lg" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-20 w-4/5 rounded-lg" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}

interface ChatPageProps {
  params: { lang: Locale };
}

export async function generateMetadata({ params: { lang } }: ChatPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary?.appTitle || 'StoryPal Chat'} - Chat`, 
  };
}

export default async function ChatPage({ params: { lang } }: ChatPageProps) {
  const dictionary = await getDictionary(lang);
  return (
    <Suspense fallback={<ChatLoadingSkeleton />}>
      <ChatPageContent lang={lang} dictionary={dictionary} />
    </Suspense>
  );
}
