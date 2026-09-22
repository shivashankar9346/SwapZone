import express from "express";
import upload from "../Middleware/upload.js";

import {
    createItem,
    getAllItems,
    updateItems,
    getMyListings,
    getItemById,
    deleteItem
} from "../Controllers/itemController.js";
import authUser from "../Middleware/authUser.js";

const router = express.Router();

router.post( "/", authUser, upload.single("image"), createItem);

router.get("/", getAllItems);

router.get("/my/:userId", authUser, getMyListings);

router.put("/:id",authUser,  upload.single("image"), updateItems);

router.delete("/:id", authUser, deleteItem);

router.get("/:id", getItemById);



export default router;