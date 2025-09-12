'use client';

import { useTOC } from '@/hooks/use-toc';
import { Button, ButtonLink } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import ListEmpty from '@ui/list-empty';
import { ListOrderedIcon } from 'lucide-react';

interface SeriesChapterTOCMenuProps {
  anchors: Anchor[];
}

export default function SeriesChapterTOCMenu({ anchors }: Readonly<SeriesChapterTOCMenuProps>) {
  const activeSlug = useTOC(anchors);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <ListOrderedIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1">
        {anchors.length === 0 && <ListEmpty message={'목차가 없습니다'} />}
        {anchors.map(({ slug, text }) => (
          <ButtonLink
            key={slug}
            href={`#${encodeURIComponent(slug)}`}
            size={'sm'}
            variant={activeSlug === slug ? 'secondary' : 'ghost'}
            className="px-2 py-1.5 min-h-9 h-auto justify-start whitespace-normal"
          >
            {text}
          </ButtonLink>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
