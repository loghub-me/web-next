'use client';

import { handleError } from '@/lib/error';
import { defaultInputFileProps, uploadImageFile } from '@/lib/image/upload';
import { FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import Thumbnail from '@ui/thumbnail';
import { useRef } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

interface ThumbnailFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  setValue: (value: string) => void;
  aspect: ThumbnailAspectRatio;
  width: number;
  height: number;
}

export default function ThumbnailFormField<T extends FieldValues>({
  control,
  setValue,
  ...props
}: Readonly<ThumbnailFormFieldProps<T>>) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileProps = {
    ...defaultInputFileProps,
    ref: inputFileRef,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      uploadImageFile(e)
        .then(({ path }) => setValue(path))
        .catch(handleError),
  };

  return (
    <FormField
      control={control}
      name={'thumbnail' as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>썸네일</FormLabel>
          <div className="cursor-pointer" onClick={() => inputFileRef.current?.click()}>
            <Thumbnail src={field.value} alt={'thumbnail'} {...props} />
          </div>
          <input {...inputFileProps} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
