import { getUserCart } from '@/Helpers/ApiHelper';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    cart: { products: [] },
    errorMessage: ""
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state?.cart?.products?.find(product => product.productId === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state?.cart?.products?.push({ productId, quantity });
            }
        },
        reduceProduct: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state?.cart?.products?.find(product => product.productId === productId);
            const existingProductIndex = state?.cart?.products?.findIndex(product => product.productId === productId)

            if (quantity) {
                if (existingProduct) {
                    if (existingProduct.quantity > 1) {
                        existingProduct.quantity = existingProduct.quantity - quantity
                    } else {
                        state?.cart?.products?.splice(existingProductIndex, 1)
                    }
                }
            } else {
                state?.cart?.products?.splice(existingProductIndex, 1)
            }

        },
    },
})
export const { addProduct, reduceProduct } = cartSlice.actions;

export const selectIsLoading = (state) => state.cart.isLoading
export const selectCart = (state) => state.cart.cart
export const selectErrorMessage = (state) => state.cart.errorMessage

export default cartSlice.reducer