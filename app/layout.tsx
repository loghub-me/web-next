import '@/app/globals.css';
import GlobalHeader from '@/components/global/header';
import AuthProvider from '@/providers/auth';
import ReactQueryProvider from '@/providers/react-query';
import { ThemeProvider } from '@/providers/theme';
import '@/styles/markdown-it.css';
import { Toaster } from '@ui/sonner';
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
          <ReactQueryProvider>
            <AuthProvider>
              <GlobalHeader />
              {children}
              <Toaster position={'top-center'} richColors={true} />
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
