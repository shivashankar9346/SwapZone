


// import Item from "../Models/itemModel.js";
// import cloudinary from "../DataBase/cloudinary.js"
// import { Readable } from "stream";


// // =====================================
// // CREATE ITEM
// // =====================================

// export const createItem = async (req, res) => {

//     try {

//         console.log("🔥 CREATE ITEM");

//         console.log("BODY:", req.body);

//         console.log(
//             "FILE:",
//             req.file
//                 ? {
//                     name: req.file.originalname,
//                     size: req.file.size,
//                     type: req.file.mimetype
//                 }
//                 : null
//         );


//         // =====================================
//         // CHECK IMAGE
//         // =====================================

//         if (!req.file) {

//             return res.status(400).json({
//                 message: "Image is required"
//             });

//         }


//         // =====================================
//         // UPLOAD TO CLOUDINARY
//         // =====================================
//         // =====================================
//         // UPLOAD TO CLOUDINARY
//         // =====================================

//         const uploadToCloudinary = () => {

//             return new Promise((resolve, reject) => {

//                 const uploadStream =
//                     cloudinary.uploader.upload_stream(
//                         {
//                             folder: "swapzone/items",
//                             resource_type: "image"
//                         },

//                         (error, result) => {

//                             if (error) {

//                                 console.error(
//                                     "☁️ CLOUDINARY ERROR:",
//                                     error
//                                 );

//                                 console.error(
//                                     "☁️ CLOUDINARY ERROR MESSAGE:",
//                                     error.message
//                                 );

//                                 console.error(
//                                     "☁️ CLOUDINARY HTTP CODE:",
//                                     error.http_code
//                                 );

//                                 reject(error);

//                             } else {

//                                 console.log(
//                                     "☁️ CLOUDINARY SUCCESS:",
//                                     result.secure_url
//                                 );

//                                 resolve(result);

//                             }

//                         }
//                     );


//                 Readable
//                     .from(req.file.buffer)
//                     .pipe(uploadStream);

//             });
//         };


//         // =====================================
//         // CREATE ITEM
//         // =====================================

//         const newItem = new Item({

//             bookname: req.body.bookname,

//             description: req.body.description,

//             price: Number(req.body.price),

//             category: req.body.category,

//             condition: req.body.condition,

//             image: cloudinaryResult.secure_url,

//             userId: req.user.id

//         });


//         const savedItem =
//             await newItem.save();


//         // =====================================
//         // RESPONSE
//         // =====================================

//         return res.status(201).json({

//             message: "Item created successfully",

//             item: savedItem

//         });


//     } catch (error) {

//         console.error(
//             "❌ CREATE ITEM ERROR:",
//             error
//         );


//         return res.status(500).json({

//             message: "Failed to create item",

//             error: error.message

//         });

//     }

// };




// export const getAllItems = async (req, res) => {
//     try {

//         const { search, category, condition } = req.query;

//         const filter = {};

//         if (search) {
//             filter.$or = [
//                 {
//                     bookname: {
//                         $regex: search,
//                         $options: "i"
//                     }
//                 },
//                 {
//                     description: {
//                         $regex: search,
//                         $options: "i"
//                     }
//                 }
//             ];
//         }

//         if (category) {
//             filter.category = category;
//         }

//         if (condition) {
//             filter.condition = condition;
//         }

//         const getItems = await Item.find(filter)
//             .populate("userId", "name email")
//             .sort({
//                 createdAt: -1
//             });

//         res.status(200).json({
//             message: "Items fetched successfully",
//             count: getItems.length,
//             items: getItems
//         });

//     } catch (err) {

//         console.error("GET ALL ITEMS ERROR:", err);

//         res.status(500).json({
//             message: "Failed to fetch",
//             error: err.message
//         });
//     }
// };




// // to update an item 

// // export const updateItems = async (req,res) => {
// //     try {

// //         const updateItem = await Item.findByIdAndUpdate(
// //             req.params.id,
// //             req.body,
// //             {
// //                 new: true,
// //                 runValidators: true
// //             }
// //         )

// //         if (!updateItem) {
// //             return res.status(400).json({
// //                 message: "Item not found"
// //             })
// //         }

// //         res.status(200).json({
// //             message: "Item updated successfully",
// //             item: updateItem
// //         });

// //     }
// //     catch (err) {
// //         res.status(500).json({
// //             message: "Failed to update item",
// //             error: err.message
// //         });


// //     }
// // }



// export const updateItems = async (req, res) => {
//     try {

//         const updateData = {
//             ...req.body
//         };

//         if (req.file) {
//             updateData.image = `/uploads/${req.file.filename}`;
//         }

//         const updateItem = await Item.findByIdAndUpdate(
//             req.params.id,
//             updateData,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );

