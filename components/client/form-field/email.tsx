'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Control, Path } from 'react-hook-form';

interface TitleFormFieldProps<T extends { email: string }> {
  control: Control<T>;
}

export default function TitleFormField<T extends { email: string }>({ control }: TitleFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'email' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input type={'email'} placeholder="user@loghub.me" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
