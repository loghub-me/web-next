import zodFields from './fields';
import { usernameSchema } from '@/schemas/user';

const { slug } = zodFields;

const compositeKeySchema = usernameSchema.extend({ slug });

export { compositeKeySchema };
