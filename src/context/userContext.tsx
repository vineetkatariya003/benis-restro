'use client';

import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface UserReview {
  id: string;
  dishName: string;
  dishId: string;
  rating: number;
  text: string;
  date: string;
  userName: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  wishlist: string[];
  addToWishlist: (itemId: string) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  userReviews: UserReview[];
  addReview: (review: UserReview) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);

  const addToWishlist = (itemId: string) => {
    setWishlist((prev) => {
      if (!prev.includes(itemId)) {
        return [...prev, itemId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== itemId));
  };

  const isInWishlist = (itemId: string) => {
    return wishlist.includes(itemId);
  };

  const addReview = (review: UserReview) => {
    setUserReviews((prev) => [review, ...prev]);
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    setUserReviews([]);
  };

  const value: UserContextType = {
    user,
    setUser,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    userReviews,
    addReview,
    isLoggedIn: user !== null,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}