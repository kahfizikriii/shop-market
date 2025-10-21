
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', margin: '20px', borderRadius: '8px', border: '2px solid #e74c3c', backgroundColor: '#fbeff0', textAlign: 'center' }}>
          <h2>🚨 Kesalahan Tak Terduga (Error Boundary) 🚨</h2>
          <p>Bagian aplikasi ini gagal dimuat. Aplikasi inti tetap berjalan.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;