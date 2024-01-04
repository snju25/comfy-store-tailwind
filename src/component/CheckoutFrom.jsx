import { Form, redirect } from "react-router-dom"
import {FormInput, SubmitBtn} from "../component"
import { customFetch, formatPrice } from "../utils"
import { toast } from "react-toastify"
import { clearCart } from "../features/cartSlice"

export const action = (store) => async({request}) =>{
    const formData = await request.formData()
    const  {name,address} = Object.fromEntries(formData)
    const user = store.getState().userState.user
    const {cartItems, orderTotal, numItemsInCart} = store.getState().cartState
    const info = {
        name,address,chargeTotal:orderTotal, orderTotal:formatPrice(orderTotal),cartItems,numItemsInCart
    }
    try{
        const response = await customFetch.post("/orders",{data:info},{
            headers : {
                Authorization : `Bearer ${user.token}`
            }
        })
        store.dispatch(clearCart())
        toast.success("order placed successfully")
        return redirect ("/orders")
    }catch (error){
        const errorMessage = error?.response?.data?.error?.message || "There was an error placing your order"
        toast.error(errorMessage)
        return null
    }
}
const CheckoutFrom = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
        <h4 className="font-medium text-xl capitalize">Shipping information</h4>
        <FormInput label="first Name" name="name" type="text" />
        <FormInput label="Address" name="address" type="text" />
        <div className="mit-4">
            <SubmitBtn text="place your order" />
        </div>

    </Form>
  )
}
export default CheckoutFrom