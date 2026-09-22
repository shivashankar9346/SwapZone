import express from "express"
import Item from "../Models/itemModel.js"

// This is to create a new item
export const createItem = async (req, res) => {
    try {

        console.log("🔥 CREATE ITEM");
        console.log("BODY:", req.body);

        const newItem = new Item({
            bookname: req.body.bookname,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            condition: req.body.condition,
            userId: req.user.id,

            image: req.file
                ? `/uploads/${req.file.filename}`
                : ""
        });

        const savedItem = await newItem.save();

        console.log("✅ ITEM CREATED:", savedItem);

        res.status(201).json({
            message: "Item created successfully",
            item: savedItem
        });

    } catch (err) {

        console.log("❌ CREATE ITEM ERROR:", err);

        res.status(500).json({
            message: "Failed to create item",
            error: err.message
        });
    }
};

// to get all the items

export const getAllItems = async (req, res) => {
    try {


        const { search, category, condition } = req.query;

        const filter = {};
        if (search) {
            filter.$or = [
                {
                    bookname: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        }

        if (category) {
            filter.category = category;
        }
        if (condition) {
            filter.condition = condition;
        }

        const getItems = await Item.find(filter).sort({
            createdAt: -1
        });


        res.status(200).json({
            message: "Items fetched successfully",
            count: getItems.length,
            items: getItems
        })



    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch",
            error: err.message
        })

    }
}

// to update an item 

export const updateItems = async (req,res) => {
    try {

        const updateItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updateItem) {
            return res.status(400).json({
                message: "Item not found"
            })
        }

        res.status(200).json({
            message: "Item updated successfully",
            item: updateItem
        });

    }
    catch (err) {
        res.status(500).json({
            message: "Failed to update item",
            error: err.message
        });


    }
}

export const getMyListings = async (req, res) => {

    try {




        const { userId } = req.params;

        const items = await Item.find({
            userId: userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "My listings fetched successfully",
            count: items.length,
            items
        });

    } catch (err) {

        res.status(500).json({
            message: "Failed to fetch my listings",
            error: err.message
        });

    }
};




export const getItemById = async (req, res) => {
    try {

        const foundItem = await Item.findById(req.params.id);

        if (!foundItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json({
            message: "Item fetched successfully",
            item: foundItem
        });

    } catch (err) {

        console.log("GET ITEM ERROR:", err);

        res.status(500).json({
            message: "Failed to fetch item",
            error: err.message
        });
    }
};



export const deleteItem = async (req, res) => {
    try {

        const itemId = req.params.id;

        console.log("🗑️ DELETE ITEM:", itemId);
        console.log("👤 REQUEST USER:", req.user.id);

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        // Make sure only the owner can delete the item
        if (item.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this item"
            });
        }

        await Item.findByIdAndDelete(itemId);

        console.log("✅ ITEM DELETED:", itemId);

        res.status(200).json({
            message: "Item deleted successfully",
            itemId: itemId
        });

    } catch (err) {

        console.error("❌ DELETE ITEM ERROR:", err);

        res.status(500).json({
            message: "Failed to delete item",
            error: err.message
        });
    }
};