'use client';

import { clientAPI } from '@/apis/client/instance';
import { questionPostSchema } from '@/schemas/question';
import { z } from 'zod';

const postQuestion = (json: z.infer<typeof questionPostSchema>) =>
  clientAPI.post(`questions`, { json }).json<RedirectResponseBody>();

const deleteQuestion = (questionId: number) => clientAPI.delete(`questions/${questionId}`).json<MessageResponseBody>();

const deleteQuestionAnswer = (questionId: number, answerId: number) =>
  clientAPI.delete(`questions/${questionId}/answers/${answerId}`).json<MessageResponseBody>();

const existsQuestionStar = (questionId: number) =>
  clientAPI.get(`questions/star/${questionId}`).json<DataResponseBody<boolean>>();

const addQuestionStar = (questionId: number) =>
  clientAPI.post(`questions/star/${questionId}`).json<MethodResponseBody>();

const removeQuestionStar = (questionId: number) =>
  clientAPI.delete(`questions/star/${questionId}`).json<MessageResponseBody>();

export { postQuestion, deleteQuestion, deleteQuestionAnswer, existsQuestionStar, addQuestionStar, removeQuestionStar };
