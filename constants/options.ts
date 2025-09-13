import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CircleCheckIcon,
  CircleDotIcon,
  CircleXIcon,
  FlameIcon,
  LayersIcon,
  LucideIcon,
  MessagesSquareIcon,
  ScrollIcon,
  TargetIcon,
} from 'lucide-react';

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

const QUESTION_SORT_OPTIONS: Record<QuestionSort, { label: string; icon: LucideIcon }> = {
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  relevant: { label: '관련도순', icon: TargetIcon },
  trending: { label: '인기순', icon: FlameIcon },
};

const QUESTION_STATUS_OPTIONS: Record<QuestionStatus, { label: string; icon: LucideIcon; color: string }> = {
  OPEN: { label: '답변대기', icon: CircleDotIcon, color: 'text-green-500' },
  CLOSED: { label: '닫힘', icon: CircleXIcon, color: 'text-red-500' },
  SOLVED: { label: '해결됨', icon: CircleCheckIcon, color: 'text-purple-500' },
};

const QUESTION_FILTER_OPTIONS: Record<QuestionFilter, { label: string }> = {
  all: { label: '전체' },
  open: { label: '답변대기' },
  closed: { label: '닫힘' },
  solved: { label: '해결됨' },
};

const USER_STAR_TARGET_OPTIONS: Record<UserStarTarget, { label: string; path: string; icon: LucideIcon }> = {
  ARTICLE: { label: '아티클', path: '/articles', icon: ScrollIcon },
  SERIES: { label: '시리즈', path: '/series', icon: LayersIcon },
  QUESTION: { label: '질문', path: '/questions', icon: MessagesSquareIcon },
};

export {
  ARTICLE_SORT_OPTIONS,
  SERIES_SORT_OPTIONS,
  QUESTION_SORT_OPTIONS,
  QUESTION_STATUS_OPTIONS,
  QUESTION_FILTER_OPTIONS,
  USER_STAR_TARGET_OPTIONS,
};
