import { serverAPI } from '@/apis/server/instance';
import { articleSearchSchema } from '@/schemas/article';
import { z } from 'zod';

const getArticles = async (searchParams: z.infer<typeof articleSearchSchema>) =>
  serverAPI.get('articles', { searchParams }).json<Page<Article>>();

const getArticleDetail = async (username: string, slug: string) =>
  serverAPI.get(`articles/@${username}/${slug}`).json<ArticleDetail>();

export { getArticles, getArticleDetail };
