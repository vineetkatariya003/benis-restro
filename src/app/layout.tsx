import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { CartProvider } from '@/context/cartContext';
import { BookingProvider } from '@/context/bookingContext';
import { UserProvider } from '@/context/userContext';
import { AdminProvider } from '@/context/adminContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Benis Restro - Premium Pure Vegetarian Restaurant',
  description:
    'Experience exceptional vegetarian cuisine at Benis Restro. Authentic flavors, premium ingredients, and warm hospitality.',
  keywords:
    'vegetarian restaurant, pure veg food, restaurant delivery, table booking, vegetarian cuisine',
  authors: [{ name: 'Benis Restro' }],
  creator: 'Benis Restro',
  publisher: 'Benis Restro',
  formatDetection: {
    email: false,
    telephone: false,
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
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