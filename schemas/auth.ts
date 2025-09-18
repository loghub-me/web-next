import zodFields from '@/schemas/fields';
import z from 'zod';

const { email, username, nickname } = zodFields;

const otp = z
  .string({ message: '인증번호는 문자열이어야 합니다.' })
  .trim()
  .min(6, '인증번호는 6자리여야 합니다.')
  .max(6, '인증번호는 6자리여야 합니다.');

const joinRequestSchema = z.object({ email, username, nickname });
const joinConfirmSchema = z.object({ email, otp });
const joinConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

const loginRequestSchema = z.object({ email });
const loginConfirmSchema = z.object({ email, otp });
const loginConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

export { joinRequestSchema, joinConfirmSchema, joinConfirmSearchParamsSchema };
export { loginRequestSchema, loginConfirmSchema, loginConfirmSearchParamsSchema };
