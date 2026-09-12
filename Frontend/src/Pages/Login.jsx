import React from 'react'
import "./Login.css"
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {

const navigate = useNavigate()

const[errors,setErrors]=useState(false);
const[error,setError]=useState("")
const[loading,setLoading]=useState(false)

const[formData,setFormData]=useState({
    email:"",
    password:""
})

const validateForm=()=>{
     const e={}

     if(!formData.email.trim()){
      e.email="Email is required"
     }

     if(!formData.password.trim()){
      e.password="Password is required"
     }

     setErrors(e)

     return Object.keys(e).length === 0
    
    
}

const handleForm = (e)=>{

  const { name ,value} = e.target

  setFormData({...formData,[name]:value})

}


const handleSubmit = (e)=>{

    e.preventDefault();
    setError("")

    const isValid = validateForm()
    if(!isValid){
      return
    }

    try{
      setLoading(true)

      const storedUser = localStorage.getItem("SwapZoneUser")

      const user = JSON.parse(storedUser);

      if(!storedUser){

          setError("User is not registered. Please register first.")
        return  
      }

      if(
        formData.email == user.email &&
        formData.password == user.password
      ){
        localStorage.setItem("SwapZoneLoggedIn",true)

         navigate("/")
      }else{
        setError("Invalid email or password")
      }

    }
    catch(err){
      setError("Something went wrong. Please try again.")
    }finally{
      setLoading(false)
    }

}


  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h2>Welcome Back</h2>

          <p>Sign in to your SwapZone account</p>

        </div>


        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              onChange={handleForm}
              value={formData.email}
              placeholder="Enter your email"
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              placeholder="Enter your password"
            />

          </div>


          <button className="login-button">
            Sign In
          </button>

        </form>


        <p className="register-text">
          Don't have an account?
          <a href="/register"> Register here</a>
        </p>

      </div>

    </div>
  )
}

export default Login