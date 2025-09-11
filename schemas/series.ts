import { compositeKeySchema } from '@/schemas/common';
import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { page, query, sort } = zodFields;
const { coercedSequence } = zodFields;

const seriesSearchSchema = z.object({
  query,
  sort,
  page,
});
const seriesChapterDetailSchema = compositeKeySchema.extend({ sequence: coercedSequence });

export { seriesSearchSchema, seriesChapterDetailSchema };
