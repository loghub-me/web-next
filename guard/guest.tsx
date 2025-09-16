'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface GuestGuardProps {
  children?: React.ReactNode;
}

export default function GuestGuard({ children }: Readonly<GuestGuardProps>) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  return <div style={{ visibility: status === 'unauthenticated' ? 'visible' : 'hidden' }}>{children}</div>;
}
