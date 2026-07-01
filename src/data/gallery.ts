// src/data/gallery.ts

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: 'ambiance' | 'dishes' | 'events';
  image: string;
  thumbnail: string;
}

export const GALLERY_CATEGORIES = [
  { id: 'all', name: '📸 All', count: 0 },
  { id: 'ambiance', name: '✨ Ambiance', count: 0 },
  { id: 'dishes', name: '🍽️ Dishes', count: 0 },
  { id: 'events', name: '🎉 Events', count: 0 },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // AMBIANCE PHOTOS
  {
    id: 'amb_001',
    title: 'Elegant Dining Hall',
    description: 'Our main dining area with premium ambiance and warm lighting',
    category: 'ambiance',
    image: 'https://i.ibb.co/zhZKvyzp/interior-1.png',
    thumbnail: 'https://i.ibb.co/zhZKvyzp/interior-1.png',
  },
  {
    id: 'amb_002',
    title: 'Intimate Corner Seating',
    description: 'Cozy corner seating perfect for romantic dinners',
    category: 'ambiance',
    image: 'https://i.ibb.co/HDxDZYWk/interior-2.png',
    thumbnail: 'https://i.ibb.co/HDxDZYWk/interior-2.png',
  },
  {
    id: 'amb_003',
    title: 'Chandelier & Decor',
    description: 'Beautiful crystal chandelier adds elegance to our restaurant',
    category: 'ambiance',
    image: 'https://i.ibb.co/yMg8X0f/interior-5.png',
    thumbnail: 'https://i.ibb.co/yMg8X0f/interior-5.png',
  },
  {
    id: 'amb_004',
    title: 'Bar & Beverage Station',
    description: 'Premium beverage station with signature drinks',
    category: 'ambiance',
    image: 'https://i.ibb.co/sdM4Hr88/interior-3.png',
    thumbnail: 'https://i.ibb.co/sdM4Hr88/interior-3.png',
  },
  {
    id: 'amb_005',
    title: 'Garden Patio',
    description: 'Outdoor seating area with green ambiance',
    category: 'ambiance',
    image: 'https://i.ibb.co/XZpCLKL8/interior-4.png',
    thumbnail: 'https://i.ibb.co/XZpCLKL8/interior-4.png',
  },

  // SIGNATURE DISHES
  {
    id: 'dish_001',
    title: 'Paneer Butter Masala',
    description: 'Creamy cottage cheese in rich tomato sauce',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
  },
  {
    id: 'dish_002',
    title: 'Beni\'s Spicy Paneer',
    description: 'Signature spicy paneer burger',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1550547990-25967503a95e?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1550547990-25967503a95e?w=400&h=300&fit=crop',
  },
  {
    id: 'dish_003',
    title: 'Special Pizza',
    description: 'The Beni\'s Special Pizza with premium toppings',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
  },
  {
    id: 'dish_004',
    title: 'Garlic Bread',
    description: 'Traditional tandoor-baked bread with garlic',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1601050915589-ab8a210c53a0?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1601050915589-ab8a210c53a0?w=400&h=300&fit=crop',
  },
  {
    id: 'dish_005',
    title: 'Loaded Fries',
    description: 'Loaded fries with peri peri and cheese',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1584054504399-112c21806212?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1584054504399-112c21806212?w=400&h=300&fit=crop',
  },
  {
    id: 'dish_006',
    title: 'Chocolate Shake',
    description: 'Rich chocolate shake',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
  },

  // EVENTS
  {
    id: 'event_001',
    title: 'Wedding Reception',
    description: 'Beautiful wedding celebration at our venue',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=400&h=300&fit=crop',
  },
  {
    id: 'event_002',
    title: 'Corporate Event',
    description: 'Professional gathering and networking',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
  },
  {
    id: 'event_003',
    title: 'Birthday Celebration',
    description: 'Joyful birthday party in elegant setting',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1467959882337-643a573cf666?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1467959882337-643a573cf666?w=400&h=300&fit=crop',
  },
  {
    id: 'event_004',
    title: 'Family Gathering',
    description: 'Warm family moments at our restaurant',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=400&h=300&fit=crop',
  },
];

// Update category counts
GALLERY_CATEGORIES.forEach((cat) => {
  if (cat.id === 'all') {
    cat.count = GALLERY_IMAGES.length;
  } else {
    cat.count = GALLERY_IMAGES.filter((img) => img.category === cat.id).length;
  }
});