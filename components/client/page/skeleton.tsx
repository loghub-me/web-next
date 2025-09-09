import { Skeleton } from '@ui/skeleton';

export default function PageSkeleton({ size = 3 }: Readonly<SkeletonProps>) {
  return (
    <div className="w-full flex justify-center gap-1">
      {Array.from({ length: size }, (_, index) => (
        <Skeleton key={index} className="size-9" />
      ))}
    </div>
  );
}