//         if (!updateItem) {
//             return res.status(404).json({
//                 message: "Item not found"
//             });
//         }

//         res.status(200).json({
//             message: "Item updated successfully",
//             item: updateItem
//         });

//     } catch (err) {

//         console.error("❌ UPDATE ITEM ERROR:", err);

//         res.status(500).json({
//             message: "Failed to update item",
//             error: err.message
//         });
//     }
// };

// export const getMyListings = async (req, res) => {

//     try {
//         const { userId } = req.params;

//         const items = await Item.find({
//             userId: userId
//         }).sort({ createdAt: -1 });

//         res.status(200).json({
//             message: "My listings fetched successfully",
//             count: items.length,
//             items
//         });

//     } catch (err) {

//         res.status(500).json({
//             message: "Failed to fetch my listings",
//             error: err.message
//         });

//     }
// };




// export const getItemById = async (req, res) => {
//     try {

//         const foundItem = await Item.findById(req.params.id);

//         if (!foundItem) {
//             return res.status(404).json({
//                 message: "Item not found"
//             });
//         }

//         res.status(200).json({
//             message: "Item fetched successfully",
//             item: foundItem
//         });

//     } catch (err) {

//         console.log("GET ITEM ERROR:", err);

//         res.status(500).json({
//             message: "Failed to fetch item",
//             error: err.message
//         });
//     }
// };



// export const deleteItem = async (req, res) => {
//     try {

//         const itemId = req.params.id;

//         console.log("🗑️ DELETE ITEM:", itemId);
//         console.log("👤 REQUEST USER:", req.user.id);

//         const item = await Item.findById(itemId);

//         if (!item) {
//             return res.status(404).json({
//                 message: "Item not found"
//             });
//         }

//         // Make sure only the owner can delete the item
//         if (item.userId.toString() !== req.user.id.toString()) {
//             return res.status(403).json({
//                 message: "You are not allowed to delete this item"
//             });
//         }

//         await Item.findByIdAndDelete(itemId);

//         console.log("✅ ITEM DELETED:", itemId);

//         res.status(200).json({
//             message: "Item deleted successfully",
//             itemId: itemId
//         });

//     } catch (err) {

//         console.error("❌ DELETE ITEM ERROR:", err);

//         res.status(500).json({
//             message: "Failed to delete item",
//             error: err.message
//         });
//     }
// };




import Item from "../Models/itemModel.js";
import cloudinary from "../DataBase/cloudinary.js";
import { Readable } from "stream";


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
        // UPLOAD TO CLOUDINARY
        // =====================================

        const uploadToCloudinary = () => {

            return new Promise((resolve, reject) => {

                const uploadStream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: "swapzone/items",
                            resource_type: "image"
                        },

                        (error, result) => {

                            if (error) {

                                console.error(
                                    "☁️ CLOUDINARY ERROR:",
                                    error
                                );

                                console.error(
                                    "☁️ CLOUDINARY ERROR MESSAGE:",
                                    error.message
                                );

                                console.error(
                                    "☁️ CLOUDINARY HTTP CODE:",
                                    error.http_code
                                );

                                reject(error);

                            } else {

                                console.log(
                                    "☁️ CLOUDINARY SUCCESS:",
                                    result.secure_url
                                );

                                resolve(result);

                            }

                        }
                    );


                // Send image buffer to Cloudinary
                Readable
                    .from(req.file.buffer)
                    .pipe(uploadStream);

            });

        };


        // =====================================
        // CALL CLOUDINARY UPLOAD
        // =====================================

        const cloudinaryResult =
            await uploadToCloudinary();


        console.log(
            "☁️ CLOUDINARY URL:",
            cloudinaryResult.secure_url
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

            image: cloudinaryResult.secure_url,

            userId: req.user.id

        });


        // =====================================
        // SAVE ITEM
        // =====================================

        const savedItem =
            await newItem.save();


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
        // GET ITEMS + SELLER
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

        const updateData = {
            ...req.body
        };


        // =====================================
        // IMAGE UPDATE
        // =====================================

        if (req.file) {

            updateData.image =
                `/uploads/${req.file.filename}`;

        }


        // =====================================
        // UPDATE
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


        if (!updateItem) {

            return res.status(404).json({

                message: "Item not found"

            });

        }


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

        const { userId } = req.params;


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


        return res.status(200).json({

            message: "My listings fetched successfully",

            count: items.length,

            items

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

        const foundItem =
            await Item.findById(req.params.id)
                .populate(
                    "userId",
                    "name email campusorhostel branch"
                );


        if (!foundItem) {

            return res.status(404).json({

                message: "Item not found"

            });

        }


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

        const itemId = req.params.id;


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

        await Item.findByIdAndDelete(itemId);


        console.log(
            "✅ ITEM DELETED:",
            itemId
        );


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