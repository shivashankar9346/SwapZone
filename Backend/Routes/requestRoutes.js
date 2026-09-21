import express from "express";

import authUser from "../Middleware/authUser.js";

import {
    createBuyRequest,
    createSwapRequest,
    getReceivedRequests,
    getMyRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest
} from "../Controllers/requestController.js";


const router = express.Router();


// Send buy request
router.post("/buy/:itemId",  authUser,  createBuyRequest);


// Send swap request
router.post( "/swap/:itemId",authUser,createSwapRequest);


// Requests received by current user
router.get("/received",authUser,getReceivedRequests);


// Requests sent by current user
router.get("/my",authUser,getMyRequests);


// Accept request
router.put("/:requestId/accept",authUser,acceptRequest);


// Reject request
router.put("/:requestId/reject",authUser,rejectRequest);


// Cancel request
router.put("/:requestId/cancel",authUser,cancelRequest);


export default router;