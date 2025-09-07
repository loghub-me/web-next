'use client';

import { confirmLogin } from '@/apis/client/auth';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { loginConfirmSchema, loginConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@ui/input-otp';
import { LogInIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof loginConfirmSchema>;

interface LoginConfirmSearchParams {
  defaultValues: z.infer<typeof loginConfirmSearchParamsSchema>;
}

export default function LoginConfirmForm({ defaultValues }: Readonly<LoginConfirmSearchParams>) {
  const { registerSession } = useAuth();
  const form = useForm<FormType>({ resolver: zodResolver(loginConfirmSchema), defaultValues });

  function onSubmit(values: FormType) {
    confirmLogin(values)
      .then(({ body, session }) => {
        toast.success(body.message);
        registerSession(session);
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
                <Input placeholder="user@loghub.me" {...field} readOnly={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인증번호</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} className="justify-between" {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <LogInIcon /> 인증번호 확인
        </Button>
      </form>
    </Form>
  );
}
