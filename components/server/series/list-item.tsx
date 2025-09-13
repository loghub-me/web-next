import { TopicLink } from '@/components/client/topic';
import { UserLink } from '@/components/client/user';
import { InteractiveThumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';
import Link from 'next/link';

interface SeriesListItemProps {
  series: Series;
}

export default function SeriesListItem({ series }: Readonly<SeriesListItemProps>) {
  const { slug, title, thumbnail, topics, writer } = series;
  const href = `/series/${writer.username}/${slug}`;

  return (
    <div className="p-1 h-full flex flex-col gap-1.5">
      <Link href={href} className="group space-y-1.5">
        <InteractiveThumbnail aspect={'3:4'} src={thumbnail} alt={title} width={640} height={360} />
        <h3 className="font-medium line-clamp-2 transition-colors group-hover:text-accent-foreground/50">{title}</h3>
      </Link>
      {topics.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {topics.map((topic) => (
            <TopicLink key={topic.slug} topic={topic} />
          ))}
        </div>
      )}
      <div className="pt-2 relative mt-auto flex items-center gap-2 justify-end">
        <UserLink {...writer} className="absolute -left-1.5 -bottom-1.5" />
        <Timestamp {...series} />
      </div>
    </div>
  );
}
