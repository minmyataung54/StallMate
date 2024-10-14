import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './components/CartSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
