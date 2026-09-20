import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema(
    {
        bookname: {
            type: String,
            required: true,
            trim: true

        },
        description: {
            type: String,
            required: true,
            trim: true

        },
        price: {
            type: String,
            required: true,
            trim: true

        },
        category: {
            type: String,
            required: true,
            trim: true

        },
        condition: {

            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            default: ""
        },
           userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }

    },{
        timestamps: true
    }
)

const item = mongoose.model("item", itemsSchema)

export default item;