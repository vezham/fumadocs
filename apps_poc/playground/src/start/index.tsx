import { RootProvider } from 'fumadocs-ui/provider';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

type Props = {
  children: ReactNode
}

export const defineConfig = ({ children }: Props) => {
  return (
    <html lang="en" className={`${inter.className} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* wjdlz/TODO: move this body class */}
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
