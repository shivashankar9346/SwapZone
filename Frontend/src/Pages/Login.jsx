import React from 'react'
import "./Login.css"
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../Context/UserContext'

const Login = () => {

  const navigate = useNavigate()

  const { loading, handleLogin } = useAuth()

  const [error, setError] = useState("")
  const [errors, setErrors] = useState({});


  const[formData,setFormData]=useState({
      email:"",
      password:""
  })


  //Validate Form

  const validateForm = () => {
    const e = {}

    if (!formData.email.trim()) {
      e.email = "Email is required"
    }

    if (!formData.password.trim()) {
      e.password = "Password is required"
    }

    setErrors(e)

    return Object.keys(e).length === 0


  }

  //Handle input changes

  const handleForm = (e) => {

    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })

    // Remove error when user starts typing
     setErrors({ ...errors, [name]: "" });

  }


  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("")

    const isValid = validateForm()
    if (!isValid) {
      return
    }

    try{

      await handleLogin(formData)
      navigate("/market-place")
    }catch(err){
      console.error("Login error:", err);
       setError( 
        err.response?.data?.message || 
        err.message ||
         "Invalid email or password"
         );
    }

  }

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
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