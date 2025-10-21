import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8f8f8' }}>
      <h1 style={{ fontSize: '3em', color: '#ffc107' }}>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Maaf, alamat yang Anda tuju tidak ada.</p>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold', marginTop: '15px', display: 'inline-block' }}>
        ← Kembali ke Daftar Produk
      </Link>
    </div>
  );
};

export default NotFound;