import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  // Add a function to update user details
  updateUser: (details: Partial<User>) => void;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const demoUser: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  wishlist: []
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const signIn = () => {
    setUser(demoUser);
    setWishlist([2, 5, 9]); // Add some items to the wishlist on sign-in
  };
  
  const signOut = () => {
    setUser(null);
    setWishlist([]);
  };

  // Function to update the user's profile information
  const updateUser = (details: Partial<User>) => {
    if (user) {
      setUser(prevUser => ({ ...prevUser!, ...details }));
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, updateUser, wishlist, toggleWishlist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};