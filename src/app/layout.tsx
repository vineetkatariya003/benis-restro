import type { Metadata } from 'next';
import { RESTAURANT_INFO } from '@/config/restaurant';
import { UserProvider } from '@/context/userContext';
import './globals.css';

export const metadata: Metadata = {
  title: RESTAURANT_INFO.seo.title,
  description: RESTAURANT_INFO.seo.description,
  keywords: RESTAURANT_INFO.seo.keywords,
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://benisrestro.com',
    siteName: RESTAURANT_INFO.name,
    title: RESTAURANT_INFO.seo.title,
    description: RESTAURANT_INFO.seo.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#10B981" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}