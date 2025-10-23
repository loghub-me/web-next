'use client';

import { refreshToken } from '@/apis/client/auth';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';

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

const ACCESS_TOKEN_EXPIRATION = 10 * 60 * 1000; // 10 minutes

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const unregisterSession = useCallback(() => {
    setState({ status: 'unauthenticated' });
  }, []);

  const registerSession = useCallback(
    (session: Session) => {
      setState({ status: 'authenticated', session });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        refreshToken()
          .then(({ body, session }) => {
            // eslint-disable-next-line react-hooks/immutability
            registerSession(session);
            console.info(body.message);
          })
          .catch(unregisterSession);
      }, ACCESS_TOKEN_EXPIRATION);
    },
    [unregisterSession]
  );

  useEffect(() => {
    refreshToken()
      .then(({ body, session }) => {
        registerSession(session);
        console.info(body.message);
      })
      .catch(unregisterSession);
  }, [registerSession, unregisterSession]);

  return (
    <AuthContext.Provider value={{ ...state, registerSession, unregisterSession }}>{children}</AuthContext.Provider>
  );
}
