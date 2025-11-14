// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/provider/providers';
import { getThemeScriptTag } from './themeProvider/setInitialTheme';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'BreakingProd MedQueue',
  description: 'Medical imaging and analysis platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScriptTag() }} />
      </Head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
