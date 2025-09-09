import { TopicIcon } from '@/components/client/topic';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import Link from 'next/link';

interface TopicBadgeProps {
  topic: Topic;
  linkify?: boolean;
}

export default function TopicBadge({ topic, linkify = false }: Readonly<TopicBadgeProps>) {
  return (
    <Badge
      variant={'outline'}
      className={cn('h-7 rounded-sm p-1 bg-card', linkify && 'transition-colors hover:bg-accent cursor-pointer')}
      asChild={linkify}
    >
      {linkify ? (
        <Link href={`/topics/${topic.slug}`}>
          <TopicIcon {...topic} /> {topic.name}
        </Link>
      ) : (
        <>
          <TopicIcon {...topic} /> {topic.name}
        </>
      )}
    </Badge>
  );
}
