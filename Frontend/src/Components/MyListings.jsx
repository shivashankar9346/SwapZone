import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import "./MyListings.css";

const MyListings = () => {

    const { user, myListings: userData, setMyListings } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const handleDelete = async (itemId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login again");
                return;
            }

            console.log("🗑️ Deleting item:", itemId);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/items/${itemId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            console.log("📡 Delete response:", response.status);
            console.log("📨 Delete data:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete item"
                );
            }

            // Remove deleted item immediately from UI
            setMyListings((previousItems) =>
                previousItems.filter(
                    (item) => item._id !== itemId
                )
            );

            alert("Listing deleted successfully!");

        } catch (err) {

            console.error("❌ DELETE ERROR:", err);

            alert(err.message || "Failed to delete item");
        }
    };

    useEffect(() => {

        console.log("USER IN MY LISTINGS:", user);

        const getMyListings = async () => {

            if (!user?.id) {
                console.log("❌ No user ID found");
                setLoading(false);
                return;
            }

            try {


                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login again");
                    return;
                }

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/items/my/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );




                const data = await response.json();



                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch listings"
                    );
                }

                setMyListings(data.items || []);

            } catch (err) {

                console.log("❌ ERROR:", err);
                setError(err.message);

            } finally {

                setLoading(false);
            }
        };

        getMyListings();

    }, [user]);


    if (loading) {
        return <h2>Loading listings...</h2>;
    }


    if (error) {
        return <h2>{error}</h2>;
    }


    return (
        <div className="listings-page">

            <div className="listings-container">

                <div className="listings-header">

                    <Link className="listingBack-button" to="/dashboard">
                        ← Back
                    </Link>

                    <div>
                        <h1>My Listings</h1>

                        <p>
                            Manage the items you have posted on SwapZone.
                        </p>

                    </div>

                    <div className="listing-count">
                        {userData.length}{" "}
                        {userData.length === 1 ? "Item" : "Items"}
                    </div>


                </div>



                {userData.length > 0 ? (

                    userData.map((item) => (

                        <div
                            className="listing-card"
                            key={item._id}
                        >

                            <div className="listing-image">

                                {item.image ? (

                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${item.image}`}
                                        alt={item.bookname}
                                    />

                                ) : (

                                    <span>📦</span>

                                )}

                            </div>


                            <div className="listing-content">

                                <div className="listing-top">

                                    <h2>
                                        {item.bookname}
                                    </h2>

                                    <span className="condition">
                                        {item.condition}
                                    </span>

                                </div>


                                <p className="listing-description">
                                    {item.description}
                                </p>


                                <div className="listing-details">

                                    <span className="category">
                                        {item.category}
                                    </span>

                                    <span className="price">
                                        ₹{item.price}
                                    </span>

                                </div>


                                <div className="listing-actions">

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="empty-listings">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h2>No listings found</h2>

                        <p>
                            You haven't posted any items yet.
                        </p>

                        <Link
                            to="/add-item"
                            className="create-btn"
                        >
                            + Create Listing
                        </Link>

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyListings;