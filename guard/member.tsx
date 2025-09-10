'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface MemberGuardProps {
  children?: React.ReactNode;
}

export default function MemberGuard({ children }: Readonly<MemberGuardProps>) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status]);

  return <div style={{ visibility: status === 'authenticated' ? 'visible' : 'hidden' }}>{children}</div>;
}
