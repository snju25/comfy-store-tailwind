import { createSlice } from '@reduxjs/toolkit'
import {toast} from "react-toastify"

const defaultState = {
    cartItems : [],
    numItemsInCart : 0,
    cartTotal: 0,
    shipping: 500,
    orderTotal: 0,
}

const cartSlice = createSlice({
    name: "cartState",
    initialState : JSON.parse(localStorage.getItem("cart")) || defaultState,
    reducers : {
        addItem : (state,action)=>{
            const { product } = action.payload;
            console.log(product.price);
            const item = state.cartItems.find((i) => i.cartID === product.cartID);
            if (item) {
              item.amount += product.amount;
            } else {
              state.cartItems.push(product);
            }
      
            state.numItemsInCart += product.amount;
            state.cartTotal += product.price * product.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Item added to cart');
        },
        clearCart: (state) =>{
            localStorage.getItem("cart", JSON.stringify(defaultState))
            return defaultState;
        },
        removeItem :(state,action) =>{
            const {cartID} = action.payload
            const product = state.cartItems.find((i)=> i.cartID === cartID)
            state.cartItems = state.cartItems.filter((i)=> i.cartID !== cartID)
            
            state.numItemsInCart -= product.amount;
            state.cartTotal -= product.price * product.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast.error('Item removed');
        },
        editItem : (state , action) =>{
            const {amount, cartID} = action.payload;
            const product = state.cartItems.find((i)=> i.cartID === cartID)
            state.numItemsInCart += amount - product.amount 
            state.cartTotal += product.price * (amount - product.amount)
            product.amount = amount
            cartSlice.caseReducers.calculateTotals(state);
            toast.success("cartUpdated")
            
        },
        calculateTotals : (state)=>{
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            localStorage.setItem("cart", JSON.stringify(state))
        }
    }
})

export const {addItem, clearCart, removeItem, editItem } = cartSlice.actions
export default cartSlice.reducer
