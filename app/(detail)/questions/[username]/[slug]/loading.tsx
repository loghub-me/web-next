import { QuestionDetailAside } from '@/components/server/question';
import { Skeleton } from '@ui/skeleton';

export default function QuestionDetailLoading() {
  return (
    <main className="container mx-auto py-20 space-y-4">
      <div className="p-16 space-y-4">
        <div className="mt-auto flex items-center justify-center gap-2">
          <Skeleton className="w-18 h-9" />
          <Skeleton className="w-9 h-5" />
          <Skeleton className="w-9 h-5" />
        </div>
        <Skeleton className="mx-auto w-2/3 h-8" />
        <div className="mt-auto flex items-center justify-center gap-4">
          <Skeleton className="w-18 h-9" />
          <Skeleton className="size-1.5 rounded-full" />
          <Skeleton className="w-18 h-5" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full min-w-0 space-y-4">
          <div className="p-4 space-y-8">
            <div className="flex gap-2">
              <Skeleton className="w-24 h-9" />
              <Skeleton className="ml-auto size-9 rounded-full" />
              <Skeleton className="w-14 h-9 rounded-full" />
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1">
                <Skeleton className="w-14 h-7" />
                <Skeleton className="w-14 h-7" />
              </div>
              <Skeleton className="w-2/3 h-7" />
            </div>
          </div>
        </div>
        <QuestionDetailAside>
          <div className="p-4 space-y-2">
            <Skeleton className="w-12 h-5" />
            <Skeleton className="w-2/3 h-5" />
          </div>
        </QuestionDetailAside>
      </div>
    </main>
  );
}
