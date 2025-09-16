'use client';

import { updateSelfProfile } from '@/apis/client/user';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { settingProfileUpdateSchema } from '@/schemas/setting';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { UserPenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface SettingProfileFormProps {
  profile: UserProfile;
}

export default function SettingProfileForm({ profile }: Readonly<SettingProfileFormProps>) {
  const { session, registerSession } = useAuth();
  const form = useForm<z.infer<typeof settingProfileUpdateSchema>>({
    resolver: zodResolver(settingProfileUpdateSchema),
    defaultValues: profile,
  });

  function onSubmit(values: z.infer<typeof settingProfileUpdateSchema>) {
    if (!session) {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }

    updateSelfProfile(values)
      .then(({ message }) => {
        toast.success(message);
        registerSession({ ...session, nickname: values.nickname });
      })
      .catch((err) => handleFormError(err, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        <FormField
          control={form.control}
          name={'nickname'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input type={'text'} placeholder="닉네임을 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'readme'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>README</FormLabel>
              <FormControl>
                <Textarea placeholder="자기소개를 입력해주세요." className="h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <UserPenIcon /> 프로필 업데이트
          </Button>
        </div>
      </form>
    </Form>
  );
}
