import { TopicBadge } from '@/components/client/topic';
import { UserInline } from '@/components/client/user';
import { InteractiveThumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';
import Link from 'next/link';

interface SeriesListItemProps {
  series: Series;
}

export default function SeriesListItem({ series }: Readonly<SeriesListItemProps>) {
  const { slug, title, thumbnail, topics, writer } = series;
  const href = `/${writer.username}/series/${slug}`;

  return (
    <Link href={href} className="p-1 h-full group flex flex-col gap-2 rounded-xl">
      <InteractiveThumbnail aspect={'3:4'} src={thumbnail} alt={title} width={320} height={426} />
      <h3 className="font-medium line-clamp-2 transition-colors group-hover:text-accent-foreground/50">{title}</h3>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="mt-auto flex items-center gap-2 justify-between">
        <UserInline {...writer} />
        <Timestamp {...series} />
      </div>
    </Link>
  );
}
