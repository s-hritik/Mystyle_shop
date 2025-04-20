import React from 'react';
import { useUser } from '../context/UserContext';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { products } from '../data/products';
import { Heart } from 'lucide-react';

interface WishlistProps {
  onAddToCart: (product: Product) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ onAddToCart }) => {
  const { wishlist } = useUser();
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600">Save items you love to your wishlist</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};