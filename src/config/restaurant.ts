// src/config/restaurant.ts
export const RESTAURANT_INFO = {
  name: 'Benis Restro',
  tagline: 'Premium Pure Vegetarian Fine Dining',
  description: 'Experience culinary excellence in pure vegetarian dining. At Benis Restro, we celebrate the art of vegetarian cuisine with premium ingredients, innovative recipes, and impeccable service.',

  contact: {
    phone: '+91 8824810321',
    email: 'katariavinit029@gmail.com',
    address: 'Your Address Here, City, State, PIN',
    mapLink: 'https://maps.google.com',
  },

  hours: {
    weekdays: {
      lunch: { open: '11:30 AM', close: '3:00 PM' },
      dinner: { open: '6:00 PM', close: '11:00 PM' },
    },
    weekends: {
      lunch: { open: '11:00 AM', close: '3:30 PM' },
      dinner: { open: '6:00 PM', close: '12:00 AM' },
    },
    closed: 'Mondays',
  },

  features: [
    'Premium Ambiance',
    'Pure Vegetarian',
    'Family Friendly',
    'Reservations Available',
    'Air Conditioned',
    'Parking Facility',
    'Private Dining',
    'Catering Services',
  ],

  social: {
    facebook: 'https://facebook.com/benisrestro',
    instagram: 'https://www.instagram.com/vinit_katariya_?igsh=MW1rcjU0YjA4aDM0Ng%3D%3D',
    twitter: 'https://twitter.com/benisrestro',
    youtube: 'https://youtube.com/benisrestro',
  },

  assets: {
    logo: 'public/images/branding/logo.pngrun ',
    favicon: '/favicon.ico',
    heroImage: '/hero.jpg',
  },

  about: {
    story: `Benis Restro was founded in 2016 with a vision to revolutionize vegetarian fine dining. What started as a small dream has grown into a beloved culinary destination, celebrated for our commitment to quality, innovation, and excellence.`,
    mission: 'To deliver exceptional vegetarian dining experiences that celebrate the art of plant-based cuisine with premium ingredients, innovative recipes, and impeccable hospitality.',
    vision: 'To become the most trusted and beloved premium vegetarian restaurant, recognized for culinary innovation, sustainability, and community engagement.',
    values: [
      'Quality - Premium ingredients and meticulous preparation',
      'Innovation - Creative recipes and modern culinary techniques',
      'Sustainability - Eco-friendly practices and ethical sourcing',
      'Hospitality - Warm service and memorable experiences',
      'Integrity - Honesty and transparency in all operations',
    ],
  },

  chef: {
    name: 'Chef Name',
    title: 'Executive Chef',
    bio: 'With over 15 years of culinary excellence, our chef brings innovation and artistry to every dish.',
    image: '/chef.jpg',
  },

  seo: {
    title: 'Benis Restro - Premium Pure Vegetarian Restaurant',
    description: 'Experience premium pure vegetarian fine dining at Benis Restro. Authentic recipes, premium ingredients, and impeccable service.',
    keywords: ['vegetarian restaurant', 'fine dining', 'premium cuisine', 'Udaipur restaurant'],
  },
};

export const getCurrentHours = () => {
  const now = new Date();
  const day = now.getDay();
  const hours = day === 0 || day === 6 
    ? RESTAURANT_INFO.hours.weekends 
    : RESTAURANT_INFO.hours.weekdays;
  return hours;
};

export const isOpen = () => {
  const now = new Date();
  const hours = getCurrentHours();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const lunchOpen = parseTime(hours.lunch.open);
  const lunchClose = parseTime(hours.lunch.close);
  const dinnerOpen = parseTime(hours.dinner.open);
  const dinnerClose = parseTime(hours.dinner.close);
  
  return (currentTime >= lunchOpen && currentTime <= lunchClose) ||
         (currentTime >= dinnerOpen && currentTime <= dinnerClose);
};

const parseTime = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
  return adjustedHours * 60 + minutes;
};