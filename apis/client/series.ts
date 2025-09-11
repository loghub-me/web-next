'use client';

import { clientAPI } from '@/apis/client/instance';
import { seriesReviewPostSchema } from '@/schemas/series';
import { z } from 'zod';

const deleteSeries = (seriesId: number) => clientAPI.delete(`series/${seriesId}`).json<MessageResponseBody>();

const getSeriesReviews = (seriesId: number, page = 1) =>
  clientAPI.get(`series/${seriesId}/reviews`, { searchParams: { page } }).json<Page<SeriesReview>>();

const postSeriesReview = (seriesId: number, json: z.infer<typeof seriesReviewPostSchema>) =>
  clientAPI.post(`series/${seriesId}/reviews`, { json: { ...json } }).json<MethodResponseBody>();

const existsSeriesStar = (seriesId: number) =>
  clientAPI.get(`series/star/${seriesId}`).json<DataResponseBody<boolean>>();

const addSeriesStar = (seriesId: number) => clientAPI.post(`series/star/${seriesId}`).json<MethodResponseBody>();

const removeSeriesStar = (seriesId: number) => clientAPI.delete(`series/star/${seriesId}`).json<MessageResponseBody>();

export { deleteSeries, getSeriesReviews, postSeriesReview, existsSeriesStar, addSeriesStar, removeSeriesStar };
