import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./MyListings.css"

const MyListings = () => {

    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("ItemsData")) ||[]

    )

    return (
        <div className="listings-page">

            <div className="listings-container">

                <div className="listings-header">

                    <div>
                       <div>
                        <Link to="/dashboard">🔙</Link>
                       </div>
                       <div>
                         <h1>My Listings</h1>
                        <p>
                            Manage the items you have posted on SwapZone.
                        </p>
                       </div>
                    </div>

                </div>


                {userData.length > 0 ? (

                    
                        userData.map((item, index) => (

                            <div className="listing-card" key={index}>

                                <div className="listing-image">
                                    📦
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

                                        <button className="edit-btn">
                                            Edit
                                        </button>

                                        <button className="delete-btn">
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
                            Start selling or swapping with students.
                        </p>

                        <button className="create-btn">
                            + Create Listing
                        </button>

                    </div>

                )}

            </div>

        </div>
    )
}

export default MyListings