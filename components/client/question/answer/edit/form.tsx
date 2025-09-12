'use client';

import { editQuestionAnswer } from '@/apis/client/question';
import { TitleFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { questionEditSchema } from '@/schemas/question';
import { Button } from '@ui/button';
import { DialogClose } from '@ui/dialog';
import { Form, FormField, FormMessage } from '@ui/form';
import { PencilIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface QuestionAnswerEditFormProps {
  questionId: number;
  answerId: number;
  form: UseFormReturn<z.infer<typeof questionEditSchema>>;
}

export default function QuestionAnswerEditForm({ questionId, answerId, form }: Readonly<QuestionAnswerEditFormProps>) {
  const router = useRouter();
  const [topicSlugs, setTopicSlugs] = useState(new Set(form.getValues('topicSlugs')));

  function onSubmit(values: z.infer<typeof questionEditSchema>) {
    editQuestionAnswer(questionId, answerId, values)
      .then(({ pathname, message }) => {
        toast.success(message);
        router.push(pathname);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  useEffect(() => {
    form.setValue('topicSlugs', [...topicSlugs]);
  }, [form, topicSlugs]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleFormField control={form.control} />
        <FormField control={form.control} name="content" render={() => <FormMessage />} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <PencilIcon /> 수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
