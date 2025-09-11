import { serverAPI } from '@/apis/server/instance';
import { seriesSearchSchema } from '@/schemas/series';
import { z } from 'zod';

const getSeries = async (searchParams: z.infer<typeof seriesSearchSchema>) =>
  serverAPI.get('series', { searchParams }).json<Page<Series>>();

const getSeriesDetail = async (username: string, slug: string) =>
  serverAPI.get(`series/@${username}/${slug}`).json<SeriesDetail>();

const getSeriesChapterDetail = async (seriesId: number, sequence: number) =>
  serverAPI.get(`series/${seriesId}/chapters/${sequence}`).json<SeriesChapterDetail>();

export { getSeries, getSeriesDetail, getSeriesChapterDetail };
