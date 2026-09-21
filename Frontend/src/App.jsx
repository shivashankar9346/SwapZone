 import React from "react"
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Register from "./Pages/register"
import Login from "./Pages/Login"
import ItemList from "./Pages/ItemList"
import Dashboard from "./Pages/Dashboard"
import MyListings from "./Components/MyListings"
import Swap from "./Components/Swap"

import { AuthProvider } from "./Context/auth.context"
import MarketPlace from "./Pages/MarketPlace"
import Wishlist from "./Components/Wishlist"
import EnquiriesAndOffers from "./Components/EnquiriesAndOffers"


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
    },
    {
      path:"/wishlist",
      element:
      <>
      <Navbar/>
      <Wishlist/>
      </>
    },
    {
      path:"/EnquiriesAndOffers",
      element:
      <>
      <Navbar/>
      <EnquiriesAndOffers/>
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