'use client';

import React, { Suspense } from 'react';

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>🔄 Loading dashboard...</div>}>
      <div>Dashboard content goes here</div>
    </Suspense>
  );
}