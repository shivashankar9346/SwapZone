import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ItemList from "./Pages/ItemList";
import Dashboard from "./Pages/Dashboard";
import MyListings from "./Components/MyListings";
import Swap from "./Components/Swap";
import MarketPlace from "./Pages/MarketPlace";
import Wishlist from "./Components/Wishlist";
import EnquiriesAndOffers from "./Components/EnquiriesAndOffers";

import ProtectedRoute from "./Components/ProtectedRoute";

import { AuthProvider } from "./Context/auth.context";


const App = () => {

  const router = createBrowserRouter([

    // =========================
    // PUBLIC ROUTES
    // =========================

    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },

    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },

    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },


    // =========================
    // PROTECTED ROUTES
    // =========================

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Dashboard />
        </ProtectedRoute>
      ),
    },

    {
      path: "/market-place",
      element: (
        <ProtectedRoute>
          <Navbar />
          <MarketPlace />
        </ProtectedRoute>
      ),
    },

    {
      path: "/add-item",
      element: (
        <ProtectedRoute>
          <Navbar />
          <ItemList />
        </ProtectedRoute>
      ),
    },

    {
      path: "/my-listings",
      element: (
        <ProtectedRoute>
          <Navbar />
          <MyListings />
        </ProtectedRoute>
      ),
    },

    {
      path: "/wishlist",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Wishlist />
        </ProtectedRoute>
      ),
    },

    {
      path: "/EnquiriesAndOffers",
      element: (
        <ProtectedRoute>
          <Navbar />
          <EnquiriesAndOffers />
        </ProtectedRoute>
      ),
    },

    {
      path: "/swap/:id",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Swap />
        </ProtectedRoute>
      ),
    },

  ]);


  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};


export default App;