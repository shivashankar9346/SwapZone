import FavItem from "../Models/favItemsModel.js";


// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const { itemId } = req.params;

        console.log("USER ID:", userId);
        console.log("ITEM ID:", itemId);
        console.log("PARAMS:", req.params);

        const existingItem = await FavItem.findOne({
            user: userId,
            item: itemId
        });

        if (existingItem) {
            return res.status(400).json({
                message: "Item already in wishlist"
            });
        }

        const favorite = await FavItem.create({
            user: userId,
            item: itemId
        });

        res.status(201).json({
            message: "Item added to wishlist",
            favorite
        });

    } catch (error) {

        console.error("ADD WISHLIST ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
    try {

        const userId = req.user.id;
        const { itemId } = req.params;

        console.log("DELETE USER ID:", userId);
        console.log("DELETE ITEM ID:", itemId);

        // Find wishlist record
        const wishlistItem = await FavItem.findOne({
            user: userId,
            item: itemId
        });

        console.log("FOUND WISHLIST ITEM:", wishlistItem);

        if (!wishlistItem) {
            return res.status(404).json({
                message: "Item not found in wishlist"
            });
        }

        // Delete wishlist record
        await FavItem.findByIdAndDelete(wishlistItem._id);

        res.status(200).json({
            message: "Item removed from wishlist"
        });

    } catch (error) {

        console.error("REMOVE WISHLIST ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
    try {

        const userId = req.user.id;

               const wishlist = await FavItem
            .find({ user: userId })
            .populate({
                path: "item",
                populate: {
                    path: "userId",
                    select: "name email campusorhostel branch"
                }
            });

        res.status(200).json({
            wishlist
        });

    } catch (error) {

        console.error("GET WISHLIST ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};