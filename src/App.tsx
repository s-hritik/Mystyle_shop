import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { Wishlist } from './pages/Wishlist';
import { Categories } from './pages/Categories';
import { NewArrivals } from './pages/NewArrivals';
import { Sale } from './pages/Sale';
import { Checkout } from './pages/Checkout';
import { Product, CartItem } from './types';
import { UserProvider } from './context/UserContext';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      quantity === 0
        ? prevItems.filter((item) => item.id !== id)
        : prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-emerald-50">
          <Header
            totalItems={totalItems}
            onCartOpen={() => setIsCartOpen(true)}
          />
          
          <main className="flex-1">
            <Routes>
              {/* All routes are now public */}
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
              <Route path="/search" element={<Search onAddToCart={addToCart} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist onAddToCart={addToCart} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<Categories onAddToCart={addToCart} />} />
              <Route path="/new-arrivals" element={<NewArrivals onAddToCart={addToCart} />} />
              <Route path="/sale" element={<Sale onAddToCart={addToCart} />} />
            </Routes>
          </main>

          <Footer />

          <Cart
            items={cartItems}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
          />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;