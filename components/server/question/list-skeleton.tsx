import { Skeleton } from '@ui/skeleton';

export default function QuestionListSkeleton({ size = 4 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="flex gap-2 p-4 border-b last:border-b-0">
      <Skeleton className="mt-1 size-5" />
      <div className="flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="w-1/3 h-6" />
          <Skeleton className="w-12 h-5" />
          <Skeleton className="w-12 h-5" />
        </div>
        <div className="flex flex-wrap gap-1">
          <Skeleton className="w-12 h-7" />
          <Skeleton className="w-12 h-7" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="ml-auto w-8 h-4" />
        </div>
      </div>
    </div>
  ));
}
