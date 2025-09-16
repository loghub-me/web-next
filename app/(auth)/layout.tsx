import Logo from '@/components/global/logo';
import { getRandomQuote } from '@/constants/quotes';
import GuestGuard from '@/guard/guest';
import { Card } from '@ui/card';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  const randomQuote = getRandomQuote();

  return (
    <GuestGuard>
      <main className="flex w-full min-h-screen">
        {children}
        <section className="flex-1 p-4 pt-20 hidden md:block">
          <Card className="relative flex items-center justify-center w-full h-full bg-accent rounded-xl">
            <Logo width={256} height={64} />
            <Card className="absolute bottom-4 max-w-md p-4">
              <p className="font-medium">{randomQuote.text}</p>
              <p className="text-sm text-right text-muted-foreground">{randomQuote.by}</p>
            </Card>
          </Card>
        </section>
      </main>
    </GuestGuard>
  );
}
