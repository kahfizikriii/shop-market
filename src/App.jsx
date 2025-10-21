import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components & Pages
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';

// Halaman 404 sederhana
const NotFound = () => <div style={{textAlign: 'center', padding: '50px'}}><h1>404 | Halaman Tidak Ditemukan</h1><p>Kembali ke <a href="/">produk</a>.</p></div>;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container">
            <Routes>
              {/* Redirect Halaman Utama */}
              <Route path="/" element={<Navigate to="/products" replace />} />
              
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              
              {/* 🔐 Private Routes: Hanya bisa diakses jika sudah login */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} /> {/* <-- CART DIJADIKAN PRIVATE */}
              </Route>
              
              {/* Fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;