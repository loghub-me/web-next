import { SeriesActionMenu, SeriesStarToggle } from '@/components/client/series';
import { UserLink } from '@/components/client/user';
import { CardHeader } from '@ui/card';

interface SeriesDetailHeaderProps {
  id: number;
  slug: string;
  writer: UserDetail;
  stats: { starCount: number };
}

export default function SeriesDetailHeader(props: Readonly<SeriesDetailHeaderProps>) {
  const { writer, id, stats } = props;

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className={'mr-auto'} />
      <SeriesActionMenu {...props} />
      <SeriesStarToggle id={id} starCount={stats.starCount} />
    </CardHeader>
  );
}
