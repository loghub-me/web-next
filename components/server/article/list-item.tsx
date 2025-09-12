import { TopicBadge } from '@/components/client/topic';
import { UserInline } from '@/components/client/user';
import { InteractiveThumbnail } from '@ui/thumbnail';
import Timestamp from '@ui/timestamp';
import Link from 'next/link';

interface ArticleListItemProps {
  article: Article;
}

export default function ArticleListItem({ article }: Readonly<ArticleListItemProps>) {
  const { slug, title, thumbnail, topics, writer } = article;
  const href = `/${writer.username}/articles/${slug}`;

  return (
    <Link href={href} className="p-1 h-full group flex flex-col gap-2 rounded-xl">
      <InteractiveThumbnail aspect={'16:9'} src={thumbnail} alt={title} width={640} height={360} />
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
        <Timestamp {...article} />
      </div>
    </Link>
  );
}
