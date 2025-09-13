import { TopicLink } from '@/components/client/topic';
import { UserLink } from '@/components/client/user';
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
    <div className="p-1 h-full flex flex-col gap-1.5">
      <Link href={href} className="group space-y-1.5">
        <InteractiveThumbnail aspect={'16:9'} src={thumbnail} alt={title} width={640} height={360} />
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
        <Timestamp {...article} />
      </div>
    </div>
  );
}
