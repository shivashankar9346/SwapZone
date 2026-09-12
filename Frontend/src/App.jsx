 import React from "react"
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Register from "./Pages/register"
import Login from "./Pages/login"
import ItemList from "./Pages/itemList"
import Dashboard from "./Pages/dashboard"
import MyListings from "./Components/MyListings"

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:
      <>
      <Navbar/>
      <Home/>
      </>
    },{
      path:"/register",
      element:
      <>
      <Navbar/>
      <Register/>
      </>
    },
    {
      path:"/login",
      element:
      <>
      <Navbar/>
      <Login/>
      </>
    },
    {
      path:"/add-item",
      element:
      <>
      <Navbar/>
      <ItemList/>
      </>
    },
      {
      path:"/dashboard",
      element:
      <>
      <Navbar/>
      <Dashboard/>
      </>
    },
    {
      path:"/my-listings",
      element:
      <>
      <Navbar/>
      <MyListings/>
      </>
    }
  ])

  return <RouterProvider router={router} />;
}


export default App