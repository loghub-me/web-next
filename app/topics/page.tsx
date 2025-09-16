import { getTrendingTopics } from '@/apis/server/topic';
import { TopicSearch } from '@/components/client/topic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '토픽 검색',
  description: 'LogHub에서 다루는 다양한 토픽을 검색해보세요.',
};

export default async function TopicSearchPage() {
  const trendingTopics = await getTrendingTopics();

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <TopicSearch trendingTopics={trendingTopics} />
    </main>
  );
}
