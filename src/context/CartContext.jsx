import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'INIT_FROM_STORAGE':
      return action.payload || initialState;

    case 'ADD_ITEM': {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find(i => i.id === product.id);
      let items;
      if (existing) {
        items = state.items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      } else {
        items = [...state.items, { ...product, qty }];
      }
      return { ...state, items };
    }

    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      const items = state.items
        .map(i => (i.id === id ? { ...i, qty } : i))
        .filter(i => i.qty > 0);
      return { ...state, items };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // ✅ Step 1: Load from localStorage immediately
  const stored = localStorage.getItem('cart');
  const [state, dispatch] = useReducer(reducer, stored ? JSON.parse(stored) : initialState);

  // ✅ Step 2: Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // ✅ Step 3: Provide helpers + computed values
  const value = useMemo(() => {
    const addItem = (product, qty = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, qty } });
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
    const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const count = state.items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return { ...state, addItem, updateQty, removeItem, clearCart, count, subtotal };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
