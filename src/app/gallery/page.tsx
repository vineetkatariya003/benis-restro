import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import GalleryPage from '@/components/gallery/GalleryPage';

export const metadata = {
  title: 'Gallery - Benis Restro | Restaurant Photos',
  description: 'Explore our gallery featuring restaurant ambiance, signature dishes, our talented team, and special events.',
};

export default function Gallery() {
  return (
    <div>
      <Navbar />
      <GalleryPage />
      <Footer />
    </div>
  );
}