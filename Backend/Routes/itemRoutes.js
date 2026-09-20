import express from "express";
import upload from "../middleware/upload.js";

import {
    createItem,
    getAllItems,
    updateItems,
    getMyListings,
    getItemById
} from "../Controllers/itemController.js";

const router = express.Router();

router.post("/", upload.single("image"), createItem);

router.get("/", getAllItems);

router.get("/my/:userId",getMyListings);

router.put("/:id", upload.single("image"), updateItems);

router.get("/:id", getItemById);


export default router;