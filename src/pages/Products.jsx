import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_URL = 'https://fakestoreapi.com/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Gagal memuat produk dari API.');
        }
        const data = await response.json();
        setProducts(data);
        // Ambil kategori unik dari data produk
        setCategories(['all', ...new Set(data.map(p => p.category))]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Ambil nilai dari query params, atau gunakan nilai default
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || 'all';

  const handleFilterChange = (key, value) => {
    setSearchParams(prevParams => {
      if (value === '' || value === 'all') {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="status-message">Loading...</div>;
  if (error) return <div className="status-message error">Error: {error}</div>;

  return (
    <div className="products-container fade-in">
      <h1 className="products-title">Produk Store</h1>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        )) : <p className="status-message">Produk tidak ditemukan.</p>}
      </div>
    </div>
  );
};

export default Products;