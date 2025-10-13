import zodFields from '@/schemas/fields';
import z from 'zod';

const { email, username, nickname } = zodFields;

const otp = z
  .string({ message: '인증번호는 문자열이어야 합니다.' })
  .trim()
  .min(6, '인증번호는 6자리여야 합니다.')
  .max(6, '인증번호는 6자리여야 합니다.');
const token = z
  .string({ message: '토큰은 문자열이어야 합니다.' })
  .trim()
  .min(36, '토큰은 36자리여야 합니다.')
  .max(36, '토큰은 36자리여야 합니다.');

const agree = z.boolean().refine((val) => val === true, { message: '약관에 동의하지 않으면 가입할 수 없습니다.' });

const joinRequestSchema = z.object({
  email,
  username,
  nickname,
  agreeTerms: agree,
  agreePrivacy: agree,
});
const joinConfirmSchema = z.object({ email, otp });
const joinConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

const oauth2JoinConfirmSchema = z.object({ email, username, nickname, token, agreeTerms: agree, agreePrivacy: agree });
const oauth2JoinConfirmSearchParamsSchema = z.object({ email, token });

const loginRequestSchema = z.object({ email });
const loginConfirmSchema = z.object({ email, otp });
const loginConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

export { joinRequestSchema, joinConfirmSchema, joinConfirmSearchParamsSchema };
export { oauth2JoinConfirmSchema, oauth2JoinConfirmSearchParamsSchema };
export { loginRequestSchema, loginConfirmSchema, loginConfirmSearchParamsSchema };
