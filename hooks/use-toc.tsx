'use client';

import { useEffect, useState } from 'react';

export function useTOC(anchors: Anchor[]) {
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

  return activeSlug;
}
