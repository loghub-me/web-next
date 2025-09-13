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

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
