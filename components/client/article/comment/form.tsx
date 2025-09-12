'use client';

import { postArticleComment } from '@/apis/client/article';
import { UserLink } from '@/components/client/user';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { articleCommentPostSchema } from '@/schemas/article';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Button, ButtonLink } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { Textarea } from '@ui/textarea';
import { MessageSquareIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface ArticleCommentFormProps {
  articleId: number;
  parent?: {
    id: number;
    writer: UserSimple;
  };
  queryKeys: (string | number)[][];
  closeForm?: () => void;
}

export default function ArticleCommentForm({
  articleId,
  parent,
  queryKeys,
  closeForm,
}: Readonly<ArticleCommentFormProps>) {
  const form = useForm<z.infer<typeof articleCommentPostSchema>>({
    resolver: zodResolver(articleCommentPostSchema),
    defaultValues: { content: '' },
  });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  function onSubmit(values: z.infer<typeof articleCommentPostSchema>) {
    postArticleComment(articleId, values, parent?.id)
      .then(async ({ message }) => {
        toast.success(message);
        form.reset();
        closeForm?.();

        await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  if (!session) {
    return (
      <p className="py-2 text-sm text-center text-muted-foreground">
        <ButtonLink href={'/login'} variant={'link'} className="p-0 h-fit">
          로그인
        </ButtonLink>{' '}
        후 댓글을 작성할 수 있습니다.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-2">{!parent && <UserLink {...session} />}</div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="댓글을 작성해주세요!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <MessageSquareIcon /> 작성
        </Button>
      </form>
    </Form>
  );
}
