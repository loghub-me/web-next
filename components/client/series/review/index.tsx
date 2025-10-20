'use client';

import { getSeriesReviews } from '@/apis/client/series';
import { PageSkeleton, PageStateNav } from '@/components/client/page';
import {
  SeriesReviewForm,
  SeriesReviewList,
  SeriesReviewListItem,
  SeriesReviewListSkeleton,
} from '@/components/client/series';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@ui/card';
import ListEmpty from '@ui/list-empty';
import { useState } from 'react';

interface SeriesReviewsProps {
  id: number;
}

export default function SeriesReviews({ id: seriesId }: Readonly<SeriesReviewsProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsQueryKey = ['getSeriesReviews', seriesId, currentPage];
  const { data: reviews, status } = useQuery({
    queryKey: reviewsQueryKey,
    queryFn: () => getSeriesReviews(seriesId, currentPage),
  });

  return (
    <Card>
      <CardHeader className="pb-4 border-b">
        <SeriesReviewForm seriesId={seriesId} queryKey={reviewsQueryKey} />
      </CardHeader>
      <CardContent>
        <SeriesReviewList>
          {status === 'pending' && <SeriesReviewListSkeleton />}
          {reviews?.page.totalPages === 0 && (
            <ListEmpty message={'아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!'} />
          )}
          {reviews?.content.map((review) => (
            <SeriesReviewListItem
              key={review.id}
              seriesId={seriesId}
              review={review}
              reviewsQueryKey={reviewsQueryKey}
            />
          ))}

          {status === 'pending' && <PageSkeleton />}
          {reviews && (
            <PageStateNav
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={reviews.page.totalPages}
            />
          )}
        </SeriesReviewList>
      </CardContent>
    </Card>
  );
}
