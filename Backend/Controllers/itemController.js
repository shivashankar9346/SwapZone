import express from "express"
import item from "../Models/itemModel.js"

// This is to create a new item
export const createItem = async (req, res) => {
    try {

        const newItem = new item({
            bookname: req.body.bookname,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            condition: req.body.condition,

            image: req.file
                ? `/uploads/${req.file.filename}`
                : ""
        });

        const SavedItem = await newItem.save();

        res.status(201).json({
            message: "Item created Successfully",
            item: SavedItem
        });

    }
    catch (err) {
        res.status(500).json({
            message: "Failed to create item",
            error: err.message
        });


    }
}

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

        const getItems = await item.find(filter).sort({
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

        const updateItem = await item.findByIdAndUpdate(
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