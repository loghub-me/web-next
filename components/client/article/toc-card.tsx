'use client';

import { useTOC } from '@/hooks/use-toc';
import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';

interface ArticleTOCCardProps {
  anchors: Anchor[];
}

export default function ArticleTOCCard({ anchors }: Readonly<ArticleTOCCardProps>) {
  const activeSlug = useTOC(anchors);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="pl-2 text-sm text-muted-foreground">목차</CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col gap-0.5">
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
      </CardContent>
    </Card>
  );
}
