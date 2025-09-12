'use client';

import {
  QuestionSearchFilter,
  QuestionSearchQuery,
  QuestionSearchSort,
  QuestionSearchSubmit,
} from '@/components/client/question';
import { questionSearchSchema } from '@/schemas/question';
import Form from 'next/form';
import { useRef } from 'react';
import { z } from 'zod';

interface QuestionSearchFormProps {
  defaultValues: z.infer<typeof questionSearchSchema>;
}

export default function QuestionSearchForm({ defaultValues }: Readonly<QuestionSearchFormProps>) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} action={'/search/questions'} className="space-y-3">
      <div className="flex gap-2">
        <QuestionSearchSort defaultValue={defaultValues.sort} formRef={formRef} />
        <QuestionSearchQuery defaultValue={defaultValues.query} />
        <QuestionSearchSubmit />
      </div>
      <QuestionSearchFilter defaultValues={defaultValues} />
    </Form>
  );
}
