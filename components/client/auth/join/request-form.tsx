'use client';

import { requestJoin } from '@/apis/client/auth';
import { handleFormError } from '@/lib/error';
import { joinRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { LogInIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof joinRequestSchema>;

export default function JoinRequestForm() {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: { email: '', nickname: '' },
  });

  function onSubmit(values: FormType) {
    requestJoin(values)
      .then(({ message }) => {
        toast.success(message);
        router.push(`/join/confirm?email=${encodeURIComponent(values.email)}`);
      })
      .catch((error) => handleFormError(error, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="user@loghub.me" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>닉네임</FormLabel>
              <FormControl>
                <Input placeholder="gymynnym" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <LogInIcon /> 로그인
        </Button>
      </form>
    </Form>
  );
}
