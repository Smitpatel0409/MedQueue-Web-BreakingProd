// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/provider/providers';
import { getThemeScriptTag } from './themeProvider/setInitialTheme';

export const metadata: Metadata = {
  title: 'NeuroVision',
  description: 'Medical imaging and analysis platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScriptTag() }} />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
