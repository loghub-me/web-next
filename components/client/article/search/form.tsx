'use client';

import { ArticleSearchQuery, ArticleSearchSort, ArticleSearchSubmit } from '@/components/client/article';
import { articleSearchSchema } from '@/schemas/article';
import Form from 'next/form';
import { useRef } from 'react';
import { z } from 'zod';

interface ArticleSearchFormProps {
  defaultValues: z.infer<typeof articleSearchSchema>;
}

export default function ArticleSearchForm({ defaultValues }: Readonly<ArticleSearchFormProps>) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} action={'/search/articles'} className="flex gap-2">
      <ArticleSearchSort defaultValue={defaultValues.sort} formRef={formRef} />
      <ArticleSearchQuery defaultValue={defaultValues.query} />
      <ArticleSearchSubmit />
    </Form>
  );
}
