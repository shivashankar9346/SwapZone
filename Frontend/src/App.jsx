 import React from "react"
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Register from "./Pages/register"
import Login from "./Pages/login"
import ItemList from "./Pages/itemList"
import Dashboard from "./Pages/dashboard"
import MyListings from "./Components/MyListings"
import Swap from "./Components/Swap"

import { AuthProvider } from "./Context/auth.context"
import MarketPlace from "./Pages/MarketPlace"


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
    },{
      path:"/market-place",
      element:
      <><Navbar/>
      <MarketPlace/>
      </>
    },
    {
      path:"/swap/:id",
      element:
       <>
       <Navbar/>
       <Swap/>
      </>
    }
  ])

  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}


export default App