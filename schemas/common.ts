import zodFields from './fields';
import { usernameSchema } from '@/schemas/user';
import { z } from 'zod';

const { coercedId, slug } = zodFields;

const idSchema = z.object({ id: coercedId });
const compositeKeySchema = usernameSchema.extend({ slug });

export { idSchema, compositeKeySchema };
