'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { InputWithIcon } from '@ui/input';
import { LetterTextIcon } from 'lucide-react';
import { Control, Path } from 'react-hook-form';

interface TitleFormFieldProps<T extends { title: string }> {
  control: Control<T>;
}

export default function TitleFormField<T extends { title: string }>({ control }: TitleFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={'title' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>제목</FormLabel>
          <FormControl>
            <InputWithIcon icon={LetterTextIcon} placeholder="제목을 입력해주세요" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
