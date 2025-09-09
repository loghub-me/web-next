import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, query, sort } = zodFields;

const articleSearchSchema = z.object({
  query,
  sort,
  page,
});

export { articleSearchSchema };
