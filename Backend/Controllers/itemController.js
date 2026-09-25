import Item from "../Models/itemModel.js";


// =====================================
// CREATE ITEM
// =====================================

export const createItem = async (req, res) => {

    try {

        console.log("🔥 CREATE ITEM");

        console.log("BODY:", req.body);

        console.log(
            "FILE:",
            req.file
                ? {
                    name: req.file.originalname,
                    filename: req.file.filename,
                    path: req.file.path,
                    size: req.file.size,
                    type: req.file.mimetype
                }
                : null
        );


        // =====================================
        // CHECK IMAGE
        // =====================================

        if (!req.file) {

            return res.status(400).json({
                message: "Image is required"
            });

        }


        // =====================================
        // IMAGE URL
        // =====================================

        const imageUrl =
            `/uploads/${req.file.filename}`;


        console.log(
            "🖼️ IMAGE URL:",
            imageUrl
        );


        // =====================================
        // CREATE ITEM
        // =====================================

        const newItem = new Item({

            bookname: req.body.bookname,

            description: req.body.description,

            price: Number(req.body.price),

            category: req.body.category,

            condition: req.body.condition,

            image: imageUrl,

            userId: req.user.id

        });


        // =====================================
        // SAVE ITEM
        // =====================================

        const savedItem =
            await newItem.save();


        console.log(
            "✅ ITEM SAVED:",
            savedItem
        );


        // =====================================
        // RESPONSE
        // =====================================

        return res.status(201).json({

            message: "Item created successfully",

            item: savedItem

        });


    } catch (error) {

        console.error(
            "❌ CREATE ITEM ERROR:",
            error
        );

        return res.status(500).json({

            message: "Failed to create item",

            error: error.message

        });

    }

};



// =====================================
// GET ALL ITEMS
// =====================================

export const getAllItems = async (req, res) => {

    try {

        const {
            search,
            category,
            condition
        } = req.query;


        // =====================================
        // FILTER
        // =====================================

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

            ];

        }


        if (category) {

            filter.category = category;

        }


        if (condition) {

            filter.condition = condition;

        }


        // =====================================
        // GET ITEMS
        // + SELLER INFORMATION
        // =====================================

        const getItems = await Item.find(filter)

            .populate(
                "userId",
                "name email campusorhostel branch"
            )

            .sort({
                createdAt: -1
            });


        // =====================================
        // RESPONSE
        // =====================================

        return res.status(200).json({

            message: "Items fetched successfully",

            count: getItems.length,

            items: getItems

        });


    } catch (err) {

        console.error(
            "❌ GET ALL ITEMS ERROR:",
            err
        );

        return res.status(500).json({

            message: "Failed to fetch",

            error: err.message

        });

    }

};



// =====================================
// UPDATE ITEM
// =====================================

export const updateItems = async (req, res) => {

    try {

        console.log(
            "✏️ UPDATE ITEM:",
            req.params.id
        );

        console.log(
            "BODY:",
            req.body
        );

        console.log(
            "FILE:",
            req.file
        );


        // =====================================
        // UPDATE DATA
        // =====================================

        const updateData = {
            ...req.body
        };


        // =====================================
        // IMAGE UPDATE
        // =====================================

        if (req.file) {

            updateData.image =
                `/uploads/${req.file.filename}`;

            console.log(
                "🖼️ NEW IMAGE:",
                updateData.image
            );

        }


        // =====================================
        // UPDATE ITEM
        // =====================================

        const updateItem =
            await Item.findByIdAndUpdate(

                req.params.id,

                updateData,

                {
                    new: true,
                    runValidators: true
                }

            );


        // =====================================
        // ITEM NOT FOUND
        // =====================================

        if (!updateItem) {

            return res.status(404).json({

                message: "Item not found"

            });

        }


        // =====================================
        // RESPONSE
        // =====================================

        return res.status(200).json({

            message: "Item updated successfully",

            item: updateItem

        });


    } catch (err) {

        console.error(
            "❌ UPDATE ITEM ERROR:",
            err
        );

        return res.status(500).json({

            message: "Failed to update item",

            error: err.message

        });

    }

};



// =====================================
// GET MY LISTINGS
// =====================================

export const getMyListings = async (req, res) => {

    try {

        const {
            userId
        } = req.params;


        console.log(
            "📋 GET MY LISTINGS:",
            userId
        );


        // =====================================
        // GET USER ITEMS
        // =====================================

        const items = await Item.find({

            userId: userId

        })

            .populate(
                "userId",
                "name email campusorhostel branch"
            )

            .sort({
                createdAt: -1
            });


        // =====================================
        // RESPONSE
        // =====================================

        return res.status(200).json({

            message: "My listings fetched successfully",

            count: items.length,

            items: items

        });


    } catch (err) {

        console.error(
            "❌ GET MY LISTINGS ERROR:",
            err
        );

        return res.status(500).json({

            message: "Failed to fetch my listings",

            error: err.message

        });

    }

};



// =====================================
// GET ITEM BY ID
// =====================================

export const getItemById = async (req, res) => {

    try {

        console.log(
            "🔎 GET ITEM:",
            req.params.id
        );


        // =====================================
        // FIND ITEM
        // =====================================

        const foundItem =
            await Item.findById(req.params.id)

                .populate(
                    "userId",
                    "name email campusorhostel branch"
                );


        // =====================================
        // ITEM NOT FOUND
        // =====================================

        if (!foundItem) {

            return res.status(404).json({

                message: "Item not found"

            });

        }


        // =====================================
        // RESPONSE
        // =====================================

        return res.status(200).json({

            message: "Item fetched successfully",

            item: foundItem

        });


    } catch (err) {

        console.error(
            "❌ GET ITEM ERROR:",
            err
        );

        return res.status(500).json({

            message: "Failed to fetch item",

            error: err.message

        });

    }

};



// =====================================
// DELETE ITEM
// =====================================

export const deleteItem = async (req, res) => {

    try {

        const itemId =
            req.params.id;


        console.log(
            "🗑️ DELETE ITEM:",
            itemId
        );

        console.log(
            "👤 REQUEST USER:",
            req.user.id
        );


        // =====================================
        // FIND ITEM
        // =====================================

        const item =
            await Item.findById(itemId);


        // =====================================
        // ITEM NOT FOUND
        // =====================================

        if (!item) {

            return res.status(404).json({

                message: "Item not found"

            });

        }


        // =====================================
        // CHECK OWNER
        // =====================================

        if (
            item.userId.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                message:
                    "You are not allowed to delete this item"

            });

        }


        // =====================================
        // DELETE
        // =====================================

        await Item.findByIdAndDelete(
            itemId
        );


        console.log(
            "✅ ITEM DELETED:",
            itemId
        );


        // =====================================
        // RESPONSE
        // =====================================

        return res.status(200).json({

            message: "Item deleted successfully",

            itemId: itemId

        });


    } catch (err) {

        console.error(
            "❌ DELETE ITEM ERROR:",
            err
        );

        return res.status(500).json({

            message: "Failed to delete item",

            error: err.message

        });

    }

};