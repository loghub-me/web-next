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

type UserRole = 'MEMBER' | 'ADMIN' | 'BOT';
