import {useLoaderData, Link} from "react-router-dom"
import {formatPrice, customFetch, generateAmountOptions} from "../utils"
import { useState } from "react"

import { useDispatch } from "react-redux"
import { addItem } from "../features/cartSlice"


export const loader = async ({params}) =>{
  const {id} = params
  const response = await customFetch(`/products/${id}`)
  const product = response.data.data
  return {product}
}
const SingleProduct = () => {
  const {product} = useLoaderData()
  const {image,title,price,description,colors,company} = product.attributes
  const [productColor, setProductColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)
  const handleAmount = (e) =>{
    setAmount(parseInt(e.target.value))
  }
  const dispatch = useDispatch()
  const cartProduct = {
    cartID : product.id + productColor,
    productID: product.id,
    image, 
    title,
    price,
    company,
    productColor,
    amount
  }

  const addToCart = () =>{
    dispatch(addItem({product: cartProduct}))
  }
  return (
    <section>
      <div className="text-md breadcrumbs"> 
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="grid mt-6 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* {Image}  */}
        <img src={image} alt={title} className="cover 2-96 h-96 rounded lg:w-full" />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl">
            {formatPrice(price)}
          </p>
          <p className="mt-6 leading-8">
            {description}
          </p>
          <div className="mt-6">
            <h4 className="tex-md font-medium tracking-wider capitalize">Colors</h4>
            <div>
              {colors.map((color)=>{
               return <button key={color} type="button" className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary'}`} style={{backgroundColor: color}}
               onClick={() => {
                setProductColor(color)}}
               ></button> 
              })}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="tet-md font-medium tracking-wider capitalize">Amount</h4>
            </label>
            <select className="select select-secondary select-bordered select-md" id="amount" value={amount} onChange={handleAmount}>
              {generateAmountOptions(5)}
            </select>
          </div>
          {/* {cart} */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>Add to bag</button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SingleProduct