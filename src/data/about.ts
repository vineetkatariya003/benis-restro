// src/data/about.ts

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export const ABOUT_HERO = {
  title: 'Benis Restro',
  subtitle: 'Premium Pure Vegetarian Fine Dining',
  description: 'A journey of culinary excellence, passion, and commitment to serving the finest vegetarian cuisine.',
  image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=1200&h=600&fit=crop',
};

export const RESTAURANT_STORY = {
  title: 'Our Story',
  history: `Benis Restro was founded in 2016 with a simple yet ambitious vision: to redefine vegetarian fine dining and prove that vegetarian cuisine can be just as sophisticated, delicious, and memorable as any other culinary experience.

What started as a small family venture has grown into one of the city's most beloved restaurants, celebrated not just for our exceptional food, but for our commitment to quality, innovation, and genuine hospitality.

Our founder believed that vegetarian cuisine deserves the same respect, attention to detail, and premium ingredients as traditional fine dining. Today, that belief remains at the heart of everything we do.

Every dish that leaves our kitchen is a testament to our dedication to perfection. Every guest who walks through our doors becomes part of our extended family.`,
  image: 'https://images.unsplash.com/photo-1516937941344-00b4b0ba30c0?w=800&h=600&fit=crop',
};

export const MISSION_VISION = {
  mission: {
    title: '🎯 Our Mission',
    description: 'To deliver exceptional vegetarian dining experiences through premium ingredients, innovative recipes, and impeccable service that create lasting memories for every guest.',
  },
  vision: {
    title: '🌟 Our Vision',
    description: 'To become the most trusted and celebrated premium vegetarian restaurant, recognized globally for culinary innovation, sustainability, and community engagement.',
  },
  values: [
    {
      title: '✨ Quality',
      description: 'Premium ingredients, meticulous preparation, and unwavering attention to detail in every dish.',
    },
    {
      title: '🔥 Innovation',
      description: 'Creative recipes, modern culinary techniques, and continuous exploration of new flavors.',
    },
    {
      title: '🌱 Sustainability',
      description: 'Eco-friendly practices, ethical sourcing, and commitment to environmental responsibility.',
    },
    {
      title: '❤️ Hospitality',
      description: 'Warm service, genuine care, and creating meaningful connections with every guest.',
    },
    {
      title: '🎨 Artistry',
      description: 'Treating food as art, with beautiful presentation and thoughtful plating.',
    },
    {
      title: '🤝 Integrity',
      description: 'Honesty, transparency, and ethical practices in all our operations.',
    },
  ],
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_001',
    year: '2016',
    title: 'Restaurant Launch',
    description: 'Benis Restro opens with a vision to revolutionize vegetarian dining.',
    icon: '🍽️',
  },
  {
    id: 'ach_002',
    year: '2017',
    title: 'First Recognition',
    description: 'Won "Best New Restaurant" award for innovative vegetarian cuisine.',
    icon: '🏆',
  },
  {
    id: 'ach_003',
    year: '2018',
    title: 'Menu Expansion',
    description: 'Expanded menu to 100+ signature dishes, each crafted with precision.',
    icon: '📖',
  },
  {
    id: 'ach_004',
    year: '2019',
    title: 'Chef\'s Award',
    description: 'Executive Chef recognized as "Most Innovative Chef" nationally.',
    icon: '👨‍🍳',
  },
  {
    id: 'ach_005',
    year: '2020',
    title: '15,000+ Customers Served',
    description: 'Milestone of serving 15,000 satisfied customers annually.',
    icon: '👥',
  },
  {
    id: 'ach_006',
    year: '2024',
    title: 'Premium Rating 4.9/5',
    description: 'Achieved consistent 4.9/5 star rating across all platforms.',
    icon: '⭐',
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: '🌟',
    title: 'Premium Quality',
    description: 'Only the finest ingredients sourced from trusted suppliers across the country.',
  },
  {
    icon: '👨‍🍳',
    title: 'Expert Chefs',
    description: 'Our award-winning culinary team brings 15+ years of expertise to every dish.',
  },
  {
    icon: '🎨',
    title: 'Artistic Presentation',
    description: 'Food is art. Every plate is carefully plated for visual perfection.',
  },
  {
    icon: '💚',
    title: 'Pure Vegetarian',
    description: '100% vegetarian menu with no compromise on taste or nutrition.',
  },
  {
    icon: '✨',
    title: 'Elegant Ambiance',
    description: 'Sophisticated dining environment perfect for any occasion.',
  },
  {
    icon: '🤝',
    title: 'Exceptional Service',
    description: 'Warm, attentive staff dedicated to making your experience memorable.',
  },
  {
    icon: '🌱',
    title: 'Sustainable Practices',
    description: 'Committed to eco-friendly operations and ethical sourcing.',
  },
  {
    icon: '🎉',
    title: 'Perfect for All Occasions',
    description: 'Romantic dinners, family gatherings, celebrations, or business meetings.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team_001',
    name: 'Chef Rajesh Kumar',
    position: 'Executive Chef & Founder',
    bio: 'With 18 years of culinary experience, Chef Rajesh transformed his passion for vegetarian cuisine into a thriving restaurant known for innovation and excellence.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
  },
  {
    id: 'team_002',
    name: 'Priya Sharma',
    position: 'Head Chef',
    bio: 'Specializing in modern Indian cuisine with a vegetarian twist, Priya brings creativity and precision to every dish that leaves our kitchen.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: 'team_003',
    name: 'Arjun Patel',
    position: 'Executive Sous Chef',
    bio: 'Managing the kitchen with excellence, Arjun ensures consistent quality and innovation across all our menu offerings.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: 'team_004',
    name: 'Neha Desai',
    position: 'Hospitality Manager',
    bio: 'Dedicated to creating warm, welcoming experiences for every guest, Neha leads our service team with passion and professionalism.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
];