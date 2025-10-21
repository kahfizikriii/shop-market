import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong!");
      navigate('/products');
      return;
    }
    
    alert(`Pesanan senilai $${total.toFixed(2)} berhasil dibuat oleh ${user.name}!`);
    clearCart();
    navigate('/dashboard');
  };

  return (
    <div className="checkout-container fade-in">
      <h1 className="checkout-title">✅ Konfirmasi Pembayaran</h1>
      <p className="checkout-greeting">Halo, {user?.name}! Mohon konfirmasi pesanan Anda.</p>

      {cartItems.length === 0 ? (
        <p className="checkout-empty-cart">Keranjang kosong.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3 className="order-summary-title">Ringkasan Pesanan ({cartItems.length} Item)</h3>
            <ul className="order-items-list">
              {cartItems.map(item => (
                <li key={item.id} className="order-item">
                  {item.title} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="final-total">Total Akhir: ${total.toFixed(2)}</h2>

          <button 
            onClick={handlePlaceOrder}
            className="btn-place-order"
          >
            Bayar Sekarang
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;