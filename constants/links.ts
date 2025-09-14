import {
  GlobeIcon,
  IdCardIcon,
  LayersIcon,
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

export { HEADER_LINKS, FOOTER_LINKS, TOPIC_DETAIL_LINKS, SETTING_LINKS };
