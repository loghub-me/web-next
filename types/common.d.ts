type SearchParams = { [key: string]: string | string[] | undefined };

interface Page<T> {
  content: T[];
  page: { totalPages: number; totalElements: number };
}

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

interface SkeletonProps {
  size?: number;
}

interface Anchor {
  level: number;
  slug: string;
  text: string;
}

type ThumbnailAspectRatio = '16:9' | '3:4';
