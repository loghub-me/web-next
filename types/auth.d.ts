interface Session {
  id: number;
  email: string;
  username: string;
  nickname: string;
  joinedAt: string;
  role: UserRole;
}

interface CustomJwtPayload {
  exp: number;
  iat: number;
  iss: string;
  sub: number;
  email: string;
  username: string;
  nickname: string;
  joinedAt: string;
  role: UserRole;
}
