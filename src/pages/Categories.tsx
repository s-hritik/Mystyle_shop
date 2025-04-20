import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { products } from '../data/products';

interface CategoriesProps {
  onAddToCart: (product: Product) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onAddToCart }) => {
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {categories.map(category => (
        <div key={category} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-emerald-800">{category}</h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products
              .filter(product => product.category === category)
              .map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};