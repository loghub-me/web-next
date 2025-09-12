'use client';

import { clientAPI } from '@/apis/client/instance';

const deleteQuestion = (questionId: number) => clientAPI.delete(`questions/${questionId}`).json<MessageResponseBody>();

const deleteQuestionAnswer = (questionId: number, answerId: number) =>
  clientAPI.delete(`questions/${questionId}/answers/${answerId}`).json<MessageResponseBody>();

export { deleteQuestion, deleteQuestionAnswer };
