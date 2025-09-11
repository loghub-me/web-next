'use client';

import { clientAPI } from '@/apis/client/instance';
import { seriesReviewPostSchema } from '@/schemas/series';
import { z } from 'zod';

const deleteSeries = (seriesId: number) => clientAPI.delete(`series/${seriesId}`).json<MessageResponseBody>();

const getSeriesReviews = (seriesId: number, page = 1) =>
  clientAPI.get(`series/${seriesId}/reviews`, { searchParams: { page } }).json<Page<SeriesReview>>();

const postSeriesReview = (seriesId: number, json: z.infer<typeof seriesReviewPostSchema>) =>
  clientAPI.post(`series/${seriesId}/reviews`, { json: { ...json } }).json<MethodResponseBody>();

export { deleteSeries, getSeriesReviews, postSeriesReview };
