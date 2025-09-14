'use client';

import { updateSelfUsername } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { settingUsernameUpdateSchema } from '@/schemas/setting';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { UserPenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SettingUsernameFormProps {
  username: string;
  closeDialog: () => void;
}

export default function SettingUsernameForm({ username, closeDialog }: Readonly<SettingUsernameFormProps>) {
  const { session, registerSession } = useAuth();
  const form = useForm<z.infer<typeof settingUsernameUpdateSchema>>({
    resolver: zodResolver(settingUsernameUpdateSchema),
    defaultValues: { oldUsername: '', newUsername: '' },
  });

  function onSubmit(values: z.infer<typeof settingUsernameUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    if (values.oldUsername !== username) {
      form.setError('oldUsername', { message: '현재 유저네임이 일치하지 않습니다.' });
      return;
    }

    updateSelfUsername(values)
      .then(({ message }) => {
        toast.success(message);
        form.reset();
        registerSession({ ...session, username: values.newUsername });
        closeDialog();
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <FormField
          control={form.control}
          name={'oldUsername'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이전 닉네임</FormLabel>
              <FormControl>
                <Input type={'text'} placeholder="이전 닉네임을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'newUsername'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 닉네임</FormLabel>
              <FormControl>
                <Input type={'text'} placeholder="새로 사용하실 닉네임을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <UserPenIcon /> 닉네임 업데이트
          </Button>
        </div>
      </form>
    </Form>
  );
}
