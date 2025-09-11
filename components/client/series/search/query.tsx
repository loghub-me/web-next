'use client';

import { InputWithIcon } from '@ui/input';
import { SearchIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface SeriesSearchSubmitProps {
  defaultValue: string;
}

export default function SeriesSearchQuery({ defaultValue }: Readonly<SeriesSearchSubmitProps>) {
  const { pending } = useFormStatus();

  return (
    <InputWithIcon
      type={'text'}
      name={'query'}
      icon={SearchIcon}
      placeholder={'검색어를 입력해주세요...'}
      defaultValue={defaultValue}
      disabled={pending}
    />
  );
}
