import { getUserCart } from '@/Helpers/ApiHelper';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    cart: {},
    errorMessage: ""
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.cart.products.find(product => product.productId === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.cart.products.push({ productId, quantity });
            }
        },
        reduceProduct: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.cart.products.find(product => product.productId === productId);

            if (existingProduct) {
                existingProduct.quantity = Math.max(existingProduct.quantity - quantity, 0);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload
            })
    }
})
export const { addProduct, reduceProduct } = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading
export const selectCart = (state) => state.cart.cart
export const selectErrorMessage = (state) => state.cart.errorMessage

export default cartSlice.reducer