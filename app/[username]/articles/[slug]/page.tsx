import { getArticleDetail } from '@/apis/server/article';
import { ArticleTOCCard } from '@/components/client/article';
import {
  ArticleDetailAside,
  ArticleDetailContent,
  ArticleDetailHeader,
  ArticleDetailHero,
} from '@/components/server/article';
import { parseObject } from '@/lib/parse';
import { compositeKeySchema } from '@/schemas/common';
import { Card } from '@ui/card';

export default async function ArticleDetailPage({ params }: PageProps<'/[username]/articles/[slug]'>) {
  const { username, slug } = parseObject(await params, compositeKeySchema);
  const article = await getArticleDetail(username, slug);

  return (
    <main className="container mx-auto px-2 pt-16 pb-4 min-h-screen space-y-4">
      <ArticleDetailHero {...article} />
      <div className="flex gap-4">
        <div className="w-full min-w-0 space-y-4">
          <Card className="pt-0">
            <ArticleDetailHeader {...article} />
            <ArticleDetailContent {...article} />
          </Card>
        </div>
        <ArticleDetailAside>
          <ArticleTOCCard {...article} />
        </ArticleDetailAside>
      </div>
    </main>
  );
}
