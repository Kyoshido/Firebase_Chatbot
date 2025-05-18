import ChatPageContent from '@/components/chat-page-content';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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


export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoadingSkeleton />}>
      <ChatPageContent />
    </Suspense>
  );
}
