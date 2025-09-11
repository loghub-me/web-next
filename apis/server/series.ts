import { serverAPI } from '@/apis/server/instance';
import { seriesSearchSchema } from '@/schemas/series';
import { z } from 'zod';

const getSeries = async (searchParams: z.infer<typeof seriesSearchSchema>) =>
  serverAPI.get('series', { searchParams }).json<Page<Series>>();

export { getSeries };
