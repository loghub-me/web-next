'use client';

import { editQuestionAnswer } from '@/apis/client/question';
import { MarkdownEditor } from '@/components/client/markdown';
import { handleFormError } from '@/lib/error';
import { questionAnswerEditSchema } from '@/schemas/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@ui/form';
import { InputWithIcon } from '@ui/input';
import { LetterTextIcon, PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface QuestionAnswerEditFormProps {
  questionId: number;
  answer: QuestionAnswer;
  closeDialog: () => void;
}

export default function QuestionAnswerEditForm({
  questionId,
  answer,
  closeDialog,
}: Readonly<QuestionAnswerEditFormProps>) {
  const easyMDERef = useRef<EasyMDE>(null);
  const form = useForm<z.infer<typeof questionAnswerEditSchema>>({
    resolver: zodResolver(questionAnswerEditSchema),
    defaultValues: { title: answer.title, content: answer.content.markdown },
  });
  const router = useRouter();

  function onSubmit(values: z.infer<typeof questionAnswerEditSchema>) {
    editQuestionAnswer(questionId, answer.id, values)
      .then(({ message }) => {
        toast.success(message);
        form.reset();
        easyMDERef.current?.value('');
        router.refresh();
        closeDialog();
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-2 border-b">
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputWithIcon icon={LetterTextIcon} placeholder="제목을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
                <FormField control={form.control} name="content" render={() => <FormMessage />} />
              </FormItem>
            )}
          />
        </div>
        <MarkdownEditor title={`[수정] ${answer.title}`} ref={easyMDERef} defaultValue={form.getValues('content')}>
          <Button
            type={'button'}
            onClick={() => {
              form.setValue('content', easyMDERef.current?.value() || '');
              form.handleSubmit(onSubmit)();
            }}
          >
            <PencilIcon /> 답변 수정
          </Button>
        </MarkdownEditor>
      </form>
    </Form>
  );
}
