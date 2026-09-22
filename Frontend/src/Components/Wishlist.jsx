import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, setWishlist } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    // =========================================
    // GET WISHLIST
    // =========================================

    const getWishlist = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/wishlist`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to get wishlist"
                );
            }

            /*
             * Remove wishlist records whose item
             * has already been deleted.
             */
            const validWishlist = (data.wishlist || []).filter(
                (wishlistItem) => wishlistItem?.item
            );

            setWishlist(validWishlist);

        } catch (err) {
            console.error("❌ GET WISHLIST ERROR:", err);
            setError(err.message || "Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWishlist();
    }, []);

    // =========================================
    // REMOVE FROM WISHLIST
    // =========================================

    const removeFromWishlist = async (itemId) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/wishlist/${itemId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to remove item"
                );
            }

            // Remove immediately from UI
            setWishlist((previousWishlist) =>
                previousWishlist.filter(
                    (wishlistItem) =>
                        wishlistItem?.item?._id !== itemId
                )
            );

        } catch (err) {
            console.error("❌ REMOVE WISHLIST ERROR:", err);
            alert(err.message);
        }
    };

    // =========================================
    // LOADING
    // =========================================

    if (loading) {
        return (
            <div className="wishlist-page">
                <div className="wishlist-loading">
                    <h2>Loading Wishlist...</h2>

                    <p>
                        Please wait while we fetch your saved items.
                    </p>
                </div>
            </div>
        );
    }

    // =========================================
    // ERROR
    // =========================================

    if (error) {
        return (
            <div className="wishlist-page">
                <div className="wishlist-error">
                    <h2>Something went wrong</h2>

                    <p>{error}</p>

                    <button onClick={getWishlist}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // =========================================
    // MAIN UI
    // =========================================

    return (
        <div className="wishlist-page">

            <div className="wishlist-container">

                {/* HEADER */}

                <div className="wishlist-header">

                    <div>
                        <button
                            className="back-dashboard-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            ← Back
                        </button>
                    </div>

                    <div className="Wishlist-headers">

                        <span className="wishlist-label">
                            MY COLLECTION
                        </span>

                        <h1>Wishlist</h1>

                        <p>
                            Items you've saved for later.
                        </p>

                    </div>

                    <div className="wishlist-count">

                        {wishlist.length}{" "}

                        {wishlist.length === 1
                            ? "Item"
                            : "Items"}

                    </div>

                </div>

                {/* EMPTY WISHLIST */}

                {wishlist.length === 0 ? (

                    <div className="empty-wishlist">

                        <div className="empty-icon">
                            ♡
                        </div>

                        <h2>
                            Your wishlist is empty
                        </h2>

                        <p>
                            Save items you like and they'll
                            appear here.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/market-place")
                            }
                        >
                            Explore Items
                        </button>

                    </div>

                ) : (

                    <div className="wishlist-grid">

                        {wishlist.map((wishlistItem) => {

                            /*
                             * Safety check.
                             *
                             * If the item was deleted from
                             * the database, item will be null.
                             */
                            if (!wishlistItem?.item) {
                                return null;
                            }

                            const item = wishlistItem.item;

                            return (
                                <div
                                    className="wishlist-card"
                                    key={wishlistItem._id}
                                >

                                    {/* IMAGE */}

                                    <div className="wishlist-image">

                                        {item.image ? (

                                            <img
                                                src={`${API_URL}${item.image}`}
                                                alt={
                                                    item.bookname ||
                                                    "Wishlist item"
                                                }
                                            />

                                        ) : (

                                            <div className="no-image">
                                                📦
                                            </div>

                                        )}

                                    </div>


                                    {/* CONTENT */}

                                    <div className="wishlist-content">

                                        <div className="wishlist-top">

                                            <span className="wishlist-category">
                                                {item.category}
                                            </span>

                                            <button
                                                className="remove-button"
                                                onClick={() =>
                                                    removeFromWishlist(
                                                        item._id
                                                    )
                                                }
                                            >
                                                ♥
                                            </button>

                                        </div>


                                        {/* TITLE */}

                                        <h2>
                                            {item.bookname}
                                        </h2>


                                        {/* DESCRIPTION */}

                                        <p className="wishlist-description">
                                            {item.description}
                                        </p>


                                        {/* PRICE + CONDITION */}

                                        <div className="wishlist-info">

                                            <strong>
                                                ₹{item.price}
                                            </strong>

                                            <span>
                                                {item.condition}
                                            </span>

                                        </div>


                                        {/* SELLER */}

                                        <div className="seller-info">

                                            <span className="seller-label">
                                                Posted by
                                            </span>

                                            <strong>
                                                {item.userId?.name ||
                                                    "Unknown seller"}
                                            </strong>

                                        </div>


                                        {/* VIEW ITEM */}

                                        <button
                                            className="view-item-button"
                                            onClick={() =>
                                                navigate(
                                                    `/swap/${item._id}`
                                                )
                                            }
                                        >
                                            View Item
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Wishlist;
