// src/app/api/analytics/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const analytics = {
      revenue: {
        today: 14250,
        thisWeek: 98500,
        thisMonth: 425000,
        growth: '+15.5%',
      },
      orders: {
        today: 28,
        thisWeek: 185,
        thisMonth: 820,
        averageValue: 518,
      },
      customers: {
        total: 1240,
        newThisMonth: 145,
        repeating: 892,
        churnRate: '2.3%',
      },
      bookings: {
        pending: 12,
        confirmed: 34,
        completed: 156,
        cancellationRate: '4.2%',
      },
      topDishes: [
        { name: 'Paneer Royal Wrap', orders: 156, revenue: 20280 },
        { name: 'Veggie Crisp Burger', orders: 142, revenue: 8520 },
        { name: 'Cold Coffee', orders: 128, revenue: 12800 },
        { name: 'Cheese Vada Pav', orders: 98, revenue: 6860 },
        { name: 'Margherita Pizza', orders: 87, revenue: 20010 },
      ],
      dailyRevenue: [
        { date: '2026-06-28', revenue: 12500 },
        { date: '2026-06-29', revenue: 14300 },
        { date: '2026-06-30', revenue: 16200 },
        { date: '2026-07-01', revenue: 13800 },
        { date: '2026-07-02', revenue: 15100 },
        { date: '2026-07-03', revenue: 14250 },
      ],
    };

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}