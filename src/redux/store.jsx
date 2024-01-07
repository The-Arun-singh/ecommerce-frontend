import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { cartReducer } from './reducers/cartSlice';


// this is store for the reducers and all the components collectes data they need from here.
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    // devTools: process.env.NODE_ENV === 'development',  // enable redux dev tools in development mode
});

export default store;