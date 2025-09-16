import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, query, sort } = zodFields;
const { coercedId } = zodFields;
const { title, content, topicSlugs } = zodFields;

const questionSearchSchema = z.object({
  query,
  sort,
  page,
  filter: z.enum(['all', 'open', 'closed', 'solved'], { message: '잘못된 필터입니다.' }).default('all'),
});

const questionPostSchema = z.object({ title, content, topicSlugs });
const questionEditSchema = questionPostSchema;

const questionAnswerPostSchema = z.object({ title, content });
const questionAnswerEditSchema = questionAnswerPostSchema;
const questionAnswerEditPageSchema = z.object({ id: coercedId, answerId: coercedId });

export {
  questionSearchSchema,
  questionPostSchema,
  questionEditSchema,
  questionAnswerPostSchema,
  questionAnswerEditSchema,
  questionAnswerEditPageSchema,
};
