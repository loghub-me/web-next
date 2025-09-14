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

const MANUAL_LINKS = [
  { label: '아티클', href: '/manual#article' },
  { label: '시리즈', href: '/manual#series' },
  { label: '질문', href: '/manual#question' },
];

const LEGAL_LINKS = [
  { label: '이용약관', href: '/legal#terms' },
  { label: '개인정보처리방침', href: '/legal#privacy' },
];

const CONTACT_LINKS = [{ label: 'GitHub', href: 'https://github.com/loghub-me' }];

const HEADER_LINKS = SEARCH_LINKS;
const FOOTER_LINKS = [
  { label: 'Manual', links: MANUAL_LINKS },
  { label: 'Search', links: SEARCH_LINKS },
  { label: 'Legal', links: LEGAL_LINKS },
  { label: 'Contact', links: CONTACT_LINKS },
];
const TOPIC_DETAIL_LINKS = [
  { label: '아티클', view: 'articles', icon: ScrollIcon },
  { label: '시리즈', view: 'series', icon: LayersIcon },
  { label: '질문', view: 'questions', icon: MessagesSquareIcon },
];
const SETTING_LINKS = [
  { label: '계정', href: '/settings/account', icon: IdCardIcon },
  { label: '프로필', href: '/settings/profile', icon: SquareUserIcon },
  { label: '개인정보', href: '/settings/privacy', icon: GlobeIcon },
  { label: '테마', href: '/settings/theme', icon: MonitorIcon },
];
const POST_LINKS = [
  {
    href: '/post/articles',
    title: '아티클',
    description: '글을 작성하고 공유해보세요.',
    icon: ScrollIcon,
    style: 'md:col-span-3',
    image: {
      light: '/images/articles.png',
      dark: '/images/articles-dark.png',
    },
  },
  {
    href: '/post/series',
    title: '시리즈',
    description: '글을 묶어서 시리즈로 작성해보세요.',
    icon: LayersIcon,
    style: 'md:col-span-2',
    image: {
      light: '/images/series.png',
      dark: '/images/series-dark.png',
    },
  },
  {
    href: '/post/questions',
    title: '질문',
    description: '질문을 작성하고 답변을 받아보세요.',
    icon: MessageSquareIcon,
    style: 'md:col-span-2',
    image: {
      light: '/images/questions.png',
      dark: '/images/questions-dark.png',
    },
  },
  {
    href: '/search/questions',
    title: '답변',
    description: '다른 사람의 질문에 답변해보세요.',
    icon: MessagesSquareIcon,
    style: 'md:col-span-3',
    image: {
      light: '/images/questions.png',
      dark: '/images/questions-dark.png',
    },
  },
];

export { HEADER_LINKS, FOOTER_LINKS, TOPIC_DETAIL_LINKS, SETTING_LINKS, POST_LINKS };
