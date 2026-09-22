import express from "express";
import upload from "../Middleware/upload.js";

import {
    createItem,
    getAllItems,
    updateItems,
    getMyListings,
    getItemById
} from "../Controllers/itemController.js";
import authUser from "../Middleware/authUser.js";

const router = express.Router();

router.post(
    "/",
    authUser,

    (req, res, next) => {
        console.log("🔥 AUTH MIDDLEWARE PASSED");
        console.log("REQ.USER:", req.user);
        next();
    },

    upload.single("image"),

    (req, res, next) => {
        console.log("🔥 MULTER PASSED");
        console.log("REQ.FILE:", req.file);
        console.log("REQ.BODY:", req.body);
        next();
    },

    createItem
);

router.get("/", getAllItems);

router.get("/my/:userId", authUser, getMyListings);

router.put("/:id",authUser,  upload.single("image"), updateItems);

router.get("/:id", getItemById);


export default router;