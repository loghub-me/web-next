import { UserLink } from '@/components/client/user';
import StarIcon from '@ui/star-icon';
import Timestamp from '@ui/timestamp';
import { DotIcon } from 'lucide-react';

interface SeriesReviewListItemProps {
  review: SeriesReview;
}

export default function SeriesReviewListItem({ review }: Readonly<SeriesReviewListItemProps>) {
  const { writer, content, rating } = review;

  return (
    <div>
      <div className="flex items-center">
        <UserLink {...writer} variant={'link'} />
        <DotIcon className="text-muted-foreground" />
        <Timestamp {...review} />
        <div className="pl-2.5 flex items-center gap-0.5">
          <StarIcon size={rating} fill={true} className="size-3" />
        </div>
      </div>
      <div className="pl-7.5 space-y-1">
        <p className="leading-6 text-sm">{content}</p>
      </div>
    </div>
  );
}
