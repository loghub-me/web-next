'use client';

import { ErrorMessage } from '@/constants/messages';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useQueryErrorHandle(error: Error | null, notFoundRedirectPath: string) {
  const router = useRouter();

  useEffect(() => {
    async function onError(error: Error) {
      if (!(error instanceof HTTPError)) {
        toast.error(ErrorMessage.UNKNOWN);
        router.push('/');
        return;
      }

      const body = await error.response.json<ErrorResponseBody>();
      const status = error.response.status;
      if (status >= 400) {
        toast.error(body.message);

        switch (error.response.status) {
          case 401:
            router.replace('/login');
            break;
          case 403:
            router.replace('/');
            break;
          case 404:
            router.replace(notFoundRedirectPath);
            break;
        }
      }
    }

    if (error) {
      onError(error).catch(console.error);
    }
  }, [router, error, notFoundRedirectPath]);
}
