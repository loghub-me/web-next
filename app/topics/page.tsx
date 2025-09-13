'use client';

import { TopicList, TopicListItem } from '@/components/client/topic';
import { searchTopics } from '@/constants/topics';
import { InputWithIcon } from '@ui/input';
import ListEmpty from '@ui/list-empty';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function TopicSearchPage() {
  const [query, setQuery] = useState('');
  const topics = searchTopics(query);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <InputWithIcon
        type={'text'}
        name={'query'}
        icon={SearchIcon}
        placeholder={'검색어를 입력해주세요...'}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <TopicList>
        {topics.length === 0 && (
          <ListEmpty message={query ? '검색된 토픽이 없습니다.' : '토픽이 없습니다.'} className="py-4" />
        )}
        {topics.map((topic) => (
          <TopicListItem key={topic.slug} topic={topic} />
        ))}
      </TopicList>
    </main>
  );
}
