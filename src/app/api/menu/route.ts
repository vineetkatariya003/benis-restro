// src/app/api/menu/route.ts
import { NextRequest, NextResponse } from 'next/server';

type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
};

const MENU_DATA: MenuItem[] = [];

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category');

    let items = MENU_DATA;
    if (category) {
      items = MENU_DATA.filter(item => item.category === category);
    }

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, price, description } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newItem = {
      id: `item_${Date.now()}`,
      name,
      category,
      price,
      description,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    };

    console.log('✅ Menu item created:', newItem);

    return NextResponse.json({
      success: true,
      message: 'Menu item added successfully',
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}