import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import { useAuth } from "../Context/UserContext"

const Dashboard = () => {

    const { user, myListings, wishlist } = useAuth();



    return (
        <div className="dashboard-page">

            <div className="dashboard-container">

                <div className="profile-card">

                    <div className="profile-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="profile-info">

                        <h1>
                            Hi, {user.name}
                        </h1>

                        <p>
                            Manage your SwapZone account
                        </p>

                        <div className="user-details">

                            <span>
                                📍 {user.campusorhostel}
                            </span>

                            <span>
                                ✉️ {user.email}
                            </span>

                            <span>
                                🎓 {user.branch}
                            </span>

                        </div>

                    </div>

                </div>

                <div className="dashboard-content">

                    <div className="dashboard-sidebar">

                        <h3>Dashboard</h3>

                        <ul>

                            <li>
                                <Link to="/dashboard" className="active">
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
                                <Link to="/inquiries">
                                    <span>💬</span>
                                    Inquiries & Offers
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div className="dashboard-main">

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

                        <div className="stats-container">

                            <div className="stat-card">

                                <div className="stat-icon">
                                    📦
                                </div>

                                <div>
                                    <h3>
                                        {myListings.length}{" "}
                                        {myListings.length === 1
                                            ? "Item"
                                            : "Items"}
                                    </h3>
                                    <p>My Listings</p>
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    ♡
                                </div>

                                <div>
                                    <h3>
                                        {wishlist.length}{" "}
                                        {wishlist.length === 1
                                            ? "Item"
                                            : "Items"}
                                    </h3>
                                    <p>Wishlist</p>
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon">
                                    💬
                                </div>

                                <div>
                                    <h3>0</h3>
                                    <p>Offers</p>
                                </div>

                            </div>

                        </div>


                        <div className="activity-card">

                            <div className="activity-header">

                                <h2>Recent Activity</h2>

                                <Link to="/my-listings">
                                    View all
                                </Link>

                            </div>

                            <div className="empty-state">

                                <div className="empty-icon">
                                    📦
                                </div>

                                <h3>No listings yet</h3>

                                <p>
                                    You haven't posted anything yet.
                                    Start by adding your first item.
                                </p>

                                <Link
                                    to="/add-item"
                                    className="empty-btn"
                                >
                                    Create Listing
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard