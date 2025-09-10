import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { id, page, query, sort } = zodFields;

const articleSearchSchema = z.object({
  query,
  sort,
  page,
});

const articleCommentPostSchema = z.object({
  content: z
    .string({ message: '댓글 내용은 문자열이어야 합니다.' })
    .trim()
    .min(1, { message: '댓글을 입력해주세요.' })
    .max(255, { message: '댓글은 최대 255자까지 입력할 수 있습니다.' }),
  articleId: id,
  parentId: id.optional(),
});

export { articleSearchSchema, articleCommentPostSchema };
