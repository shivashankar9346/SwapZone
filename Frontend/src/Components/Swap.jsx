import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Swap.css";

const Swap = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [favorite, setFavorite] = useState(false);



    useEffect(() => {

        const getItem = async () => {

            try {

                const response = await fetch(
                    `http://localhost:3000/api/items/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch item"
                    );
                }

                setItem(data.item);

            } catch (err) {

                console.error(err);
                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        if (id) {
            getItem();
        }

    }, [id]);



    const handleFavorite = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            if (!favorite) {

                const response = await fetch(
                    `http://localhost:3000/api/wishlist/${id}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setFavorite(true);

            } else {

                const response = await fetch(
                    `http://localhost:3000/api/wishlist/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setFavorite(false);
            }

        } catch (error) {

            console.error(error);
            alert(error.message);

        }
    };


    const handleMessage = () => {

        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }

        console.log("Message:", message);

        alert("Message sent successfully!");

        setMessage("");
    };


    if (loading) {
        return (
            <div className="swap-page">
                <div className="swap-loading">
                    <div className="loading-icon">📦</div>
                    <h2>Loading item...</h2>
                    <p>Please wait while we fetch the listing.</p>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="swap-page">
                <div className="swap-error">
                    <div className="error-icon">⚠️</div>
                    <h2>Something went wrong</h2>
                    <p>{error}</p>

                    <button onClick={() => navigate("/")}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }


    if (!item) {
        return (
            <div className="swap-page">
                <div className="swap-error">
                    <div className="error-icon">📦</div>
                    <h2>Item not found</h2>
                    <p>This listing may have been removed.</p>

                    <button onClick={() => navigate("/")}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }


    return (

        <div className="swap-page">

            <div className="swap-container">

                {/* Back button */}

                <button
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>


                {/* =========================
                    ITEM CARD
                ========================= */}

                <div className="swap-card">

                    {/* IMAGE */}

                    <div className="swap-image-section">

                        {item.image ? (

                            <img
                                src={`http://localhost:3000${item.image}`}
                                alt={item.bookname}
                                className="swap-image"
                            />

                        ) : (

                            <div className="no-image">
                                📦
                            </div>

                        )}

                    </div>


                    {/* DETAILS */}

                    <div className="swap-details">

                        <div className="swap-title-row">

                            <div>

                                <span className="swap-label">
                                    {item.category}
                                </span>

                                <h1>
                                    {item.bookname}
                                </h1>

                            </div>


                            <button
                                className={`favorite-button ${favorite ? "favorite-active" : ""
                                    }`}
                                onClick={handleFavorite}
                            >
                                {favorite ? "♥" : "♡"}
                            </button>

                        </div>


                        {/* PRICE */}

                        <div className="swap-price">
                            ₹{item.price}
                        </div>


                        {/* CONDITION */}

                        <div className="swap-condition">

                            <span>
                                Condition
                            </span>

                            <strong>
                                {item.condition}
                            </strong>

                        </div>


                        {/* DESCRIPTION */}

                        <div className="swap-description">

                            <h3>
                                Description
                            </h3>

                            <p>
                                {item.description}
                            </p>

                        </div>


                        {/* ACTIONS */}

                        <div className="swap-actions">

                            <button className="buy-button">
                                Buy Item
                            </button>

                            <button className="swap-button">
                                Request Swap
                            </button>

                        </div>


                        {/* MESSAGE SELLER */}

                        <div className="seller-message">

                            <h3>
                                Message the seller
                            </h3>

                            <p>
                                Have a question about this item?
                                Send a message to the seller.
                            </p>

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                placeholder="Hi, is this item still available?"
                            />

                            <button
                                className="message-button"
                                onClick={handleMessage}
                            >
                                Send Message
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Swap;