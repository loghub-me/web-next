'use client';

import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { useEffect, useState } from 'react';

interface ArticleTOCCardProps {
  anchors: Anchor[];
}

export default function ArticleTOCCard({ anchors }: Readonly<ArticleTOCCardProps>) {
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
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="pl-2 text-sm text-muted-foreground">목차</CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col">
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
