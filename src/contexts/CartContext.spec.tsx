import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const TestComponent = () => {
  const { cart } = useCart();
  return <div data-testid="cart-count">{cart.length}</div>;
};

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should load cart from localStorage on mount and NOT overwrite it with empty array', async () => {
    // Setup initial state in localStorage
    const initialCart = [{ id: 1, name: 'Product 1', price: 10, quantity: 1, image: '' }];
    localStorage.setItem('drugstore-cart', JSON.stringify(initialCart));

    // Render the provider
    await act(async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      );
    });

    // Check if localStorage was read
    expect(localStorage.getItem).toHaveBeenCalledWith('drugstore-cart');

    // Get all calls to setItem
    const calls = vi.mocked(localStorage.setItem).mock.calls;

    // Check that we never wrote "[]" to localStorage
    const emptyWriteCalls = calls.filter(call => call[0] === 'drugstore-cart' && call[1] === '[]');
    expect(emptyWriteCalls.length).toBe(0);
  });
});
