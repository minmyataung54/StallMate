import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    amount: 0, 
  },
  reducers: {
    addItem(state, action) {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1; 
        } else {
          state.items.push(action.payload); 
        }
      },
    updateQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        const priceDifference = action.payload.quantity > item.quantity 
          ? item.price 
          : -item.price; 
        
        if (action.payload.quantity > 0) {
          state.amount += priceDifference; 
          item.quantity = action.payload.quantity; 
        } else {
          state.amount -= item.price * item.quantity; 
          state.items = state.items.filter(item => item.id !== action.payload.id); 
        }
      }
    },
    removeItem(state, action) {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.amount -= itemToRemove.price * itemToRemove.quantity; 
        state.items = state.items.filter(item => item.id !== action.payload); 
      }
    },
  },
});


export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
