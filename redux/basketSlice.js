import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: [],
    totalAmount: 0,
    b_quantity: 0
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers:{
        addProducts: (state, action) => {
            state.products.push(action.payload);
            state.b_quantity += 1;
            state.totalAmount += action.payload.price * action.payload.quantity;
        },
        clearBasket: (state) => {
            state.products = [];
            state.b_quantity = 0;
            state.totalAmount = 0;

        },
        removeProduct:  (state, action) => {
            const leftProducts = state.products.filter((product) => product._id !== action.payload._id);
            state.products = leftProducts;
            state.b_quantity -= 1;
            state.totalAmount -= action.payload.price * action.payload.quantity;
        }
    }
})

export const {addProducts, clearBasket, removeProduct} = basketSlice.actions;
export default basketSlice.reducer;