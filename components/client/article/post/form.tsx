'use client';

import { postArticle } from '@/apis/client/article';
import { ThumbnailFormField, TitleFormField, TopicSlugsFormField } from '@/components/client/form-field';
import { getTopicSetBySlugs } from '@/constants/topics';
import { handleFormError } from '@/lib/error';
import { articlePostSchema } from '@/schemas/article';
import { Button } from '@ui/button';
import { DialogClose } from '@ui/dialog';
import { Form, FormField, FormMessage } from '@ui/form';
import { UploadIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ArticlePostFormProps {
  form: UseFormReturn<z.infer<typeof articlePostSchema>>;
}

export default function ArticlePostForm({ form }: Readonly<ArticlePostFormProps>) {
  const router = useRouter();
  const [topics, setTopics] = useState<Set<Topic>>(getTopicSetBySlugs(form.getValues('topicSlugs')));

  function onSubmit(values: z.infer<typeof articlePostSchema>) {
    postArticle(values)
      .then(({ pathname, message }) => {
        toast.success(message);
        router.push(pathname);
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  useEffect(() => {
    form.setValue(
      'topicSlugs',
      [...topics.values()].map((topic) => topic.slug)
    );
  }, [topics]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TitleFormField control={form.control} />
        <ThumbnailFormField
          control={form.control}
          setValue={(value) => form.setValue('thumbnail', value)}
          aspect={'16:9'}
          width={640}
          height={360}
        />
        <TopicSlugsFormField control={form.control} topics={topics} setTopics={setTopics} />
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
