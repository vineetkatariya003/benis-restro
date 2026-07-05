// src/app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, createAdminSession } from '@/data/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    const admin = validateAdminCredentials(email, password);
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const session = createAdminSession(admin);
    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}