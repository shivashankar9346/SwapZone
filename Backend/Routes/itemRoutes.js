import express from "express";
import upload from "../Middleware/upload.js";
import cloudinary from "../DataBase/cloudinary.js";

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


router.get("/cloudinary-signature", (req, res) => {

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: "swapzone/items"
        },
        process.env.CLOUDINARY_API_SECRET
    );

    console.log("TIMESTAMP:", timestamp);
    console.log("SIGNATURE:", signature);

    res.json({
        timestamp,
        signature,
        api_key: process.env.CLOUDINARY_API_KEY
    });
});



router.post( "/", authUser, upload.single("image"), createItem);

router.get("/", getAllItems);

router.get("/my/:userId", authUser, getMyListings);

router.put("/:id",authUser,  upload.single("image"), updateItems);

router.delete("/:id", authUser, deleteItem);

router.get("/:id", getItemById);






export default router;