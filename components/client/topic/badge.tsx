import { TopicIcon } from '@/components/client/topic';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { XIcon } from 'lucide-react';

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
        onClick &&
          'transition-colors text-accent-foreground bg-accent hover:text-muted-foreground hover:bg-muted cursor-pointer'
      )}
      onClick={onClick}
    >
      <TopicIcon {...topic} /> {topic.name}
      {onClick && <XIcon className="text-muted-foreground" />}
    </Badge>
  );
}
