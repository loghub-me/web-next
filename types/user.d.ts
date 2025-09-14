interface User {
  id: number;
  username: string;
}

interface UserDetail {
  id: number;
  email?: string;
  username: string;
  nickname: string;
  role: UserRole;
}

interface UserProfile {
  id: number;
  nickname: string;
  readme: UserRole;
}

interface UserStar {
  id: number;
  slug: string;
  title: string;
  writer: User;
  topics: Topic[];
  target: UserStarTarget;
}

interface UserActivitySummary {
  date: string;
  count: number;
}

interface UserActivity {
  id: number;
  slug: string;
  title: string;
  action: UserActivityAction;
  createdAt: string;
}

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
type UserStarTarget = 'ARTICLE' | 'SERIES' | 'QUESTION';
type UserActivityAction = 'POST_ARTICLE' | 'POST_SERIES' | 'POST_QUESTION';
