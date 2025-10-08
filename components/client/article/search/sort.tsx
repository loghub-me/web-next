'use client';

import { ARTICLE_SORT_OPTIONS } from '@/constants/options';
import { articleSearchSchema } from '@/schemas/article';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { useRouter } from 'next/navigation';
import { format } from 'node:url';
import { z } from 'zod';

interface ArticleSearchSortProps {
  defaultValues: z.infer<typeof articleSearchSchema>;
  action: string;
}

export default function ArticleSearchSort({ defaultValues, action }: Readonly<ArticleSearchSortProps>) {
  const router = useRouter();

  function onValueChange(value: string) {
    const href = format({
      pathname: action,
      query: { ...defaultValues, sort: value },
    });
    router.push(href);
  }

  return (
    <Select name={'sort'} defaultValue={defaultValues.sort} onValueChange={onValueChange}>
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
