import { Skeleton } from '@ui/skeleton';

export default function SeriesDetailLoading() {
  return (
    <div className="p-4 space-y-8">
      <Skeleton className="w-24 h-9" />
      <Skeleton className="w-2/3 h-7" />
    </div>
  );
}
