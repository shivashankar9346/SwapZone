import Request from "../Models/requestModel.js";
import Item from "../Models/itemModel.js";


export const createBuyRequest = async (req, res) => {

    try {

        const requesterId = req.user.id;
        const { itemId } = req.params;
        const { message } = req.body || {};


        // Find item
        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }


        // Prevent user from buying their own item
        if (item.userId.toString() === requesterId) {

            return res.status(400).json({
                message: "You cannot request your own item"
            });

        }


        // Check existing request
        const existingRequest = await Request.findOne({
            requester: requesterId,
            item: itemId,
            type: "buy",
            status: "pending"
        });


        if (existingRequest) {

            return res.status(400).json({
                message: "You already requested to buy this item"
            });

        }


        // Create request
        const request = await Request.create({

            requester: requesterId,

            seller: item.userId,

            item: itemId,

            type: "buy",

            message: message || ""

        });


        res.status(201).json({

            message: "Buy request sent successfully",

            request

        });


    } catch (error) {

        console.error("BUY REQUEST ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};



export const createSwapRequest = async (req, res) => {

    try {

        const requesterId = req.user.id;

        const { itemId } = req.params;

        const { message } = req.body || {};


        // Find item
        const item = await Item.findById(itemId);


        if (!item) {

            return res.status(404).json({
                message: "Item not found"
            });

        }


        // Prevent own item request
        if (item.userId.toString() === requesterId) {

            return res.status(400).json({
                message: "You cannot request a swap for your own item"
            });

        }


        // Check existing pending request
        const existingRequest = await Request.findOne({

            requester: requesterId,

            item: itemId,

            type: "swap",

            status: "pending"

        });


        if (existingRequest) {

            return res.status(400).json({
                message: "You already requested a swap for this item"
            });

        }


        // Create request
        const request = await Request.create({

            requester: requesterId,

            seller: item.userId,

            item: itemId,

            type: "swap",

            message: message || ""

        });


        res.status(201).json({

            message: "Swap request sent successfully",

            request

        });


    } catch (error) {

        console.error("SWAP REQUEST ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};




export const getReceivedRequests = async (req, res) => {

    try {

        const userId = req.user.id;


        const requests = await Request.find({

            seller: userId

        })

        .populate(
            "requester",
            "name email campusorhostel branch"
        )

        .populate(
            "item"
        )

        .sort({
            createdAt: -1
        });


        res.status(200).json({

            message: "Requests fetched successfully",

            count: requests.length,

            requests

        });


    } catch (error) {

        console.error("GET RECEIVED REQUESTS ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};



export const getMyRequests = async (req, res) => {

    try {

        const userId = req.user.id;


        const requests = await Request.find({

            requester: userId

        })

        .populate(
            "seller",
            "name email campusorhostel branch"
        )

        .populate(
            "item"
        )

        .sort({
            createdAt: -1
        });


        res.status(200).json({

            message: "My requests fetched successfully",

            count: requests.length,

            requests

        });


    } catch (error) {

        console.error("GET MY REQUESTS ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};



export const acceptRequest = async (req, res) => {

    try {

        const userId = req.user.id;

        const { requestId } = req.params;


        const request = await Request.findById(requestId);


        if (!request) {

            return res.status(404).json({
                message: "Request not found"
            });

        }


        // Only seller can accept
        if (request.seller.toString() !== userId) {

            return res.status(403).json({
                message: "You are not authorized to accept this request"
            });

        }


        request.status = "accepted";

        await request.save();


        res.status(200).json({

            message: "Request accepted successfully",

            request

        });


    } catch (error) {

        console.error("ACCEPT REQUEST ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};



export const rejectRequest = async (req, res) => {

    try {

        const userId = req.user.id;

        const { requestId } = req.params;


        const request = await Request.findById(requestId);


        if (!request) {

            return res.status(404).json({
                message: "Request not found"
            });

        }


        // Only seller can reject
        if (request.seller.toString() !== userId) {

            return res.status(403).json({
                message: "You are not authorized to reject this request"
            });

        }


        request.status = "rejected";

        await request.save();


        res.status(200).json({

            message: "Request rejected successfully",

            request

        });


    } catch (error) {

        console.error("REJECT REQUEST ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};



export const cancelRequest = async (req, res) => {

    try {

        const userId = req.user.id;

        const { requestId } = req.params;


        const request = await Request.findById(requestId);


        if (!request) {

            return res.status(404).json({
                message: "Request not found"
            });

        }


        // Only requester can cancel
        if (request.requester.toString() !== userId) {

            return res.status(403).json({
                message: "You are not authorized to cancel this request"
            });

        }


        request.status = "cancelled";

        await request.save();


        res.status(200).json({

            message: "Request cancelled successfully",

            request

        });


    } catch (error) {

        console.error("CANCEL REQUEST ERROR:", error);

        res.status(500).json({
            message: error.message
        });

    }

};