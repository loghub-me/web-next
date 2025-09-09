import { parseRelativeTime } from '@/lib/parse';

interface TimestampProps {
  createdAt: string;
  updatedAt?: string;
}

export default function Timestamp({ createdAt, updatedAt }: Readonly<TimestampProps>) {
  const showUpdatedAt = updatedAt && createdAt !== updatedAt;

  return (
    <span className="text-xs text-muted-foreground font-medium">
      {parseRelativeTime(createdAt)} {showUpdatedAt ? `(수정: ${parseRelativeTime(updatedAt)})` : ''}
    </span>
  );
}
