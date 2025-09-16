'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Control, Path } from 'react-hook-form';

interface EmailFormFieldProps<T extends { email: string }> {
  control: Control<T>;
  readOnly?: boolean;
}

export default function EmailFormField<T extends { email: string }>({
  control,
  readOnly = false,
}: EmailFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'email' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input type={'email'} placeholder="foo@loghub.me" readOnly={readOnly} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
