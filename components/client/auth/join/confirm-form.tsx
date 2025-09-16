'use client';

import { confirmJoin } from '@/apis/client/auth';
import { EmailFormField, OTPFormField } from '@/components/client/form-field';
import { useAuth } from '@/hooks/use-auth';
import { handleFormError } from '@/lib/error';
import { joinConfirmSchema, joinConfirmSearchParamsSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/button';
import { Form } from '@ui/form';
import { UserPlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof joinConfirmSchema>;

interface JoinConfirmSearchParams {
  defaultValues: z.infer<typeof joinConfirmSearchParamsSchema>;
}

export default function JoinConfirmForm({ defaultValues }: Readonly<JoinConfirmSearchParams>) {
  const { registerSession } = useAuth();
  const form = useForm<FormType>({ resolver: zodResolver(joinConfirmSchema), defaultValues });

  function onSubmit(values: FormType) {
    confirmJoin(values)
      .then(({ body, session }) => {
        toast.success(body.message);
        registerSession(session);
      })
      .catch((error) => handleFormError(error, form.setError));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailFormField control={form.control} />
        <OTPFormField control={form.control} />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <UserPlusIcon /> 인증번호 확인
        </Button>
      </form>
    </Form>
  );
}
