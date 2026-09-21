import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item",
            required: true
        },

        type: {
            type: String,
            enum: ["buy", "swap"],
            required: true
        },

        message: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "cancelled"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;