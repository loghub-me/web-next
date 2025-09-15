'use client';

import { deleteSeriesReview } from '@/apis/client/series';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';

interface SeriesReviewActionMenuProps {
  seriesId: number;
  review: {
    id: number;
    writer: { id: number };
  };
  queryKeys: (string | number)[][];
}

export default function SeriesReviewActionMenu({ seriesId, review, queryKeys }: Readonly<SeriesReviewActionMenuProps>) {
  const { status, session } = useAuth();
  const queryClient = useQueryClient();

  function onClickDelete() {
    deleteSeriesReview(seriesId, review.id)
      .then(async ({ message }) => {
        toast.success(message);
        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
      })
      .catch(handleError);
  }

  return (
    status === 'authenticated' && (
      <div className="ml-2 flex gap-1">
        {session?.id === review.writer.id && (
          <Button variant={'ghost'} size={'icon'} className="size-6 rounded-full" onClick={onClickDelete}>
            <XIcon className="size-3 text-muted-foreground" />
          </Button>
        )}
      </div>
    )
  );
}
