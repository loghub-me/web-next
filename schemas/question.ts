import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, query, sort } = zodFields;

const questionSearchSchema = z.object({
  query,
  sort,
  page,
  filter: z.enum(['all', 'open', 'closed', 'solved'], { message: '잘못된 필터입니다.' }).default('all'),
});

export { questionSearchSchema };
