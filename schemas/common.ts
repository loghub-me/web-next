import zodFields from './fields';
import { usernameSchema } from '@/schemas/user';
import { z } from 'zod';

const { id, slug } = zodFields;

const idSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(id),
});
const compositeKeySchema = usernameSchema.extend({ slug });

export { idSchema, compositeKeySchema };
