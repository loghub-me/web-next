import { CalendarArrowDownIcon, CalendarArrowUpIcon, FlameIcon, LucideIcon, TargetIcon } from 'lucide-react';

const ARTICLE_SORT_OPTIONS: Record<ArticleSort, { label: string; icon: LucideIcon }> = {
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  relevant: { label: '관련도순', icon: TargetIcon },
  trending: { label: '인기순', icon: FlameIcon },
};

const SERIES_SORT_OPTIONS: Record<SeriesSort, { label: string; icon: LucideIcon }> = {
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  relevant: { label: '관련도순', icon: TargetIcon },
  trending: { label: '인기순', icon: FlameIcon },
};

export { ARTICLE_SORT_OPTIONS, SERIES_SORT_OPTIONS };
