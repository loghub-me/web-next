'use client';

import { ARTICLE_SORT_OPTIONS } from '@/constants/options';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

interface ArticleSearchSortProps {
  defaultValue: ArticleSort;
  formRef: React.RefObject<HTMLFormElement | null>;
}

export default function ArticleSearchSort({ defaultValue, formRef }: Readonly<ArticleSearchSortProps>) {
  return (
    <Select name={'sort'} defaultValue={defaultValue} onValueChange={() => formRef.current?.submit()}>
      <SelectTrigger className="w-38">
        <SelectValue placeholder={'Sort'} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ARTICLE_SORT_OPTIONS).map(([value, { label, icon: Icon }]) => (
          <SelectItem key={value} value={value}>
            <div className={'flex items-center gap-2'}>
              <Icon /> {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
