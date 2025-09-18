import { clientAPI } from '@/apis/client/instance';
import { inquirySchema } from '@/schemas/support';
import { z } from 'zod';

const postInquiry = async (json: z.infer<typeof inquirySchema>) => {
  const email = json.email === '' ? null : json.email;
  return clientAPI.post(`support/inquiry`, { json: { ...json, email } }).json<MethodResponseBody>();
};

export { postInquiry };
