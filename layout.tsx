import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeToggle from '~/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'A Discord clone built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <header className="h-12 bg-gray-800 flex items-center justify-end px-4">
            <ThemeToggle />
          </header>
          <main className="flex-1 flex overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}