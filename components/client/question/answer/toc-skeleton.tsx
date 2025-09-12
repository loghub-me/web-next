import { Skeleton } from '@ui/skeleton';

export default function QuestionAnswerTOCSkeleton() {
  return (
    <div className="p-4 space-y-2">
      <Skeleton className="w-12 h-5" />
      <Skeleton className="w-2/3 h-5" />
    </div>
  );
}
