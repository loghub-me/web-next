import { getTrendingTopics } from '@/apis/server/topic';
import { TopicSearch } from '@/components/client/topic';

export default async function TopicSearchPage() {
  const trendingTopics = await getTrendingTopics();

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <TopicSearch trendingTopics={trendingTopics} />
    </main>
  );
}
