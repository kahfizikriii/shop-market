import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container fade-in">
      <h1>Dashboard Pengguna</h1>
      <h2>Selamat Datang, {user?.name}!</h2>
      
      <div className="account-info">
        <h3>Informasi Akun dan Settings</h3>
        <p>Nama Pengguna: <strong>{user?.name}</strong></p>
        <p>Status: <strong className="status-active">Aktif</strong></p>
        <p>Anda dapat mengelola profile dan mengatur settings di sini.</p>
      </div>

      <button onClick={handleLogout} className="btn-logout">
        Keluar Akun
      </button>
    </div>
  );
};

export default Dashboard;