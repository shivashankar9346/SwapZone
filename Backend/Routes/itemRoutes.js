import express from "express";
import upload from "../middleware/upload.js";

import {
    createItem,
    getAllItems,
    updateItems
} from "../Controllers/itemController.js";

const router = express.Router();

router.post("/", upload.single("image"), createItem);

router.get("/", getAllItems);

router.put("/:id", upload.single("image"), updateItems);

export default router;