import { serverAPI } from '@/apis/server/instance';
import { questionSearchSchema } from '@/schemas/question';
import { z } from 'zod';

const getQuestions = async (searchParams: z.infer<typeof questionSearchSchema>) =>
  serverAPI.get('questions', { searchParams }).json<Page<Question>>();

const getQuestionDetail = async (username: string, slug: string) =>
  serverAPI.get(`questions/@${username}/${slug}`).json<QuestionDetail>();

const getQuestionAnswers = async (questionId: number) =>
  serverAPI.get(`questions/${questionId}/answers`).json<QuestionAnswer[]>();

export { getQuestions, getQuestionDetail, getQuestionAnswers };
