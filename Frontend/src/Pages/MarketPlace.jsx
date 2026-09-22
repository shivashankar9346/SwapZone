
import React, { useEffect, useState } from "react";
import "./MarketPlace.css";
import { useNavigate } from "react-router-dom";

const MarketPlace = () => {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // GET ITEMS
    // =========================

    useEffect(() => {

        const getItems = async () => {

            try {

                setLoading(true);

                const response = await fetch(
                    "http://localhost:3000/api/items"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }

                const data = await response.json();

                console.log("Items:", data);

                setItems(data.items || []);

            } catch (err) {

                console.error(err);

                setError("Unable to load items");

            } finally {

                setLoading(false);

            }
        };

        getItems();

    }, []);


    // =========================
    // SEARCH + CATEGORY FILTER
    // =========================

    const filteredItems = items.filter((item) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            item.bookname?.toLowerCase().includes(searchText) ||
            item.description?.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "" ||
            item.category?.toLowerCase() === category.toLowerCase();

        return matchesSearch && matchesCategory;
    });


    // =========================
    // UI
    // =========================

    return (
        <main className="marketplace-page">

            {/* =========================
                HEADER
            ========================= */}

            <section className="marketplace-header">

                <div>

                    <span className="marketplace-label">
                        SWAPZONE MARKETPLACE
                    </span>

                    <h1>
                        Find what you need.
                        <span> Swap what you have.</span>
                    </h1>

                    <p>
                        Explore items listed by students on your campus.
                        Search, filter and find something useful.
                    </p>

                </div>

            </section>


            {/* =========================
                SEARCH + FILTER
            ========================= */}

            <section className="marketplace-controls">

                <div className="search-wrapper">

                    <span className="search-icon">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search books, electronics, items..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <div className="category-wrapper">

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >

                        <option value="">
                            All Categories
                        </option>

                        <option value="books">
                            Books
                        </option>

                        <option value="electronics">
                            Electronics
                        </option>

                        <option value="dorm">
                            Dorm Gear
                        </option>

                        <option value="skills">
                            Skills
                        </option>

                        <option value="others">
                            Others
                        </option>

                    </select>

                </div>

            </section>


            {/* =========================
                RESULTS INFO
            ========================= */}

            <div className="results-header">

                <div>

                    <span className="results-label">
                        EXPLORE ITEMS
                    </span>

                    <h2>
                        Fresh on SwapZone
                    </h2>

                </div>

                <span className="item-count">
                    {filteredItems.length} items
                </span>

            </div>


            {/* =========================
                LOADING
            ========================= */}

            {loading && (
                <div className="marketplace-message">
                    <h2>Loading items...</h2>
                    <p>Please wait while we fetch the latest listings.</p>
                </div>
            )}


            {/* =========================
                ERROR
            ========================= */}

            {!loading && error && (
                <div className="marketplace-message error-message">
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                </div>
            )}


            {/* =========================
                ITEMS
            ========================= */}

            {!loading && !error && (

                <section className="marketplace-grid">

                    {filteredItems.length > 0 ? (

                        filteredItems.map((item) => (

                            <div
                                className="marketplace-card"
                                key={item._id}
                            >

                                {/* IMAGE */}

                                <div className="marketplace-image">

                                    {item.image ? (

                                        <img
                                            src={
                                                item.image.startsWith("http")
                                                    ? item.image
                                                    : `${import.meta.env.VITE_API_URL}${item.image}`
                                            }
                                            alt={item.bookname}
                                        />

                                    ) : (

                                        <div className="no-image">
                                            📦
                                        </div>

                                    )}

                                    <span className="condition-badge">
                                        {item.condition}
                                    </span>

                                </div>


                                {/* CONTENT */}

                                <div className="marketplace-card-content">

                                    <span className="item-category">
                                        {item.category}
                                    </span>

                                    <h3>
                                        {item.bookname}
                                    </h3>

                                    <p>
                                        {item.description}
                                    </p>


                                    <div className="item-details">

                                        <strong>
                                            ₹{item.price}
                                        </strong>

                                        <button onClick={() => navigate(`/swap/${item._id}`)}>
                                            Swap
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="no-items">

                            <div className="no-items-icon">
                                🔍
                            </div>

                            <h2>
                                No items found
                            </h2>

                            <p>
                                Try another search or category.
                            </p>

                        </div>

                    )}

                </section>

            )}

        </main>
    );
};

export default MarketPlace;

