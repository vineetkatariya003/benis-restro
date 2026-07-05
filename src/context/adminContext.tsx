// src/context/adminContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminSession, isSessionValid } from '@/data/admin';

interface AdminContextType {
  session: AdminSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'benis_admin_session';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedSession = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!savedSession) return null;
    try {
      const parsed = JSON.parse(savedSession);
      if (isSessionValid(parsed)) return parsed;
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    } catch (error) {
      console.error('Error restoring session:', error);
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSession(data.session);
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(data.session));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const hasPermission = (permission: string): boolean => {
    if (!session) return false;
    // For demo: super_admin has all permissions
    // In production: fetch from database
    return Boolean(permission);
  };

  return (
    <AdminContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}