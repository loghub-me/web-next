'use client';

import { clientAPI } from '@/apis/client/instance';
import { seriesChapterEditSchema, seriesEditSchema, seriesPostSchema, seriesReviewPostSchema } from '@/schemas/series';
import { z } from 'zod';

const getSeriesForEdit = async (seriesId: number) => clientAPI.get(`series/${seriesId}/edit`).json<SeriesForEdit>();

const postSeries = (json: z.infer<typeof seriesPostSchema>) =>
  clientAPI.post(`series`, { json }).json<RedirectResponseBody>();

const editSeries = (seriesId: number, json: z.infer<typeof seriesEditSchema>) =>
  clientAPI.put(`series/${seriesId}`, { json }).json<RedirectResponseBody>();

const deleteSeries = (seriesId: number) => clientAPI.delete(`series/${seriesId}`).json<MessageResponseBody>();

const getSeriesChapterForEdit = async (seriesId: number, sequence: number) =>
  clientAPI.get(`series/${seriesId}/chapters/${sequence}/edit`).json<SeriesChapterForEdit>();

const createSeriesChapter = (seriesId: number) =>
  clientAPI.post(`series/${seriesId}/chapters`).json<MessageResponseBody>();

const editSeriesChapter = (seriesId: number, sequence: number, json: z.infer<typeof seriesChapterEditSchema>) =>
  clientAPI.put(`series/${seriesId}/chapters/${sequence}`, { json }).json<RedirectResponseBody>();

const deleteSeriesChapter = (seriesId: number, sequence: number) =>
  clientAPI.delete(`series/${seriesId}/chapters/${sequence}`).json<MessageResponseBody>();

const changeChapterSequence = (seriesId: number, sequences: number[]) =>
  clientAPI.patch(`series/${seriesId}/chapters/sequence`, { json: { sequences } }).json<MessageResponseBody>();

const getSeriesReviews = (seriesId: number, page = 1) =>
  clientAPI.get(`series/${seriesId}/reviews`, { searchParams: { page } }).json<Page<SeriesReview>>();

const postSeriesReview = (seriesId: number, json: z.infer<typeof seriesReviewPostSchema>) =>
  clientAPI.post(`series/${seriesId}/reviews`, { json: { ...json } }).json<MethodResponseBody>();

const existsSeriesStar = (seriesId: number) =>
  clientAPI.get(`series/star/${seriesId}`).json<DataResponseBody<boolean>>();

const addSeriesStar = (seriesId: number) => clientAPI.post(`series/star/${seriesId}`).json<MethodResponseBody>();

const removeSeriesStar = (seriesId: number) => clientAPI.delete(`series/star/${seriesId}`).json<MessageResponseBody>();

export {
  getSeriesForEdit,
  postSeries,
  editSeries,
  deleteSeries,
  getSeriesChapterForEdit,
  createSeriesChapter,
  editSeriesChapter,
  deleteSeriesChapter,
  changeChapterSequence,
  getSeriesReviews,
  postSeriesReview,
  existsSeriesStar,
  addSeriesStar,
  removeSeriesStar,
};
