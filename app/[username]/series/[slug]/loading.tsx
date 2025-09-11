import { SeriesDetailAside } from '@/components/server/series';
import { Skeleton } from '@ui/skeleton';

export default function SeriesDetailLoading() {
  return (
    <main className="container mx-auto pt-20 pb-4 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SeriesDetailAside>
          <div className="p-4 space-y-8">
            <div className="flex gap-2">
              <Skeleton className="w-24 h-9" />
              <Skeleton className="ml-auto size-9 rounded-full" />
              <Skeleton className="w-14 h-9 rounded-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="aspect-[3/4]" />
              <Skeleton className="w-1/3 h-7" />
              <Skeleton className="w-2/3 h-5" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="w-14 h-7" />
                <Skeleton className="w-14 h-7" />
              </div>
            </div>
          </div>
        </SeriesDetailAside>
      </div>
    </main>
  );
}
