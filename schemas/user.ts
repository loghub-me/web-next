import { z } from 'zod';

const username = z.string({ message: '사용자 이름은 문자열이어야 합니다.' }).trim();
const usernameSchema = z.object({ username });
const userDetailSchema = usernameSchema;

export { usernameSchema, userDetailSchema };
