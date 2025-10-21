import { useContext, useCallback, useMemo } from 'react';
import { CartContext } from './contexts/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  const { cartItems, setCartItems } = context;

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, price: product.price }];
      }
    });
  }, [setCartItems]);

  const removeItem = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, [setCartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  return {
    cartItems,
    total,
    totalItems,
    addToCart,
    removeItem,
    clearCart,
  };
};