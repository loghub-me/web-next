import zodFields from '@/schemas/fields';
import { z } from 'zod';

const { email, title, content } = zodFields;

const inquirySchema = z.object({
  email: z.union([z.literal(''), email]),
  title,
  content,
});

export { inquirySchema };
