import { SeriesReviewActionMenu } from '@/components/client/series';
import { UserLink } from '@/components/client/user';
import StarIcon from '@ui/star-icon';
import Timestamp from '@ui/timestamp';
import { DotIcon } from 'lucide-react';

interface SeriesReviewListItemProps {
  seriesId: number;
  review: SeriesReview;
  reviewsQueryKey: (string | number)[];
}

export default function SeriesReviewListItem({
  seriesId,
  review,
  reviewsQueryKey,
}: Readonly<SeriesReviewListItemProps>) {
  const { writer, content, rating } = review;

  return (
    <div>
      <div className="flex items-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground -ml-1" />
        <Timestamp {...review} />
        <div className="pl-2.5 flex items-center gap-0.5">
          <StarIcon size={rating} fill={true} className="size-3" />
        </div>
        <SeriesReviewActionMenu seriesId={seriesId} review={review} queryKeys={[reviewsQueryKey]} />
      </div>
      <div className="pl-7.5 space-y-1">
        <p className="leading-6 text-sm">{content}</p>
      </div>
    </div>
  );
}
