import type { Metadata, Viewport } from 'next';
import './globals.css';

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
  themeColor: '#10B981',
};

export const metadata: Metadata = {
  title: 'Benis Restro - Premium Pure Vegetarian Restaurant',

  description:
    'Experience exceptional vegetarian cuisine at Benis Restro. Authentic flavors, premium ingredients, and warm hospitality.',

  keywords: [
    'vegetarian restaurant',
    'pure veg food',
    'restaurant delivery',
    'table booking',
    'vegetarian cuisine',
  ],

  authors: [{ name: 'Benis Restro' }],
  creator: 'Benis Restro',
  publisher: 'Benis Restro',

  formatDetection: {
    email: false,
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CartProvider>
          <AdminProvider>
            <BookingProvider>
              <UserProvider>
            

                {children}

          
              </UserProvider>
            </BookingProvider>
          </AdminProvider>
        </CartProvider>
      </body>
    </html>
  );
}