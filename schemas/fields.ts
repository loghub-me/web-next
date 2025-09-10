import { z } from 'zod';

const id = z
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

const zodFields = {
  id,
  query,
  sort,
  page,
  slug,
};

export default zodFields;
