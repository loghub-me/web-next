'use client';

import { ErrorMessage } from '@/constants/messages';
import { HTTPError } from 'ky';
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

type ErrorResponseBody<K extends string = string> = {
  message?: string;
  fieldErrors?: Partial<Record<K, string>>;
};

export async function handleFormError<TFieldValues extends FieldValues>(
  error: Error,
  setError: UseFormSetError<TFieldValues>
) {
  if (!(error instanceof HTTPError)) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const body = await error.response.json<ErrorResponseBody>();
  if (body.fieldErrors) {
    for (const [field, message] of Object.entries(body.fieldErrors)) {
      setError(field as FieldPath<TFieldValues>, { message });
    }
    return;
  }

  toast.error(body.message);
}

export async function handleError(error: Error) {
  if (!(error instanceof HTTPError)) {
    toast.error(ErrorMessage.UNKNOWN);
    return;
  }

  const body = await error.response.json<ErrorResponseBody>();
  if (body.message) {
    toast.error(body.message);
    return;
  }

  toast.error(ErrorMessage.UNKNOWN);
}
