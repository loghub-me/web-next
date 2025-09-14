import { Skeleton } from '@ui/skeleton';

export default function UserActivityListSkeleton({ size = 4 }: Readonly<SkeletonProps>) {
  return Array.from({ length: size }, (_, index) => (
    <div key={index} className="p-4 flex flex-row gap-2">
      <Skeleton className="mt-1 size-5" />
      <Skeleton className="w-1/3 h-6" />
      <Skeleton className="ml-auto w-12 h-5" />
    </div>
  ));
}
