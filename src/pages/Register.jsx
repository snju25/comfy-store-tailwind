import { Form, Link, redirect } from "react-router-dom"
import { FormInput, SubmitBtn } from "../component"
import { customFetch } from "../utils"
import { toast } from "react-toastify"

export const action = async({request}) =>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try{
    const response = await customFetch.post("/auth/local/register", data)
    toast.success("Account has been created")
    return redirect('/login')
  } catch(error) {
    const errorMessage = error?.response?.data?.error?.message || "please double check your credentials"
    toast.error(errorMessage)
    return null

  }
  return null
}
const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"> 
      <h4 className="text-center text-3xl font-bold">Register</h4>
      <FormInput type="text" label="username" name="username" />
      <FormInput type="email" label="email" name="email" />
      <FormInput type="password" label="password" name="password" />
      <div className="mt-4">
        <SubmitBtn  text='LOGIN'/>
      </div>
      <button className="btn btn-secondary uppercase">Guest User</button> 
      <p className="text-center">Already a member? <Link to="/login" className="ml-2 link link-hover link-primary capitalize text-center" >
            Login
          </Link></p>
      </Form>
    </section>
  )
}
export default Register