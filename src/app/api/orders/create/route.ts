// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateOrderData, sanitizeInput } from '@/lib/validation';
import { rateLimit } from '@/lib/rateLimiter';


export async function GET() {
  try {
    // Simulated orders database
    const orders = [
      {
        id: 'ORD001',
        customerName: 'Rajesh Kumar',
        customerEmail: 'rajesh@example.com',
        items: [
          { name: 'Veggie Crisp Burger', price: 60, quantity: 2 },
          { name: 'Cold Coffee', price: 100, quantity: 1 },
        ],
        total: 220,
        status: 'delivered',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ORD002',
        customerName: 'Priya Singh',
        customerEmail: 'priya@example.com',
        items: [
          { name: 'Paneer Royal Wrap', price: 130, quantity: 1 },
          { name: 'Cheese Vada Pav', price: 70, quantity: 2 },
        ],
        total: 270,
        status: 'preparing',
        createdAt: new Date().toISOString(),
        deliveredAt: null,
      },
    ];

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(`order_${clientIP}`, 20, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validation = validateOrderData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    const { customerName, customerEmail, customerPhone, items, total, deliveryAddress } = body;

    const newOrder = {
      id: `ORD${Date.now()}`,
      customerName: sanitizeInput(customerName),
      customerEmail: sanitizeInput(customerEmail),
      customerPhone: sanitizeInput(customerPhone),
      items,
      total,
      deliveryAddress: sanitizeInput(deliveryAddress),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      deliveredAt: null,
    };

    console.log('✅ Order created:', newOrder);

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}