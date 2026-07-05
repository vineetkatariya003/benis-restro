// src/app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const bookings = [
      {
        id: 'BK001',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        date: '2026-07-05',
        time: '19:30',
        guests: 4,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'BK002',
        name: 'Priya Singh',
        email: 'priya@example.com',
        phone: '8765432109',
        date: '2026-07-05',
        time: '20:00',
        guests: 2,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (err) {
    console.error('Fetch bookings error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBooking = {
      id: `BK${Date.now()}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    console.log('✅ Booking created:', newBooking);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}