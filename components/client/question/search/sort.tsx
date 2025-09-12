'use client';

import { QUESTION_SORT_OPTIONS } from '@/constants/options';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

interface QuestionSearchSortProps {
  defaultValue: QuestionSort;
  formRef: React.RefObject<HTMLFormElement | null>;
}

export default function QuestionSearchSort({ defaultValue, formRef }: Readonly<QuestionSearchSortProps>) {
  return (
    <Select name={'sort'} defaultValue={defaultValue} onValueChange={() => formRef.current?.submit()}>
      <SelectTrigger className="w-38">
        <SelectValue placeholder={'Sort'} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(QUESTION_SORT_OPTIONS).map(([value, { label, icon: Icon }]) => (
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
