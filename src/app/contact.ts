// src/data/contact.ts

export const CONTACT_INFO = {
  email: 'info@benisrestro.com',
  phone: '+91 9876543210',
  address: '123 Restaurant Street, Mumbai, Maharashtra 400001, India',
  mapLink: 'https://maps.google.com/?q=Benis+Restro+Mumbai',
  hours: {
    weekday: '11:30 AM - 3:00 PM, 6:00 PM - 11:00 PM',
    weekend: '11:00 AM - 3:30 PM, 6:00 PM - 12:00 AM',
    closed: 'Mondays',
  },
};

export const CONTACT_REASONS = [
  {
    icon: '💬',
    title: 'General Inquiry',
    description: 'Ask questions about our menu or services',
  },
  {
    icon: '🎉',
    title: 'Event Booking',
    description: 'Plan your special celebration with us',
  },
  {
    icon: '🍽️',
    title: 'Catering Services',
    description: 'Corporate events and large gatherings',
  },
  {
    icon: '💼',
    title: 'Business Proposal',
    description: 'Partnership and collaboration opportunities',
  },
];

export const FAQ = [
  {
    id: 'faq_001',
    question: 'Do you offer vegetarian options?',
    answer: 'We are a 100% pure vegetarian restaurant. All our dishes are completely vegetarian with no non-veg, egg, or seafood.',
  },
  {
    id: 'faq_002',
    question: 'Can we make reservations online?',
    answer: 'Yes! You can make reservations through our website or call us directly.',
  },
  {
    id: 'faq_003',
    question: 'Do you provide catering services?',
    answer: 'Yes, we provide catering for events, parties, and corporate functions. Contact us for customized packages.',
  },
  {
    id: 'faq_004',
    question: 'What are your operating hours?',
    answer: 'Weekdays: 11:30 AM - 3:00 PM, 6:00 PM - 11:00 PM. Weekends: 11:00 AM - 3:30 PM, 6:00 PM - 12:00 AM. Closed Mondays.',
  },
  {
    id: 'faq_005',
    question: 'Do you have parking facilities?',
    answer: 'Yes, we have ample parking space available for our guests.',
  },
  {
    id: 'faq_006',
    question: 'Can we order online?',
    answer: 'Yes! Browse our menu and place orders directly from our website.',
  },
];