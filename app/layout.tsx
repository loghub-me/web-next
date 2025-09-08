import '@/app/globals.css';
import GlobalFooter from '@/components/global/footer';
import GlobalHeader from '@/components/global/header';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/providers/auth';
import { ThemeProvider } from '@/providers/theme';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = { title: 'LogHub' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <GlobalHeader />
            {children}
            <GlobalFooter />
            <Toaster position={'top-center'} richColors={true} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
