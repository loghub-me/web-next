import { serverAPI } from '@/apis/server/instance';
import { questionSearchSchema } from '@/schemas/question';
import { z } from 'zod';

const getQuestions = async (searchParams: z.infer<typeof questionSearchSchema>) =>
  serverAPI.get('questions', { searchParams }).json<Page<Question>>();

export { getQuestions };
