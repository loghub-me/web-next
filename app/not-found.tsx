import { getRandomNotFoundQuote } from '@/constants/quotes';
import { ButtonLink } from '@ui/button';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';

export default function NotFoundPage() {
  const randomQuote = getRandomNotFoundQuote();

  return (
    <main className="container flex flex-col items-center gap-4 justify-center mx-auto p-4 min-h-screen">
      <h2 className="font-medium text-2xl">
        <strong>404</strong> | Page Not Found
      </h2>
      <p>{randomQuote}</p>
      <ButtonLink variant={'outline'} href={'/'}>
        <HomeIcon /> 받아들이고 홈으로 돌아가기 <ChevronRightIcon />
      </ButtonLink>
    </main>
  );
}
