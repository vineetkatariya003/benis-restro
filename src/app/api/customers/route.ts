// src/app/api/customers/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = [
      {
        id: 'CUST001',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        totalOrders: 5,
        totalSpent: 2450,
        joinDate: '2026-01-15',
        lastOrder: '2026-07-02',
      },
      {
        id: 'CUST002',
        name: 'Priya Singh',
        email: 'priya@example.com',
        phone: '8765432109',
        totalOrders: 3,
        totalSpent: 1280,
        joinDate: '2026-02-20',
        lastOrder: '2026-07-04',
      },
      {
        id: 'CUST003',
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '7654321098',
        totalOrders: 8,
        totalSpent: 3890,
        joinDate: '2025-12-10',
        lastOrder: '2026-07-03',
      },
    ];

    return NextResponse.json({
      success: true,
      data: customers,
      count: customers.length,
      totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newCustomer = {
      id: `CUST${Date.now()}`,
      name,
      email,
      phone,
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastOrder: null,
    };

    return NextResponse.json({
      success: true,
      message: 'Customer registered successfully',
      data: newCustomer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to register customer' },
      { status: 500 }
    );
  }
}