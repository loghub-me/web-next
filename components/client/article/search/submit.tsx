'use client';

import { InputGroupButton } from '@ui/input-group';
import { ChevronRightIcon, LoaderIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function ArticleSearchSubmit() {
  const { pending } = useFormStatus();

  return (
    <InputGroupButton type={'submit'} variant={'ghost'} size={'icon-xs'}>
      {pending ? <LoaderIcon className="animate-spin" /> : <ChevronRightIcon />}
    </InputGroupButton>
  );
}
