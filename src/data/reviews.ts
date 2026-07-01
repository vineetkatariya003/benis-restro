// src/data/reviews.ts
export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  dish?: string;
}

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'review_001',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    date: '2 weeks ago',
    text: 'Absolutely stunning restaurant! The Paneer Butter Masala was divine, and the ambiance is so elegant. The staff was incredibly attentive without being intrusive. Already planning my next visit!',
    dish: 'Paneer Butter Masala',
  },
  {
    id: 'review_002',
    author: 'Rajesh Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    date: '3 weeks ago',
    text: 'Best vegetarian restaurant in the city! The flavor combinations are sophisticated, and every dish is prepared with care. The Dal Makhani melted in my mouth. Worth every penny!',
    dish: 'Dal Makhani',
  },
  {
    id: 'review_003',
    author: 'Anjali Verma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    date: '1 month ago',
    text: 'Celebrated our anniversary here and it was perfect! The Mushroom Risotto was creamy perfection, and the dessert presentation was Instagram-worthy. Highly recommend for special occasions!',
    dish: 'Mushroom & Spinach Risotto',
  },
  {
    id: 'review_004',
    author: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5,
    date: '1 month ago',
    text: 'Premium experience! The attention to detail is remarkable - from the plating to the table setting. Every dish is a work of art. Benis Restro has raised the bar for vegetarian dining.',
    dish: 'Mixed Vegetable Curry',
  },
  {
    id: 'review_005',
    author: 'Meera Gupta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    date: '2 months ago',
    text: 'Brought my family here for dinner and everyone was impressed. The variety is amazing, and even the kids loved their meals. The Garlic Naan is absolutely delicious!',
    dish: 'Garlic Naan',
  },
  {
    id: 'review_006',
    author: 'Arjun Chopra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    date: '2 months ago',
    text: 'This place redefines fine dining for vegetarians. The Chef\'s special items are truly special. The Chocolate Lava Cake for dessert was the perfect ending to an excellent meal.',
    dish: 'Chocolate Lava Cake',
  },
];

export const STATISTICS = [
  {
    icon: '👥',
    label: 'Happy Customers',
    value: '15,000+',
    description: 'Served annually',
  },
  {
    icon: '🏆',
    label: 'Years of Excellence',
    value: '8+',
    description: 'Since 2016',
  },
  {
    icon: '🍽️',
    label: 'Dishes Created',
    value: '100+',
    description: 'Vegetarian specialties',
  },
  {
    icon: '⭐',
    label: 'Average Rating',
    value: '4.9',
    description: 'Out of 5 stars',
  },
];