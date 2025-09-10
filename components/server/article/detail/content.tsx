import { TopicBadge } from '@/components/client/topic';
import { CardContent } from '@ui/card';
import Thumbnail from '@ui/thumbnail';

interface ArticleDetailContentProps {
  topics: Topic[];
  title: string;
  content: { html: string };
  thumbnail: string;
}

export default function ArticleDetailContent({
  topics,
  title,
  thumbnail,
  content,
}: Readonly<ArticleDetailContentProps>) {
  return (
    <CardContent className="space-y-4">
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {topics.map((topic) => (
            <TopicBadge key={topic.slug} topic={topic} linkify={true} />
          ))}
        </div>
      )}
      <Thumbnail aspect={'16:9'} src={thumbnail} alt={`${title}-thumbnail`} width={640} height={360} />
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
