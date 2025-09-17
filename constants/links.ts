import {
  GlobeIcon,
  IdCardIcon,
  LayersIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  MonitorIcon,
  ScrollIcon,
  SquareUserIcon,
  TagIcon,
} from 'lucide-react';

const SEARCH_LINKS = [
  { label: '아티클', href: '/search/articles', icon: ScrollIcon },
  { label: '시리즈', href: '/search/series', icon: LayersIcon },
  { label: '질문', href: '/search/questions', icon: MessagesSquareIcon },
  { label: '토픽', href: '/topics', icon: TagIcon },
];
const POST_LINKS = [
  {
    href: '/post/articles',
    label: '아티클',
    description: '글을 작성하고 공유해보세요.',
    icon: ScrollIcon,
    style: 'md:col-span-3',
    image: {
      light: '/images/articles.webp',
      dark: '/images/articles-dark.webp',
    },
  },
  {
    href: '/post/series',
    label: '시리즈',
    description: '글을 묶어서 시리즈로 작성해보세요.',
    icon: LayersIcon,
    style: 'md:col-span-2',
    image: {
      light: '/images/series.webp',
      dark: '/images/series-dark.webp',
    },
  },
  {
    href: '/post/questions',
    label: '질문',
    description: '질문을 작성하고 답변을 받아보세요.',
    icon: MessageSquareIcon,
    style: 'md:col-span-2',
    image: {
      light: '/images/questions.webp',
      dark: '/images/questions-dark.webp',
    },
  },
  {
    href: '/search/questions',
    label: '답변',
    description: '다른 사람의 질문에 답변해보세요.',
    icon: MessagesSquareIcon,
    style: 'md:col-span-3',
    image: {
      light: '/images/questions.webp',
      dark: '/images/questions-dark.webp',
    },
  },
];
const SETTING_LINKS = [
  { label: '계정', href: '/settings/account', icon: IdCardIcon },
  { label: '프로필', href: '/settings/profile', icon: SquareUserIcon },
  { label: '개인정보', href: '/settings/privacy', icon: GlobeIcon },
  { label: '테마', href: '/settings/theme', icon: MonitorIcon },
];
const LEGAL_LINKS = [
  { label: '이용약관', href: '/legal#terms' },
  { label: '개인정보처리', href: '/legal#privacy' },
];
const SUPPORT_LINKS = [{ label: '문의하기', href: '/contact' }];

const TOPIC_DETAIL_LINKS = [
  { label: '아티클', view: 'articles', icon: ScrollIcon },
  { label: '시리즈', view: 'series', icon: LayersIcon },
  { label: '질문', view: 'questions', icon: MessagesSquareIcon },
];

const HEADER_LINKS = SEARCH_LINKS;
const FOOTER_LINKS = [
  { label: '탐색', links: SEARCH_LINKS },
  { label: '포스트', links: POST_LINKS },
  { label: '정보', links: LEGAL_LINKS },
  { label: '지원', links: SUPPORT_LINKS },
];

export { HEADER_LINKS, FOOTER_LINKS, LEGAL_LINKS, TOPIC_DETAIL_LINKS, SETTING_LINKS, POST_LINKS };
