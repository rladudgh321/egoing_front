"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from "next/font/google";
import { RecoilRoot } from 'recoil';
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </RecoilRoot>
    </QueryClientProvider>
  );
}
