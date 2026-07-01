import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AboutPage from '@/components/about/AboutPage';
import ReviewsSection from '@/components/about/ReviewsSection';

export const metadata = {
  title: 'About - Benis Restro | Our Story, Mission & Values',
  description: 'Learn about Benis Restro\'s journey, mission, values, and meet our dedicated team of culinary experts.',
};

export default function About() {
  return (
    <div>
      <Navbar />
      <AboutPage />
      <ReviewsSection />
      <Footer />
    </div>
  );
}