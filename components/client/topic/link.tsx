import { TopicIcon } from '@/components/client/topic';
import { Badge } from '@ui/badge';
import Link from 'next/link';

interface TopicLinkProps {
  topic: Topic;
}

export default function TopicLink({ topic }: Readonly<TopicLinkProps>) {
  return (
    <Badge
      variant={'outline'}
      className={
        'h-7 rounded-sm p-1 bg-card transition-colors hover:text-accent-foreground hover:bg-accent cursor-pointer'
      }
      asChild
    >
      <Link href={`/topics/${topic.slug}`} prefetch={false}>
        <TopicIcon {...topic} /> {topic.name}
      </Link>
    </Badge>
  );
}
