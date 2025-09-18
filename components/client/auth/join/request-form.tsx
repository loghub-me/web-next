'use client';

import { requestJoin } from '@/apis/client/auth';
import { EmailFormField } from '@/components/client/form-field';
import { handleFormError } from '@/lib/error';
import { joinRequestSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { UserPlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type FormType = z.infer<typeof joinRequestSchema>;

export default function JoinRequestForm() {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: { email: '', username: '', nickname: '', agreeTerms: false, agreePrivacy: false },
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
        <EmailFormField control={form.control} />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>유저네임</FormLabel>
              <FormControl>
                <Input placeholder="foo" {...field} />
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
                <Input placeholder="bar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={'agreeTerms'}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>이용약관 동의</FormLabel>
                <Badge variant={'outline'} className="px-1" asChild>
                  <Link href={'/legal#terms'} className="text-primary">
                    보기
                  </Link>
                </Badge>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'agreePrivacy'}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>개인정보 처리방침 동의</FormLabel>
                <Badge variant={'outline'} className="px-1" asChild>
                  <Link href={'/legal#privacy'} className="text-primary">
                    보기
                  </Link>
                </Badge>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          <UserPlusIcon /> 회원가입
        </Button>
      </form>
    </Form>
  );
}
