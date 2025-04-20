import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { products } from '../data/products';
import { Sparkles } from 'lucide-react';

interface NewArrivalsProps {
  onAddToCart: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onAddToCart }) => {
  // Simulate new arrivals by taking the first few products
  const newArrivals = products.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-emerald-600" size={24} />
          <h1 className="text-4xl font-bold text-emerald-800">New Arrivals</h1>
        </div>
        <p className="text-emerald-600 text-lg">Discover our latest collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newArrivals.map(product => (
          <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                New
              </div>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};