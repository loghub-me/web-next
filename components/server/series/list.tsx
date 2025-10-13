import { cn } from '@/lib/utils';

interface SeriesListProps {
  children?: React.ReactNode;
  hasAside?: boolean;
}

export default function SeriesList({ children, hasAside = false }: Readonly<SeriesListProps>) {
  return (
    <div
      className={cn(
        'grid  gap-4',
        'grid-cols-2',
        hasAside ? 'lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      )}
    >
      {children}
    </div>
  );
}
