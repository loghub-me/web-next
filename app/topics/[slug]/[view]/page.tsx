import { getTopicTrendingPosts } from '@/apis/server/topic';
import { ArticleListItem, ArticleListSkeleton } from '@/components/server/article';
import { QuestionListItem, QuestionListSkeleton } from '@/components/server/question';
import { SeriesListItem, SeriesListSkeleton } from '@/components/server/series';
import { TopicArticleList, TopicDetailNav, TopicQuestionList, TopicSeriesList } from '@/components/server/topic';
import { parseObject } from '@/lib/parse';
import { topicDetailSchema } from '@/schemas/topic';
import ListEmpty from '@ui/list-empty';
import { ComponentType, Suspense } from 'react';

const LIST_COMPONENTS: Record<
  TopicDetailView,
  {
    list: ComponentType<any>;
    listItem: ComponentType<any>;
    listSkeleton: ComponentType<any>;
    propName: string;
  }
> = {
  articles: {
    list: TopicArticleList,
    listItem: ArticleListItem,
    listSkeleton: ArticleListSkeleton,
    propName: 'article',
  },
  series: {
    list: TopicSeriesList,
    listItem: SeriesListItem,
    listSkeleton: SeriesListSkeleton,
    propName: 'series',
  },
  questions: {
    list: TopicQuestionList,
    listItem: QuestionListItem,
    listSkeleton: QuestionListSkeleton,
    propName: 'question',
  },
};

export default async function TopicTrendingPostPage({ params }: PageProps<'/topics/[slug]/[view]'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const posts = getTopicTrendingPosts(parsedParam.slug, parsedParam.view);

  const { list: List, listSkeleton: ListSkeleton } = LIST_COMPONENTS[parsedParam.view];

  return (
    <div className="flex-1 space-y-4">
      <TopicDetailNav {...parsedParam} />
      <List>
        <Suspense fallback={<ListSkeleton />}>
          <TopicTrendingListContent posts={posts} view={parsedParam.view} />
        </Suspense>
      </List>
    </div>
  );
}

interface TopicTrendingListContentProps {
  posts: Promise<Article[] | Series[] | Question[]>;
  view: TopicDetailView;
}

async function TopicTrendingListContent({ posts, view }: Readonly<TopicTrendingListContentProps>) {
  const { listItem: ListItem, propName } = LIST_COMPONENTS[view];
  const resolvedPosts = await posts;

  if (resolvedPosts.length === 0) {
    return <ListEmpty message={'검색 결과를 찾을 수 없습니다.'} className="py-4" />;
  }

  return resolvedPosts.map((post) => <ListItem key={post.id} {...{ [propName]: post }} />);
}
