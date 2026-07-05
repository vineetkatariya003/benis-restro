// src/data/admin.ts

export interface Admin {
  id: string;
  email: string;
  password: string; // In production: use bcrypt
  name: string;
  role: 'super_admin' | 'admin' | 'manager';
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface AdminSession {
  adminId: string;
  email: string;
  name: string;
  role: string;
  loginTime: string;
  expiresAt: string;
}

// Demo admin accounts (In production: use database)
export const ADMIN_ACCOUNTS: Admin[] = [
  {
    id: 'admin_1',
    email: 'admin@benisrestro.com',
    password: 'Admin@123', // Change this in production!
    name: 'Benis Admin',
    role: 'super_admin',
    permissions: ['manage_orders', 'manage_menu', 'manage_users', 'manage_bookings', 'view_analytics'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'admin_2',
    email: 'manager@benisrestro.com',
    password: 'Manager@123',
    name: 'Benis Manager',
    role: 'admin',
    permissions: ['manage_orders', 'manage_bookings', 'view_analytics'],
    createdAt: new Date().toISOString(),
  },
];

export const validateAdminCredentials = (
  email: string,
  password: string
): Admin | null => {
  const admin = ADMIN_ACCOUNTS.find(
    a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
  );
  return admin || null;
};

export const createAdminSession = (admin: Admin): AdminSession => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

  return {
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    loginTime: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
};

export const isSessionValid = (session: AdminSession): boolean => {
  return new Date() < new Date(session.expiresAt);
};

export const hasPermission = (session: AdminSession, permission: string): boolean => {
  const admin = ADMIN_ACCOUNTS.find(a => a.id === session.adminId);
  return admin?.permissions.includes(permission) || false;
};