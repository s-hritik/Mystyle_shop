import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { products } from '../data/products';
import { Filter, SlidersHorizontal, Heart } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const { wishlist, toggleWishlist } = useUser();
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'newest'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return b.id - a.id;
    }
  });

  const filteredProducts = sortedProducts.filter(p => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-emerald-800">Shop All Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-800">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-800">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-emerald-100 text-emerald-800' : 'hover:bg-emerald-50'
                  }`}
                >
                  All Categories
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category ? 'bg-emerald-100 text-emerald-800' : 'hover:bg-emerald-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-emerald-800">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum Price</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-emerald-600">${priceRange.min}</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum Price</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-emerald-600">${priceRange.max}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('');
                setPriceRange({ min: 0, max: 1000 });
                setSortBy('newest');
              }}
              className="w-full bg-emerald-100 text-emerald-700 py-2 rounded-lg hover:bg-emerald-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <SlidersHorizontal size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="relative group">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      size={20}
                      className={wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};