import Head from 'next/head';
import React from 'react';
import ThemeLayout from './themeLayout';

export default function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='app-layout'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Chat App' />
        <meta name='keywords' content='Chat App' />
        <meta name='author' content='Chat App' />
        <meta name='copyright' content='Chat App' />
      </Head>
      <ThemeLayout>{children}</ThemeLayout>
    </div>
  );
}
