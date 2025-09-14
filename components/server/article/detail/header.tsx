import { ArticleActionMenu, ArticleStarToggle } from '@/components/client/article';
import { UserLink } from '@/components/client/user';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface ArticleDetailHeaderProps {
  id: number;
  slug: string;
  writer: UserDetail;
  stats: { starCount: number };
}

export default function ArticleDetailHeader(props: Readonly<ArticleDetailHeaderProps>) {
  const { writer, id, stats } = props;

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className={'mr-auto'} />
      <ArticleActionMenu {...props} />
      <ArticleStarToggle id={id} starCount={stats.starCount} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
