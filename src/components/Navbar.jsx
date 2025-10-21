import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false); // Close menu on logout
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
        🛒 ShopApp
      </Link>

      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsMenuOpen(false)}>
          Produk
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </NavLink>
        )}
      </div>

      <div className={`navbar-auth ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsMenuOpen(false)}>
          Keranjang ({totalItems})
        </NavLink>
        {isLoggedIn ? (
          <>
            <span className="user-greeting">Halo, {user?.name}!</span>
            <button onClick={handleLogout} className="btn-logout-nav">Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setIsMenuOpen(false)}>🔐 Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;