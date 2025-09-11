'use client';

import { SeriesSearchQuery, SeriesSearchSort, SeriesSearchSubmit } from '@/components/client/series';
import { seriesSearchSchema } from '@/schemas/series';
import Form from 'next/form';
import { useRef } from 'react';
import { z } from 'zod';

interface SeriesSearchFormProps {
  defaultValues: z.infer<typeof seriesSearchSchema>;
}

export default function SeriesSearchForm({ defaultValues }: Readonly<SeriesSearchFormProps>) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form ref={formRef} action={'/search/series'} className="flex gap-2">
      <SeriesSearchSort defaultValue={defaultValues.sort} formRef={formRef} />
      <SeriesSearchQuery defaultValue={defaultValues.query} />
      <SeriesSearchSubmit />
    </Form>
  );
}
