import mongoose from "mongoose";

const favItemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Prevent the same user from adding the same item twice
favItemSchema.index(
    { user: 1, item: 1 },
    { unique: true }
);

const FavItem = mongoose.model("FavItem", favItemSchema);

export default FavItem;