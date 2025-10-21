import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const API_URL = 'https://fakestoreapi.com/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart(); // Menggunakan 'addItem' sesuai dengan CartContext
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Gagal memuat produk ID: ${id}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) return <div className="status-message">Loading Detail...</div>;
  if (error) return <div className="status-message error">Error: {error}</div>;
  if (!product) return <div className="status-message">Produk tidak ditemukan.</div>;

  return (
    <div className="product-detail-container fade-in">
      <div className="product-detail-image-wrapper">
        <img src={product.image} alt={product.title} className="product-detail-image" />
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-category">Kategori: {product.category}</p>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        <button onClick={() => addItem(product)} className="btn-add-to-cart">
          Tambahkan ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;