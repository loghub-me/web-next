'use client';

import { InputWithIcon } from '@ui/input';
import { SearchIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface QuestionSearchSubmitProps {
  defaultValue: string;
}

export default function QuestionSearchQuery({ defaultValue }: Readonly<QuestionSearchSubmitProps>) {
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
