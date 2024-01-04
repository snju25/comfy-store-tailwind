import { customFetch } from "../utils"
import {SectionTitle, PaginationContainer,OrdersList} from "../component"
import { useLoaderData } from "react-router-dom"
import ComplexPaginationContainer from "../component/ComplexPaginationContainer"

export const loader = (store) => async ({request}) =>{
  const user = store.getState().userState.user
  if(!user){
    toast.warn("You must  be logged in to view the orders")
    return redirect("/login")
  }
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  try{
    const response =   await customFetch.get('/orders',{
      params, headers:{
        Authorization: `Bearer ${user.token}`
      }
    })
    console.log(response);
    return {orders: response.data.data, meta: response.data.meta}
  }
  catch(error){
    console.log(error);
  }
  return null
}
const Orders = () => {
  const {meta} = useLoaderData()
  if(meta.pagination.total < 1){
    return <SectionTitle text="please make an order" />
  }

  return (
    <>
    <SectionTitle  text="Your orders"/>
    <OrdersList />
    <ComplexPaginationContainer />

    </>
  )
}
export default Orders