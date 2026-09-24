import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EnquiriesAndOffers.css";

const API_URL = "https://swapzone-t5nu.onrender.com";

const EnquiriesAndOffers = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("received");

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================================
  // GET RECEIVED OFFERS
  // =========================================

  const getReceivedRequests = async () => {

    try {

      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/requests/received`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log(
        "📥 RECEIVED REQUESTS:",
        JSON.stringify(data, null, 2)
      );

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch received offers"
        );
      }

      setReceivedRequests(data.requests || []);

    } catch (error) {

      console.error(
        "❌ RECEIVED REQUEST ERROR:",
        error
      );

      setError(error.message);
    }
  };


  // =========================================
  // GET SENT ENQUIRIES
  // =========================================

  const getMyRequests = async () => {

    try {

      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/requests/my`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log(
        "📤 MY REQUESTS:",
        JSON.stringify(data, null, 2)
      );

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch enquiries"
        );
      }

      setMyRequests(data.requests || []);

    } catch (error) {

      console.error(
        "❌ MY REQUEST ERROR:",
        error
      );

      setError(error.message);
    }
  };


  // =========================================
  // LOAD REQUESTS
  // =========================================

  useEffect(() => {

    const loadRequests = async () => {

      setLoading(true);
      setError("");

      await Promise.all([
        getReceivedRequests(),
        getMyRequests()
      ]);

      setLoading(false);
    };

    loadRequests();

  }, []);


  // =========================================
  // ACCEPT REQUEST
  // =========================================

  const acceptRequest = async (requestId) => {

    try {

      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/requests/${requestId}/accept`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to accept request"
        );
      }

      setReceivedRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: "accepted"
              }
            : request
        )
      );

    } catch (error) {

      console.error("ACCEPT ERROR:", error);

      alert(error.message);
    }
  };


  // =========================================
  // REJECT REQUEST
  // =========================================

  const rejectRequest = async (requestId) => {

    try {

      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/requests/${requestId}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to reject request"
        );
      }

      setReceivedRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: "rejected"
              }
            : request
        )
      );

    } catch (error) {

      console.error("REJECT ERROR:", error);

      alert(error.message);
    }
  };


  // =========================================
  // CANCEL REQUEST
  // =========================================

  const cancelRequest = async (requestId) => {

    try {

      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/requests/${requestId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel request"
        );
      }

      setMyRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: "cancelled"
              }
            : request
        )
      );

    } catch (error) {

      console.error("CANCEL ERROR:", error);

      alert(error.message);
    }
  };


  // =========================================
  // STATUS CLASS
  // =========================================

  const getStatusClass = (status) => {

    switch (status) {

      case "accepted":
        return "status-accepted";

      case "rejected":
        return "status-rejected";

      case "cancelled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="enquiries-page">

        <div className="enquiries-loading">

          <div className="loading-spinner"></div>

          <h2>Loading...</h2>

          <p>
            Fetching your enquiries and offers.
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
      <div className="enquiries-page">

        <div className="enquiries-error">

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
          >
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

    <div className="enquiries-page">

      <div className="enquiries-container">


        {/* =====================================
                    HEADER
        ===================================== */}

        <div className="enquiries-header">

          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ←
          </button>

          <div className="header-content">

            <span className="header-label">
              CAMPUS ACTIVITY
            </span>

            <h1>
              Enquiries & Offers
            </h1>

            <p>
              Manage the requests you've received
              and the items you've enquired about.
            </p>

          </div>

        </div>


        {/* =====================================
                    TABS
        ===================================== */}

        <div className="offers-tabs">

          <button
            className={
              activeTab === "received"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("received")}
          >

            <span>
              Received Offers
            </span>

            <span className="tab-count">
              {receivedRequests.length}
            </span>

          </button>


          <button
            className={
              activeTab === "sent"
                ? "active"
                : ""
            }
            onClick={() => setActiveTab("sent")}
          >

            <span>
              Sent Enquiries
            </span>

            <span className="tab-count">
              {myRequests.length}
            </span>

          </button>

        </div>


        {/* =====================================
              RECEIVED OFFERS
        ===================================== */}

        {activeTab === "received" && (

          <div className="requests-section">

            {receivedRequests.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  ↓
                </div>

                <h2>
                  No offers yet
                </h2>

                <p>
                  When someone sends a buy or swap
                  request for your items, it will
                  appear here.
                </p>

              </div>

            ) : (

              <div className="requests-list">

                {receivedRequests.map((request) => (

                  <div
                    className="request-card"
                    key={request._id}
                  >


                    {/* ITEM */}

                    <div className="request-item">

                      <div className="request-image">

                        {request.item?.image ? (

                          <img
                            src={`${API_URL}${request.item.image}`}
                            alt={request.item.bookname}
                          />

                        ) : (

                          <div className="no-image">
                            📦
                          </div>

                        )}

                      </div>


                      <div className="item-info">

                        <span className="request-type">

                          {request.type === "buy"
                            ? "BUY ENQUIRY"
                            : "SWAP ENQUIRY"}

                        </span>

                        <h3>
                          {request.item?.bookname}
                        </h3>

                        <p>
                          ₹{request.item?.price}
                        </p>

                      </div>

                    </div>


                    {/* PERSON */}

                    <div className="request-person">

                      <div className="person-avatar">

                        {request.requester?.name
                          ?.charAt(0)
                          ?.toUpperCase()}

                      </div>

                      <div>

                        <strong>
                          {request.requester?.name}
                        </strong>

                        <span>
                          {request.requester?.email}
                        </span>

                        {request.requester?.campusorhostel && (
                          <span>
                            {request.requester.campusorhostel}
                          </span>
                        )}

                      </div>

                    </div>


                    {/* STATUS */}

                    <div className="request-status-area">

                      <span
                        className={`request-status ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>

                    </div>


                    {/* MESSAGE */}

                    {request.message && (

                      <p className="request-message">
                        "{request.message}"
                      </p>

                    )}


                    {/* ACTIONS */}

                    {request.status === "pending" && (

                      <div className="request-actions">

                        <button
                          className="accept-btn"
                          onClick={() =>
                            acceptRequest(request._id)
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() =>
                            rejectRequest(request._id)
                          }
                        >
                          Reject
                        </button>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        )}


        {/* =====================================
              SENT ENQUIRIES
        ===================================== */}

        {activeTab === "sent" && (

          <div className="requests-section">

            {myRequests.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  ↑
                </div>

                <h2>
                  No enquiries yet
                </h2>

                <p>
                  Buy or swap requests you send
                  will appear here.
                </p>

              </div>

            ) : (

              <div className="requests-list">

                {myRequests.map((request) => (

                  <div
                    className="request-card"
                    key={request._id}
                  >


                    {/* ITEM IMAGE */}

                    <div className="request-image">

                      {request.item?.image ? (

                        <img
                          src={`${API_URL}${request.item.image}`}
                          alt={request.item.bookname}
                        />

                      ) : (

                        <div className="no-image">
                          📦
                        </div>

                      )}

                    </div>


                    {/* CONTENT */}

                    <div className="request-content">

                      <div className="request-top">

                        <div>

                          <span
                            className={`request-type ${request.type}`}
                          >
                            {request.type === "buy"
                              ? "BUY ENQUIRY"
                              : "SWAP ENQUIRY"}
                          </span>

                          <h2>
                            {request.item?.bookname}
                          </h2>

                        </div>


                        <span
                          className={`request-status ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </div>


                      {/* SELLER */}

                      <div className="request-person">

                        <div className="person-avatar">

                          {request.seller?.name
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        <div>

                          <strong>
                            {request.seller?.name}
                          </strong>

                          <span>
                            {request.seller?.email}
                          </span>

                        </div>

                      </div>


                      {/* MESSAGE */}

                      {request.message && (

                        <p className="request-message">
                          "{request.message}"
                        </p>

                      )}


                      {/* DETAILS */}

                      <div className="request-details">

                        <span>
                          ₹{request.item?.price}
                        </span>

                        <span>
                          {request.item?.condition}
                        </span>

                        <span>
                          {request.item?.category}
                        </span>

                      </div>


                      {/* CANCEL */}

                      {request.status === "pending" && (

                        <button
                          className="cancel-btn"
                          onClick={() =>
                            cancelRequest(request._id)
                          }
                        >
                          Cancel Enquiry
                        </button>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default EnquiriesAndOffers;