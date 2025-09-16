'use client';

import { getActivitySummaries } from '@/apis/client/user';
import { UserActivityCalendar } from '@/components/client/user';
import { useQuery } from '@tanstack/react-query';

interface HomeFeatureActivityCalendarProps {
  userId?: number;
  username?: string;
}

export default function HomeFeatureActivityCalendar({
  userId = 1,
  username = 'gymynnym',
}: Readonly<HomeFeatureActivityCalendarProps>) {
  const { data: summaries } = useQuery({
    queryKey: ['getActivitySummaries', userId],
    queryFn: () => getActivitySummaries(userId),
  });

  return (
    <div className="p-4 flex items-center justify-center w-full h-full border rounded-xl overflow-hidden">
      {summaries && <UserActivityCalendar username={username} summaries={summaries} />}
    </div>
  );
}
