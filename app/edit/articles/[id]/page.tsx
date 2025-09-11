'use client';

import { getArticleForEdit } from '@/apis/client/article';
import { ArticleEditDialog, ArticleEditForm } from '@/components/client/article';
import { MarkdownEditor } from '@/components/client/markdown';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { parseObject } from '@/lib/parse';
import { articleEditSchema } from '@/schemas/article';
import { idSchema } from '@/schemas/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import type EasyMDE from 'easymde';
import { HTTPError } from 'ky';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ArticleEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = parseObject(params, idSchema);
  const { status } = useAuth();
  const { data: article, error } = useQuery({
    queryKey: ['getArticleForEdit', id],
    queryFn: () => getArticleForEdit(id),
    enabled: status === 'authenticated',
    retry: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    async function onError(error: Error) {
      if (!(error instanceof HTTPError)) {
        toast.error(ErrorMessage.UNKNOWN);
        router.push('/');
        return;
      }

      const body = await error.response.json<ErrorResponseBody>();
      switch (error.response.status) {
        case 401:
          toast.error(body.message);
          router.replace('/login');
          break;
        case 403:
          toast.error(body.message);
          router.replace('/');
          break;
        case 404:
          toast.error(body.message);
          router.replace('/search/articles');
          break;
      }
    }

    if (error) {
      onError(error).catch(console.error);
    }
  }, [router, error]);

  return <main className="max-h-screen h-screen pt-16">{article && <ArticleEditor defaultValues={article} />}</main>;
}

interface ArticleEditorProps {
  defaultValues: ArticleForEdit;
}

function ArticleEditor({ defaultValues }: Readonly<ArticleEditorProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof articleEditSchema>>({ resolver: zodResolver(articleEditSchema), defaultValues });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      form.setValue('content', easyMDERef.current?.value() || '');
    }
  }

  return (
    <MarkdownEditor title={`[수정] ${defaultValues.title}`} ref={easyMDERef} defaultValue={defaultValues.content}>
      <ArticleEditDialog onOpenChange={onDialogOpenChange}>
        <ArticleEditForm id={defaultValues.id} form={form} />
      </ArticleEditDialog>
    </MarkdownEditor>
  );
}
