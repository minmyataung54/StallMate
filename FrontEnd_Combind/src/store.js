import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './clientComponents/CartSlice';

const store = configureStore({
	reducer: {
		cart: cartReducer,
	},
});

export default store;