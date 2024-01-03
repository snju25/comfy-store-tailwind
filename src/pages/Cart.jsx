import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, editItem } from "../features/cartSlice";
import { useState } from "react";
import { generateAmountOptions } from "../utils";
import SectionTitle from "../component/SectionTitle"
import CartItemsList from "../component/CartItemsList";
import CartTotals from "../component/CartTotals";
import { Link } from "react-router-dom";



const Cart = () => {
  const user = null
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const numItemsInCart = useSelector((state)=> state.cartState.numItemsInCart)
  const dispatch = useDispatch();

  const removeFromCart = (cartID) => {
    dispatch(removeItem({ cartID }));
  };
  const editItemFromCart =(cartID,amount)=>{
    dispatch(editItem({cartID, amount }))
  }

  if(numItemsInCart === 0){
    return <SectionTitle text="Your cart is empty" />
  }

  return (
    <>
      <SectionTitle text="Shopping Cart"  />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? <Link to='/checkout' className="btn btn-primary btn-block mt-8">
            Proceed to checkout
          </Link> : <Link to="/login">
          please login in
          </Link> }
        </div>
      </div>
    </>
  );
};

export default Cart;
