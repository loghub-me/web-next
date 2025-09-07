'use client';

import { refreshToken } from '@/apis/client/auth';
import { createContext, useCallback, useEffect, useState } from 'react';

type AuthState =
  | { status: 'loading'; session?: undefined }
  | { status: 'unauthenticated'; session?: undefined }
  | { status: 'authenticated'; session: Session };

type AuthContextProps = AuthState & {
  registerSession: (session: Session) => void;
  unregisterSession: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  status: 'unauthenticated',
  session: undefined,
  registerSession: () => {},
  unregisterSession: () => {},
});

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });

  const registerSession = useCallback((session: Session) => {
    setState({ status: 'authenticated', session });
  }, []);

  const unregisterSession = useCallback(() => {
    setState({ status: 'unauthenticated' });
  }, []);

  useEffect(() => {
    refreshToken()
      .then(({ body, session }) => {
        registerSession(session);
        console.info(body.message);
      })
      .catch(unregisterSession);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, registerSession, unregisterSession }}>{children}</AuthContext.Provider>
  );
}
