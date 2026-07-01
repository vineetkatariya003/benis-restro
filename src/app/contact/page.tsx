import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ContactPage from '@/components/contact/ContactPage';

export const metadata = {
  title: 'Contact - Benis Restro | Get In Touch',
  description: 'Contact Benis Restro for reservations, catering, or inquiries. We\'d love to hear from you!',
};

export default function Contact() {
  return (
    <div>
      <Navbar />
      <ContactPage />
      <Footer />
    </div>
  );
}