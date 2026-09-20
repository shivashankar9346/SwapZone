import express from "express";

import {
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from "../Controllers/wishListController.js";

import authUser from "../Middleware/authUser.js";

const router = express.Router();

// Get user's wishlist
router.get("/", authUser, getWishlist);

// Add item to wishlist
router.post("/:itemId", authUser, addToWishlist);

// Remove item from wishlist
router.delete("/:itemId", authUser, removeFromWishlist);

export default router;