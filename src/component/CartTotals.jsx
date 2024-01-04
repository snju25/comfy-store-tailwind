import { useSelector } from "react-redux"
import { formatPrice } from "../utils"

const CartTotals = () => {
  const {cartTotal, shipping, tax, orderTotal} = useSelector((state)=> state.cartState)

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* {SUBTOTOAL} */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </p>
          {/* {Shipping} */}
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </p>
          {/* {Tax} */}
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </p>
          {/* {SUBTOTOAL} */}
          <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Order Total</span>
          <span className="font-medium">{formatPrice(orderTotal)}</span>
        </p>

      </div>
    </div>
  )
}
export default CartTotals