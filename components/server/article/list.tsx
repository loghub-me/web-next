import { cn } from '@/lib/utils';

interface ArticleListProps {
  children?: React.ReactNode;
  hasAside?: boolean;
}

export default function ArticleList({ children, hasAside = false }: Readonly<ArticleListProps>) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'sm:grid-cols-1 md:grid-cols-2',
        hasAside ? 'lg:grid-cols-3 xl:grid-cols-4' : 'xl:grid-cols-4'
      )}
    >
      {children}
    </div>
  );
}
