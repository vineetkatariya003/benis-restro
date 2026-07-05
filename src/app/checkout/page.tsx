import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import CheckoutPage from '@/components/checkout/CheckoutPage';

export const metadata = {
  title: 'Contact - Benis Restro',
  description: 'Get in touch with Benis Restro. Call, email, or visit us for any inquiries.',
};

export default function Checkout() {
  return (
    <>
      <Navbar />
      <CheckoutPage />
      <Footer />
    </>
  );
}