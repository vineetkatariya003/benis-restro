import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturedDishes from '@/components/homepage/FeaturedDishes';
import ReviewsSection from '@/components/homepage/ReviewsSection';

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedDishes />
      <ReviewsSection />
      <Footer />
    </div>
  );
}