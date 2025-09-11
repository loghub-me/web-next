import { z } from 'zod';

const id = z
  .number({ message: '아이디는 숫자여야 합니다.' })
  .int({ message: '아이디는 정수여야 합니다.' })
  .positive({ message: '아이디는 양수여야 합니다.' });
const coercedId = z.coerce
  .number({ message: '아이디는 숫자여야 합니다.' })
  .int({ message: '아이디는 정수여야 합니다.' })
  .positive({ message: '아이디는 양수여야 합니다.' });

const query = z.string({ message: '검색어는 문자열이어야 합니다.' }).trim().default('');
const sort = z
  .enum(['latest', 'oldest', 'relevant', 'trending'], { message: '잘못된 정렬 기준입니다.' })
  .default('latest');
const page = z.coerce
  .number({ message: '페이지 번호는 숫자여야 합니다.' })
  .int({ message: '페이지 번호는 정수여야 합니다.' })
  .positive({ message: '페이지 번호는 양수여야 합니다.' })
  .default(1);
const slug = z.string({ message: '슬러그는 문자열이어야 합니다.' }).trim();

const title = z
  .string({ message: '제목은 문자열이어야 합니다.' })
  .min(2, { message: '제목은 2글자 이상이어야 합니다.' })
  .max(56, { message: '제목은 56글자 이하여야 합니다.' });
const content = z
  .string({ message: '내용은 문자열이어야 합니다.' })
  .min(10, { message: '내용은 10글자 이상이어야 합니다.' })
  .max(8192, { message: '내용은 8192글자 이하여야 합니다.' });
const thumbnailRegex = /^(default|[0-9]+)\/[a-zA-Z0-9_-]+\.webp$/;
const thumbnail = z
  .string({ message: '썸네일의 path는 문자열이어야 합니다.' })
  .regex(thumbnailRegex, { message: '썸네일의 path는 올바른 형식이어야 합니다.' });
const topicSlugs = z
  .array(z.string({ message: '토픽은 문자열이어야 합니다.' }))
  .max(10, { message: '토픽은 최대 10개까지 선택할 수 있습니다.' });

const zodFields = {
  id,
  coercedId,
  query,
  sort,
  page,
  slug,
  title,
  content,
  thumbnail,
  topicSlugs,
};

export default zodFields;
