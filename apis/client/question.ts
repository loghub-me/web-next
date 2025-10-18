'use client';

import { clientAPI } from '@/apis/client/instance';
import { questionAnswerPostSchema, questionEditSchema, questionPostSchema } from '@/schemas/question';
import { z } from 'zod';

const getQuestionAnswerGenerating = async (questionId: number) =>
  clientAPI.get(`questions/${questionId}/answer-generating`).json<DataResponseBody<boolean>>();

const getQuestionForEdit = async (questionId: number) =>
  clientAPI.get(`questions/${questionId}/for-edit`).json<QuestionForEdit>();

const postQuestion = (json: z.infer<typeof questionPostSchema>) =>
  clientAPI.post(`questions`, { json }).json<RedirectResponseBody>();

const editQuestion = (questionId: number, json: z.infer<typeof questionEditSchema>) =>
  clientAPI.put(`questions/${questionId}`, { json }).json<RedirectResponseBody>();

const deleteQuestion = (questionId: number) => clientAPI.delete(`questions/${questionId}`).json<MessageResponseBody>();

const closeQuestion = (questionId: number) =>
  clientAPI.post(`questions/${questionId}/close`).json<RedirectResponseBody>();

const getQuestionAnswerForEdit = async (questionId: number, answerId: number) =>
  clientAPI.get(`questions/${questionId}/answers/${answerId}/for-edit`).json<QuestionAnswerForEdit>();

const postQuestionAnswer = (questionId: number, json: z.infer<typeof questionAnswerPostSchema>) =>
  clientAPI.post(`questions/${questionId}/answers`, { json }).json<RedirectResponseBody>();

const editQuestionAnswer = (questionId: number, answerId: number, json: z.infer<typeof questionAnswerPostSchema>) =>
  clientAPI.put(`questions/${questionId}/answers/${answerId}`, { json }).json<RedirectResponseBody>();

const deleteQuestionAnswer = (questionId: number, answerId: number) =>
  clientAPI.delete(`questions/${questionId}/answers/${answerId}`).json<MessageResponseBody>();

const acceptQuestionAnswer = (questionId: number, answerId: number) =>
  clientAPI.post(`questions/${questionId}/answers/${answerId}/accept`).json<MethodResponseBody>();

const requestGenerateQuestionAnswer = (questionId: number, instruction?: string) =>
  clientAPI.post(`questions/${questionId}/answers/generate`, { json: { instruction } }).json<MessageResponseBody>();

const existsQuestionStar = (questionId: number) =>
  clientAPI.get(`questions/star/${questionId}`).json<DataResponseBody<boolean>>();

const addQuestionStar = (questionId: number) =>
  clientAPI.post(`questions/star/${questionId}`).json<MethodResponseBody>();

const removeQuestionStar = (questionId: number) =>
  clientAPI.delete(`questions/star/${questionId}`).json<MessageResponseBody>();

export {
  getQuestionAnswerGenerating,
  getQuestionForEdit,
  postQuestion,
  editQuestion,
  deleteQuestion,
  closeQuestion,
  getQuestionAnswerForEdit,
  postQuestionAnswer,
  editQuestionAnswer,
  deleteQuestionAnswer,
  acceptQuestionAnswer,
  requestGenerateQuestionAnswer,
  existsQuestionStar,
  addQuestionStar,
  removeQuestionStar,
};
