import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { products } from '../data/products';
import { Tag } from 'lucide-react';

interface SaleProps {
  onAddToCart: (product: Product) => void;
}

export const Sale: React.FC<SaleProps> = ({ onAddToCart }) => {
  // Simulate sale items by applying a discount to some products
  const saleProducts = products.map(product => ({
    ...product,
    originalPrice: product.price,
    price: Math.round(product.price * 0.7), // 30% discount
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Sale Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-8 mb-12 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Summer Sale</h1>
        <p className="text-xl mb-6">Up to 30% off on selected items</p>
        <div className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Tag size={24} />
          <span>Limited Time Offer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {saleProducts.map(product => (
          <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm">
                -30%
              </div>
              <ProductCard product={product} onAddToCart={onAddToCart} />
              <div className="mt-2 text-center">
                <span className="text-gray-500 line-through mr-2">${product.originalPrice}</span>
                <span className="text-rose-600 font-bold">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};