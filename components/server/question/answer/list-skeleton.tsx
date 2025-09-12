import { Skeleton } from '@ui/skeleton';

export default function QuestionAnswerListSkeleton({ size = 2 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="p-4 space-y-8">
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
  ));
}
