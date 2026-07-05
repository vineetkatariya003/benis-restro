import type { Metadata, Viewport } from 'next';
import './globals.css';
import Script from 'next/script';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { CartProvider } from '@/context/cartContext';
import { BookingProvider } from '@/context/bookingContext';
import { UserProvider } from '@/context/userContext';
import { AdminProvider } from '@/context/adminContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Benis Restro - Premium Pure Vegetarian Restaurant',
  description:
    'Experience exceptional vegetarian cuisine at Benis Restro. Authentic flavors, premium ingredients, and warm hospitality. Reserve tables, order online, and enjoy our exclusive offers.',
  keywords:
    'vegetarian restaurant, pure veg food, restaurant delivery, table booking, vegetarian cuisine, Indian vegetarian',
  authors: [{ name: 'Benis Restro' }],
  creator: 'Benis Restro',
  publisher: 'Benis Restro',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://benis-restro-h7y9.vercel.app',
    siteName: 'Benis Restro',
    title: 'Benis Restro - Premium Pure Vegetarian Restaurant',
    description: 'Experience exceptional vegetarian cuisine at Benis Restro',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Benis Restro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benis Restro - Premium Pure Vegetarian Restaurant',
    description: 'Experience exceptional vegetarian cuisine at Benis Restro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link rel="canonical" href="https://benis-restro-h7y9.vercel.app" />
        <meta name="msapplication-TileColor" content="#10B981" />
      </head>
      {/* Google Tag Manager - replace GTM-XXXX with your container ID */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?"&l="+l:"";j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-XXXX');`}
      </Script>
      <body suppressHydrationWarning>
        <CartProvider>
          <AdminProvider>
            <BookingProvider>
              <UserProvider>
                <Navbar />
                {children}
                <Footer />
              </UserProvider>
            </BookingProvider>
          </AdminProvider>
        </CartProvider>
      </body>
    </html>
  );
}