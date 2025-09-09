'use client';

import { Button } from '@ui/button';
import { ChevronRightIcon, LoaderIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export default function ArticleSearchSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button type={'submit'} variant={'ghost'} size={'icon'}>
      {pending ? <LoaderIcon className="animate-spin" /> : <ChevronRightIcon />}
    </Button>
  );
}
