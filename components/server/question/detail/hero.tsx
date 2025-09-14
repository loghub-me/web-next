import { UserLink } from '@/components/client/user';
import { QUESTION_STATUS_OPTIONS } from '@/constants/options';
import { Badge } from '@ui/badge';
import Timestamp from '@ui/timestamp';
import { DotIcon, MessagesSquareIcon, StarIcon } from 'lucide-react';

interface QuestionDetailHeroProps {
  status: QuestionStatus;
  stats: QuestionStats;
  title: string;
  writer: UserDetail;
  createdAt: string;
  updatedAt: string;
}

export default function QuestionDetailHero({
  status,
  stats,
  title,
  writer,
  createdAt,
  updatedAt,
}: Readonly<QuestionDetailHeroProps>) {
  const { label: statusLabel, icon: StatusIcon, color: statusColor } = QUESTION_STATUS_OPTIONS[status];

  return (
    <div className="px-4 py-16 space-y-4">
      <div className="flex justify-center gap-2">
        <Badge size={'lg'} variant={'outline'}>
          <StatusIcon className={statusColor} /> {statusLabel}
        </Badge>
        <Badge variant={'muted'} className="px-1">
          <MessagesSquareIcon /> {stats.answerCount}
        </Badge>
        <Badge variant={'muted'} className="px-1">
          <StarIcon /> {stats.starCount}
        </Badge>
      </div>
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center justify-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground mr-1" />
        <Timestamp createdAt={createdAt} updatedAt={updatedAt} className="text-sm" />
      </div>
    </div>
  );
}
