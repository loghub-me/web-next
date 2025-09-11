'use client';

import { Button, ButtonLink } from '@ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { ListOrderedIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SeriesChapterTOCMenuProps {
  anchors: Anchor[];
}

export default function SeriesChapterTOCMenu({ anchors }: Readonly<SeriesChapterTOCMenuProps>) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const slug = entry.target.getAttribute('id');
          setActiveSlug((prev) => (entry.isIntersecting && slug ? slug : prev));
        }),
      { root: null, rootMargin: '0px 0px -92% 0px', threshold: 0 }
    );

    anchors.forEach((anchor) => {
      const element = document.getElementById(anchor.slug) as HTMLHeadingElement | null;
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [anchors]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} className="ml-auto">
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
