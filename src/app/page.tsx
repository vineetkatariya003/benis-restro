import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturedDishes from '@/components/homepage/FeaturedDishes';
import ReviewsSection from '@/components/homepage/ReviewsSection';

export const metadata = {
title: 'Benis Restro - Premium Vegetarian Restaurant',
description: 'Experience exceptional vegetarian cuisine at Benis Restro. Reserve tables, order online, and enjoy premium pure vegetarian dining.',
};


export default function Home() {
  return (
    <div>
  
      <HeroSection />
      <FeaturedDishes />
      <ReviewsSection />
    
    </div>
  );
}