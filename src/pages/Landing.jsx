import { useLoaderData } from "react-router-dom"
import Hero from "../component/Hero"
import { customFetch } from "../utils"
import FeaturedProducts from "../component/FeaturedProducts"


export const loader = async ()=>{
  const response = await customFetch("/products?featured=true")
  const products = response.data.data
  return {products}
}
const Landing = () => {
const {products} =  useLoaderData()
  return (
   <>
    <Hero/>
    <FeaturedProducts />
   </>
  )
}
export default Landing