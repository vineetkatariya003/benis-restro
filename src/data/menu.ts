'use client';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

const menuItems: MenuItem[] = [
  // Burgers
  { id: '1', name: 'Veggie Crisp', category: 'Burgers', price: 60, description: 'Crispy veggie burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
  { id: '2', name: 'Veggie Spicy', category: 'Burgers', price: 80, description: 'Spicy veggie burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
  { id: '3', name: 'Paneer Crispy', category: 'Burgers', price: 90, description: 'Crispy paneer burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
  { id: '4', name: 'Paneer Spicy', category: 'Burgers', price: 100, description: 'Spicy paneer burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
  { id: '5', name: 'Cheesy Burger', category: 'Burgers', price: 100, description: 'Cheese burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },

  // Sandwiches
  { id: '6', name: 'Classic Sandwich', category: 'Sandwiches', price: 90, description: 'Classic veg sandwich', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
  { id: '7', name: 'Spicy Sandwich', category: 'Sandwiches', price: 100, description: 'Spicy veg sandwich', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
  { id: '8', name: 'Cheesy Corn', category: 'Sandwiches', price: 130, description: 'Cheese and corn', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },

  // Wraps
  { id: '9', name: 'Veggie Wrap', category: 'Wraps', price: 120, description: 'Fresh veg wrap', image: 'https://images.unsplash.com/photo-1565520010857-6515a726d242?w=500' },
  { id: '10', name: 'Paneer Royal', category: 'Wraps', price: 130, description: 'Royal paneer wrap', image: 'https://images.unsplash.com/photo-1565520010857-6515a726d242?w=500' },
  { id: '11', name: 'Peri Peri Paneer', category: 'Wraps', price: 140, description: 'Peri peri wrap', image: 'https://images.unsplash.com/photo-1565520010857-6515a726d242?w=500' },

  // Pizzas
  { id: '12', name: 'Margherita', category: 'Pizzas', price: 230, description: 'Classic cheese pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500' },
  { id: '13', name: 'Paneer Pizza', category: 'Pizzas', price: 250, description: 'Paneer pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500' },
  { id: '14', name: 'Farm House', category: 'Pizzas', price: 250, description: 'Mixed veg pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500' },
  { id: '15', name: 'Spicy Pizza', category: 'Pizzas', price: 260, description: 'Extra spicy pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500' },

  // Shakes
  { id: '16', name: 'Cold Coffee', category: 'Shakes', price: 100, description: 'Iced coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500' },
  { id: '17', name: 'Vanilla Shake', category: 'Shakes', price: 100, description: 'Vanilla shake', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500' },
  { id: '18', name: 'Chocolate', category: 'Shakes', price: 120, description: 'Chocolate shake', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500' },
  { id: '19', name: 'Strawberry', category: 'Shakes', price: 100, description: 'Strawberry shake', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500' },

  // Desserts
  { id: '20', name: 'Brownie', category: 'Desserts', price: 130, description: 'Chocolate brownie', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500' },
  { id: '21', name: 'Ice Cream', category: 'Desserts', price: 80, description: 'Vanilla ice cream', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500' },

  // Salads
  { id: '22', name: 'Veggie Salad', category: 'Salads', price: 120, description: 'Fresh salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500' },
  { id: '23', name: 'Paneer Salad', category: 'Salads', price: 140, description: 'Paneer salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500' },

  // Drinks
  { id: '24', name: 'Lemon Tea', category: 'Mocktails', price: 70, description: 'Fresh lemon tea', image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=500' },
  { id: '25', name: 'Mojito', category: 'Mocktails', price: 70, description: 'Mint mojito', image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33b61?w=500' },
];

export const MENU_DATA = menuItems;
export const MENU_ITEMS = menuItems;
export const FEATURED_ITEMS = menuItems.slice(0, 6);
export const FEATURED_DISHES = menuItems.slice(0, 6);