// src/data/bookings.ts

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  confirmationCode: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

// Restaurant hours
export const RESTAURANT_HOURS = {
  weekday: {
    lunch: { start: '11:30', end: '15:00' },
    dinner: { start: '18:00', end: '23:00' },
  },
  weekend: {
    lunch: { start: '11:00', end: '15:30' },
    dinner: { start: '18:00', end: '00:00' },
  },
};

// Available time slots (30-minute intervals)
export const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00',
];

// Tables capacity
export interface Table {
  id: string;
  capacity: number;
  bookedSlots: string[];
}

export const TABLES: Table[] = [
  { id: 'table_1', capacity: 2, bookedSlots: [] },
  { id: 'table_2', capacity: 2, bookedSlots: [] },
  { id: 'table_3', capacity: 4, bookedSlots: [] },
  { id: 'table_4', capacity: 4, bookedSlots: [] },
  { id: 'table_5', capacity: 6, bookedSlots: [] },
  { id: 'table_6', capacity: 6, bookedSlots: [] },
  { id: 'table_7', capacity: 8, bookedSlots: [] },
];

export const generateConfirmationCode = (): string => {
  return 'BEN' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const isRestaurantOpen = (date: string, time: string): boolean => {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const hours = isWeekend ? RESTAURANT_HOURS.weekend : RESTAURANT_HOURS.weekday;
  
  // Check lunch
  const lunchStart = parseInt(hours.lunch.start.split(':')[0]);
  const lunchEnd = parseInt(hours.lunch.end.split(':')[0]);
  
  // Check dinner
  const dinnerStart = parseInt(hours.dinner.start.split(':')[0]);
  const dinnerEnd = parseInt(hours.dinner.end.split(':')[0]);
  
  const timeHour = parseInt(time.split(':')[0]);
  
  const isLunch = timeHour >= lunchStart && timeHour < lunchEnd;
  const isDinner = timeHour >= dinnerStart && timeHour < dinnerEnd;
  
  return isLunch || isDinner;
};

export const getAvailableSlots = (date: string, guests: number): TimeSlot[] => {
  return TIME_SLOTS.map(slot => {
    const available = isRestaurantOpen(date, slot) && TABLES.some(
      table => table.capacity >= guests && !table.bookedSlots.includes(slot)
    );

    return {
      time: slot,
      available,
    };
  });
};