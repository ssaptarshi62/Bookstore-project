import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                alert("Product Added to the Cart");
            } else {
                const addAgain = window.confirm(
                    "This item is already in the cart. Do you want to add it again?"
                );
                if (addAgain) {
                    existingItem.quantity += 1;
                    alert("The product quantity has been increased.");
                } else {
                    alert("The product was not added again.");
                }
            }
        },
        removeFromCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                    alert("Product quantity decreased in the cart.");
                } else {
                    state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
                    alert("Product removed from the cart.");
                }
            } else {
                alert("Product not found in the cart.");
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            alert("Cart cleared.");
        }
    }
});

// Export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
