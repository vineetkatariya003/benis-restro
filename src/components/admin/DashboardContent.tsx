'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdmin } from '@/context/adminContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import DashboardHome from '@/components/admin/DashboardHome';
import OrdersManagement from '@/components/admin/OrdersManagement';
import MenuManagement from '@/components/admin/MenuManagement';
import BookingsManagement from '@/components/admin/BookingsManagement';

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, isLoading } = useAdmin();
  const page = searchParams.get('page') || 'dashboard';

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/admin/login');
    }
  }, [session, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p style={{ fontSize: '18px' }}>🔄 Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const renderPage = () => {
    switch (page) {
      case 'orders':
        return <OrdersManagement />;
      case 'menu':
        return <MenuManagement />;
      case 'bookings':
        return <BookingsManagement />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout currentPage={page as 'dashboard' | 'orders' | 'menu' | 'bookings' | 'customers'}>
      {renderPage()}
    </DashboardLayout>
  );
}