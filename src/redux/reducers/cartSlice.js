import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
};


// this is cart reducer , used to handle the internal state of the user cart activity

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find(item => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
                state.totalQuantity++;
                state.totalPrice += action.payload.price;
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            item.quantity++;
            state.totalQuantity++;
            state.totalPrice += action.payload.price;
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
                state.totalQuantity--;
                state.totalPrice -= action.payload.price;
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter(item => item.id !== action.payload.id);
            state.cart = removeItem;

            state.totalQuantity -= action.payload.quantity;
            state.totalPrice -= (action.payload.price * action.payload.quantity);
        },
        emptyCart: (state, action) => {
            state.cart = []
            state.totalQuantity = 0
            state.totalPrice = 0

        },
    }
})

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    emptyCart,
} = cartSlice.actions;


export default cartSlice;