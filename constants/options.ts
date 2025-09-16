import {
  ArrowDownWideNarrowIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  CircleCheckIcon,
  CircleDotIcon,
  CircleXIcon,
  LayersIcon,
  LucideIcon,
  MessagesSquareIcon,
  MonitorIcon,
  MoonIcon,
  ScrollIcon,
  SunIcon,
  TrendingUpIcon,
} from 'lucide-react';

const ARTICLE_SORT_OPTIONS: Record<ArticleSort, { label: string; icon: LucideIcon }> = {
  trending: { label: '인기순', icon: TrendingUpIcon },
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  relevant: { label: '정확도순', icon: ArrowDownWideNarrowIcon },
};

const SERIES_SORT_OPTIONS: Record<SeriesSort, { label: string; icon: LucideIcon }> = {
  trending: { label: '인기순', icon: TrendingUpIcon },
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  relevant: { label: '정확도순', icon: ArrowDownWideNarrowIcon },
};

const QUESTION_SORT_OPTIONS: Record<QuestionSort, { label: string; icon: LucideIcon }> = {
  trending: { label: '인기순', icon: TrendingUpIcon },
  latest: { label: '최신순', icon: CalendarArrowDownIcon },
  oldest: { label: '오래된순', icon: CalendarArrowUpIcon },
  relevant: { label: '정확도순', icon: ArrowDownWideNarrowIcon },
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

const USER_ACTIVITY_ACTION_OPTIONS: Record<UserActivityAction, { path: string; label: string }> = {
  POST_ARTICLE: { path: '/articles/{username}/{slug}', label: '아티클 작성' },
  POST_SERIES: { path: '/series/{username}/{slug}', label: '시리즈 작성' },
  POST_QUESTION: { path: '/questions/{username}/{slug}', label: '질문 작성' },
};

const THEME_OPTIONS: Record<string, { label: string; icon: LucideIcon }> = {
  system: { label: '시스템 설정', icon: MonitorIcon },
  light: { label: '라이트 모드', icon: SunIcon },
  dark: { label: '다크 모드', icon: MoonIcon },
};

export {
  ARTICLE_SORT_OPTIONS,
  SERIES_SORT_OPTIONS,
  QUESTION_SORT_OPTIONS,
  QUESTION_STATUS_OPTIONS,
  QUESTION_FILTER_OPTIONS,
  USER_STAR_TARGET_OPTIONS,
  USER_ACTIVITY_ACTION_OPTIONS,
  THEME_OPTIONS,
};
