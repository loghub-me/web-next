'use client';

import { useAuth } from '@/hooks/use-auth';
import { ButtonLink } from '@ui/button';
import { PencilIcon } from 'lucide-react';

interface SeriesChapterEditLinkProps {
  href: string;
  writer: UserDetail;
}

export default function SeriesChapterEditLink({ href, writer }: Readonly<SeriesChapterEditLinkProps>) {
  const { session } = useAuth();

  return (
    session?.id === writer.id && (
      <ButtonLink href={href} size={'icon'}>
        <PencilIcon />
      </ButtonLink>
    )
  );
}
