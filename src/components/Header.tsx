import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User, Heart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  totalItems: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ totalItems, onCartOpen }) => {
  const { wishlist } = useUser();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="border-b border-gray-100">
          <div className="px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-600">Free shipping on orders over $100</p>
              <div className="flex items-center gap-4">
                <Link to="/track-order" className="text-gray-600 hover:text-gray-900">Track Order</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                ) : (
                  <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-600"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="text-2xl font-bold text-emerald-600">MyStyle</Link>
              <nav className="hidden lg:flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
                <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-gray-900">New Arrivals</Link>
                <Link to="/sale" className="text-gray-600 hover:text-gray-900">Sale</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Search size={24} />
              </button>
              <Link
                to="/wishlist"
                className="p-2 text-gray-600 hover:text-gray-900 relative"
              >
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="p-2 text-gray-600 hover:text-gray-900">
                <User size={24} />
              </Link>
              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchVisible && (
            <div className="mt-4">
              <SearchBar onClose={() => setIsSearchVisible(false)} />
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 border-t pt-4">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
                <Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-gray-900">New Arrivals</Link>
                <Link to="/sale" className="text-gray-600 hover:text-gray-900">Sale</Link>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};