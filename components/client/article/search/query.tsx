'use client';

import { ArticleSearchSubmit } from '@/components/client/article';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@ui/input-group';
import { SearchIcon } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface ArticleSearchSubmitProps {
  defaultValue: string;
}

export default function ArticleSearchQuery({ defaultValue }: Readonly<ArticleSearchSubmitProps>) {
  const { pending } = useFormStatus();

  return (
    <InputGroup>
      <InputGroupAddon align={'inline-start'}>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        type={'text'}
        name={'query'}
        placeholder={'검색어를 입력해주세요...'}
        defaultValue={defaultValue}
        disabled={pending}
      />
      <InputGroupAddon align={'inline-end'}>
        <ArticleSearchSubmit />
      </InputGroupAddon>
    </InputGroup>
  );
}
