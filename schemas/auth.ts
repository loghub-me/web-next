import z from 'zod';

const email = z.email('올바른 이메일 형식이 아닙니다.').trim();
const nicknameRegex = /^[a-zA-Z0-9가-힣_]+$/;
const nickname = z
  .string({ message: '닉네임은 문자열이어야 합니다.' })
  .trim()
  .min(2, '닉네임은 2글자 이상이어야 합니다.')
  .max(12, '닉네임은 12글자 이하여야 합니다.')
  .regex(nicknameRegex, { message: '닉네임은 영문자, 숫자, 한글, 밑줄(_)로만 이루어져야 합니다.' });
const otp = z
  .string({ message: '인증번호는 문자열이어야 합니다.' })
  .trim()
  .min(6, '인증번호는 6자리여야 합니다.')
  .max(6, '인증번호는 6자리여야 합니다.');

const joinRequestSchema = z.object({ email, nickname });
const joinConfirmSchema = z.object({ email, otp });
const joinConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

const loginRequestSchema = z.object({ email });
const loginConfirmSchema = z.object({ email, otp });
const loginConfirmSearchParamsSchema = z.object({ email, otp: otp.optional() });

export { joinRequestSchema, joinConfirmSchema, joinConfirmSearchParamsSchema };
export { loginRequestSchema, loginConfirmSchema, loginConfirmSearchParamsSchema };
