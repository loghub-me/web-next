import { Skeleton } from '@ui/skeleton';

export default function TopicDetailAsideDetail() {
  return (
    <>
      <Skeleton className="size-64 rounded-full" />
      <div className="w-full space-y-1.5">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </>
  );
}
