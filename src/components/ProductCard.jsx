import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = React.memo(({ product }) => {
  const { addItem } = useCart(); // Menggunakan 'addItem' sesuai dengan CartContext
  
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <img src={product.image} alt={product.title} className="product-card-image" />
        <h3 className="product-card-title">{product.title.substring(0, 45)}{product.title.length > 45 ? '...' : ''}</h3>
      </Link>
      <div className="product-card-footer">
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        <button onClick={() => addItem(product)} className="btn-add-to-cart-card">
          ➕ Tambah Keranjang
        </button>
      </div>
    </div>
  );
});

export default ProductCard;