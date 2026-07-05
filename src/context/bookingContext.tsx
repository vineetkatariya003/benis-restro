'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, generateConfirmationCode } from '@/data/bookings';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'confirmationCode' | 'status'>) => Booking;
  getBookingByConfirmationCode: (code: string) => Booking | undefined;
  cancelBooking: (id: string) => void;
  getBookingsByDate: (date: string) => Booking[];
  isTimeSlotAvailable: (date: string, time: string, guests: number) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'confirmationCode' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      createdAt: new Date().toISOString(),
      confirmationCode: generateConfirmationCode(),
      status: 'confirmed',
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  const getBookingByConfirmationCode = (code: string): Booking | undefined => {
    return bookings.find(b => b.confirmationCode === code);
  };

  const cancelBooking = (id: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'cancelled' } : b
    ));
  };

  const getBookingsByDate = (date: string): Booking[] => {
    return bookings.filter(b => b.date === date && b.status === 'confirmed');
  };

  const isTimeSlotAvailable = (date: string, time: string, guests: number): boolean => {
    const bookingsForDateTime = bookings.filter(
      b => b.date === date && b.time === time && b.status === 'confirmed'
    );
    
    // Max 3 bookings per time slot
    if (bookingsForDateTime.length >= 3) return false;
    
    // Check if total guests don't exceed capacity
    const totalGuestsBooked = bookingsForDateTime.reduce((sum, b) => sum + b.guests, 0);
    return totalGuestsBooked + guests <= 30;
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookingByConfirmationCode, cancelBooking, getBookingsByDate, isTimeSlotAvailable }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}