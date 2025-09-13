import { TopicLink } from '@/components/client/topic';
import { UserInline } from '@/components/client/user';
import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import Timestamp from '@ui/timestamp';
import { MessagesSquareIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

interface QuestionListItemProps {
  question: Question;
}

export default function QuestionListItem({ question }: Readonly<QuestionListItemProps>) {
  const { slug, title, topics, status, stats, writer } = question;
  const href = `/questions/${writer.username}/${slug}`;
  const { icon: StatusIcon, color: statusColor } = QUESTION_STATUS_OPTIONS[status];

  return (
    <div className="flex gap-2 p-4 border-b last:border-b-0">
      <StatusIcon className={cn('mt-1 size-5', statusColor)} />
      <div className="flex-1 space-y-1.5">
        <h3 className="font-medium line-clamp-2">
          <Link href={href} className="mr-2 transition-colors hover:text-accent-foreground/50">
            {title}
          </Link>
          <Badge variant={'muted'} className="px-1">
            <MessagesSquareIcon /> {stats.answerCount}
          </Badge>
          <Badge variant={'muted'} className="px-1">
            <StarIcon /> {stats.starCount}
          </Badge>
        </h3>
        {topics.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {topics.map((topic) => (
              <TopicLink key={topic.slug} topic={topic} />
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center gap-2 justify-between">
          <UserInline {...writer} />
          <Timestamp {...question} />
        </div>
      </div>
    </div>
  );
}
