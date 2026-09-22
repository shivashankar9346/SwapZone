import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../Context/UserContext";

const Dashboard = () => {

    const { user, myListings, wishlist } = useAuth();

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);

    }, []);


    // ================= LOADING =================

    if (loading) {

        return (
            <div className="dashboard-loading">

                <div className="loading-spinner"></div>

                <h2>Loading Dashboard...</h2>

                <p>Please wait a moment.</p>

            </div>
        );

    }


    return (

        <div className="dashboard-page">

            <div className="dashboard-container">


                {/* ================= PROFILE ================= */}

                <div className="profile-card">

                    <div className="profile-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="profile-info">

                        <h1>
                            Hi, {user?.name}
                        </h1>

                        <p>
                            Manage your SwapZone account
                        </p>

                        <div className="user-details">

                            <span>
                                📍 {user?.campusorhostel}
                            </span>

                            <span>
                                ✉️ {user?.email}
                            </span>

                            <span>
                                🎓 {user?.branch}
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================= CONTENT ================= */}

                <div className="dashboard-content">


                    {/* ================= SIDEBAR ================= */}

                    <div className="dashboard-sidebar">

                        <h3>Dashboard</h3>

                        <ul>

                            <li>
                                <Link
                                    to="/dashboard"
                                    className="active"
                                >
                                    <span>▣</span>
                                    Overview
                                </Link>
                            </li>

                            <li>
                                <Link to="/my-listings">
                                    <span>📦</span>
                                    My Listings
                                </Link>
                            </li>

                            <li>
                                <Link to="/wishlist">
                                    <span>♡</span>
                                    Wishlist
                                </Link>
                            </li>

                            <li>
                                <Link to="/EnquiriesAndOffers">
                                    <span>💬</span>
                                    Enquiries & Offers
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* ================= MAIN ================= */}

                    <div className="dashboard-main">


                        {/* ================= WELCOME ================= */}

                        <div className="welcome-card">

                            <div>

                                <h2>
                                    Welcome to SwapZone 👋
                                </h2>

                                <p>
                                    Start buying, selling and swapping
                                    items with students on your campus.
                                </p>

                            </div>

                            <Link
                                to="/add-item"
                                className="add-item-btn"
                            >
                                + Add Item
                            </Link>

                        </div>


                        {/* ================= STATS ================= */}

                        <div className="stats-container">


                            <div className="stat-card">

                                <div className="stat-icon">
                                    📦
                                </div>

                                <div>

                                    <h3>
                                        {myListings?.length || 0}{" "}
                                        {(myListings?.length || 0) === 1
                                            ? "Item"
                                            : "Items"}
                                    </h3>

                                    <p>
                                        My Listings
                                    </p>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    ♡
                                </div>

                                <div>

                                    <h3>
                                        {wishlist?.length || 0}{" "}
                                        {(wishlist?.length || 0) === 1
                                            ? "Item"
                                            : "Items"}
                                    </h3>

                                    <p>
                                        Wishlist
                                    </p>

                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    💬
                                </div>

                                <div>

                                    <h3>
                                        0
                                    </h3>

                                    <p>
                                        Offers
                                    </p>

                                </div>

                            </div>


                        </div>


                        {/* ================= QUICK ACTIONS ================= */}

                        <div className="quick-actions-card">

                            <div className="quick-actions-header">

                                <div>

                                    <span className="section-label">
                                        GET STARTED
                                    </span>

                                    <h2>
                                        What would you like to do?
                                    </h2>

                                    <p>
                                        Explore the marketplace or manage
                                        your items from one place.
                                    </p>

                                </div>

                            </div>


                            <div className="quick-actions-grid">


                                {/* ADD ITEM */}

                                <Link
                                    to="/add-item"
                                    className="quick-action"
                                >

                                    <div className="quick-action-icon">
                                        +
                                    </div>

                                    <div>

                                        <h3>
                                            Add an Item
                                        </h3>

                                        <p>
                                            Sell or swap something with
                                            students on your campus.
                                        </p>

                                    </div>

                                    <span className="quick-action-arrow">
                                        →
                                    </span>

                                </Link>


                                {/* MARKETPLACE */}

                                <Link
                                    to="/market-place"
                                    className="quick-action"
                                >

                                    <div className="quick-action-icon">
                                        🛍
                                    </div>

                                    <div>

                                        <h3>
                                            Browse Marketplace
                                        </h3>

                                        <p>
                                            Find books, electronics and
                                            other useful items.
                                        </p>

                                    </div>

                                    <span className="quick-action-arrow">
                                        →
                                    </span>

                                </Link>


                                {/* WISHLIST */}

                                <Link
                                    to="/wishlist"
                                    className="quick-action"
                                >

                                    <div className="quick-action-icon">
                                        ♡
                                    </div>

                                    <div>

                                        <h3>
                                            View Wishlist
                                        </h3>

                                        <p>
                                            Check the items you've saved
                                            for later.
                                        </p>

                                    </div>

                                    <span className="quick-action-arrow">
                                        →
                                    </span>

                                </Link>


                                {/* ENQUIRIES */}

                                <Link
                                    to="/EnquiriesAndOffers"
                                    className="quick-action"
                                >

                                    <div className="quick-action-icon">
                                        💬
                                    </div>

                                    <div>

                                        <h3>
                                            Enquiries & Offers
                                        </h3>

                                        <p>
                                            Manage your sent and received
                                            requests.
                                        </p>

                                    </div>

                                    <span className="quick-action-arrow">
                                        →
                                    </span>

                                </Link>


                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;

