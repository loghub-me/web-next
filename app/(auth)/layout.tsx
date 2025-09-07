import GuestGuard from '@/guard/guest';
import { Card } from '@ui/card';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <GuestGuard>
      <main className="flex w-full min-h-screen">
        {children}
        <section className="flex-1 p-4 pt-20 hidden md:block">
          <Card className="w-full h-full bg-accent rounded-xl">{/*TODO: Implement design*/}</Card>
        </section>
      </main>
    </GuestGuard>
  );
}
