import { TopicIcon } from '@/components/client/topic';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';

interface TopicBadgeProps {
  topic: Topic;
  onClick?: () => void;
}

export default function TopicBadge({ topic, onClick }: Readonly<TopicBadgeProps>) {
  return (
    <Badge
      variant={'outline'}
      className={cn(
        'h-7 rounded-sm p-1 bg-card',
        onClick && 'transition-colors hover:text-accent-foreground hover:bg-accent cursor-pointer'
      )}
      onClick={onClick}
    >
      <TopicIcon {...topic} /> {topic.name}
    </Badge>
  );
}
