interface UserSimple {
  id: number;
  username: string;
}

interface User {
  id: number;
  username: string;
  nickname: string;
  role: UserRole;
}

interface UserDetail {
  id: number;
  username: string;
  nickname: string;
  readme: string;
  role: UserRole;
}

interface UserStar {
  id: number;
  slug: string;
  title: string;
  writer: UserSimple;
  topics: Topic[];
  target: UserStarTarget;
}

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
type UserStarTarget = 'ARTICLE' | 'SERIES' | 'QUESTION';
