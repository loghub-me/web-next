'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@ui/input-otp';
import { Control, Path } from 'react-hook-form';

interface TitleFormFieldProps<T extends { otp: string }> {
  control: Control<T>;
}

export default function TitleFormField<T extends { otp: string }>({ control }: TitleFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'otp' as Path<T>}
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
  );
}
