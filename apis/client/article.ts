'use client';

import { clientAPI } from '@/apis/client/instance';
import { articleCommentPostSchema } from '@/schemas/article';
import { z } from 'zod';

const deleteArticle = (articleId: number) => clientAPI.delete(`articles/${articleId}`).json<MessageResponseBody>();

const getArticleComments = (articleId: number, page = 1) =>
  clientAPI.get(`articles/${articleId}/comments`, { searchParams: { page } }).json<Page<ArticleComment>>();

const getArticleCommentReplies = (articleId: number, commentId: number) =>
  clientAPI.get(`articles/${articleId}/comments/${commentId}/replies`).json<ArticleComment[]>();

const postArticleComment = (articleId: number, json: z.infer<typeof articleCommentPostSchema>, parentId?: number) =>
  clientAPI.post(`articles/${articleId}/comments`, { json: { ...json, parentId } }).json<MethodResponseBody>();

export { deleteArticle, getArticleComments, getArticleCommentReplies, postArticleComment };
