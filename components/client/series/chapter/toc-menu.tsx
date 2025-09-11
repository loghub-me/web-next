'use client';

import { useTOC } from '@/hooks/use-toc';
import { Button, ButtonLink } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
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
        {anchors.map(({ slug, text }) => (
          <ButtonLink
            key={slug}
            href={`#${encodeURIComponent(slug)}`}
            size={'sm'}
            variant={activeSlug === slug ? 'secondary' : 'ghost'}
            className="px-2 justify-start"
          >
            {text}
          </ButtonLink>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
