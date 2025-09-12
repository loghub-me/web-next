'use client';

import { postQuestion } from '@/apis/client/question';
import { TitleFormField, TopicSlugsFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { questionPostSchema } from '@/schemas/question';
import { Button } from '@ui/button';
import { DialogClose } from '@ui/dialog';
import { Form, FormField, FormMessage } from '@ui/form';
import { UploadIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface QuestionPostFormProps {
  form: UseFormReturn<z.infer<typeof questionPostSchema>>;
}

export default function QuestionPostForm({ form }: Readonly<QuestionPostFormProps>) {
  const router = useRouter();
  const [topicSlugs, setTopicSlugs] = useState(new Set<string>());

  function onSubmit(values: z.infer<typeof questionPostSchema>) {
    postQuestion(values)
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
        <TopicSlugsFormField control={form.control} topicSlugs={topicSlugs} setTopicSlugs={setTopicSlugs} />
        <FormField control={form.control} name="content" render={() => <FormMessage />} />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <UploadIcon /> 게시하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
