'use client';

import { clientAPI } from '@/apis/client/instance';

const deleteArticle = (articleId: number) => clientAPI.delete(`articles/${articleId}`).json<MessageResponseBody>();

export { deleteArticle };
