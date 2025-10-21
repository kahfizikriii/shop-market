import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

const Cart = () => {
  const { cartItems, total, totalItems, removeItem, clearCart } = useCart();

  return (
    <div className="cart-container fade-in">
      <h1>🛒 Keranjang Belanja ({totalItems})</h1>
      
      {cartItems.length === 0 ? (
        <p className="cart-empty">
          Keranjang Anda kosong. <Link to="/products">Mulai berbelanja!</Link>
        </p>
      ) : (
        <ErrorBoundary>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <span className="cart-item-title">{item.title} (x{item.quantity})</span>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button onClick={() => removeItem(item.id)} className="cart-remove">Hapus</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="cart-total">Total Harga: <strong>${total.toFixed(2)}</strong></h2>
            <div className="cart-actions">
              <button onClick={clearCart} className="btn-clear-cart">Bersihkan</button>
              <Link to="/checkout" className="btn-checkout">Lanjut Checkout</Link>
            </div>
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Cart;