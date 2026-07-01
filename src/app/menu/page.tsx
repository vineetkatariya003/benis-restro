import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import MenuPage from '@/components/menu/MenuPage';

export const metadata = {
  title: 'Menu - Benis Restro | Premium Vegetarian Cuisine',
  description: 'Browse our complete menu of premium vegetarian dishes with real-time filtering and search.',
};

export default function Menu() {
  return (
    <div>
      <Navbar />
      <MenuPage />
      <Footer />
    </div>
  );
}