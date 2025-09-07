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
  count?: number;
}
