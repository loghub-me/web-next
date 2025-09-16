'use client';

import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface MemberGuardProps {
  children?: React.ReactNode;
}

export default function MemberGuard({ children }: Readonly<MemberGuardProps>) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      router.replace('/login');
    }
  }, [router, status]);

  return <div style={{ visibility: status === 'authenticated' ? 'visible' : 'hidden' }}>{children}</div>;
}
