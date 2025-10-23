'use client';

import { MarkdownEditor } from '@/components/client/markdown';
import { QuestionPostDialog, QuestionPostForm } from '@/components/client/question';
import { questionPostSchema } from '@/schemas/question';
import { zodResolver } from '@hookform/resolvers/zod';
import type EasyMDE from 'easymde';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function QuestionPostPage() {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionPostSchema>>({
    resolver: zodResolver(questionPostSchema),
    defaultValues: { title: '', content: '', topicSlugs: [] },
  });

  function onDialogOpenChange(open: boolean) {
    if (open) {
      const title = form.getValues('title');
      const content = easyMDERef.current?.value() || '';
      if (!title) {
        const firstLine = content.split('\n')[0] || '';
        form.setValue('title', firstLine.replace(/^#+\s*/, '').trim());
      }
      form.setValue('content', content);
    }
  }

  return (
    <main className="max-h-screen h-screen pt-16">
      <MarkdownEditor title="질문 작성" ref={easyMDERef}>
        <QuestionPostDialog onOpenChange={onDialogOpenChange}>
          <QuestionPostForm form={form} />
        </QuestionPostDialog>
      </MarkdownEditor>
    </main>
  );
}
