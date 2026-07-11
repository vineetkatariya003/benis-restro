import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BookingForm from '@/components/booking/BookingForm';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/colors';

export const metadata = {
title: 'Book Table - Benis Restro',
description: 'Reserve a table at Benis Restro for an unforgettable dining experience.',
};
export default function BookingPage() {
  return (
    <div>
    
      
      <div
        style={{
          padding: `${SPACING['4xl']} ${SPACING.xl}`,
          backgroundColor: COLORS.bg.secondary,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING['3xl'] }}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: TYPOGRAPHY.weights.bold,
                fontFamily: TYPOGRAPHY.families.display,
                color: COLORS.neutral.black,
                margin: '0 0 16px 0',
              }}
            >
              Reserve Your Table
            </h1>
            <p
              style={{
                fontSize: TYPOGRAPHY.sizes.lg,
                color: COLORS.text.secondary,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Book a table at Benis Restro for an exceptional vegetarian dining experience.
            </p>
          </div>

          <BookingForm />
        </div>
      </div>

  
    </div>
  );
}