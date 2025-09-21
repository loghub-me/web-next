'use client';

import { Button } from '@ui/button';
import { RotateCcwIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container flex flex-col items-center gap-4 justify-center mx-auto p-4 min-h-screen">
      <h2 className="font-medium text-2xl">
        <strong className="text-destructive">이런!</strong> | 무언가 굉장히 잘못되었습니다.
      </h2>
      <Button variant={'outline'} onClick={reset}>
        <RotateCcwIcon /> 다시 시도하기
      </Button>
    </main>
  );
}
