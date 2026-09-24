import React, { useState } from "react";
import "./ItemList.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const ItemList = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [Data, setData] = useState({
        bookname: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        image: null
    });

    // ================================
    // VALIDATION
    // ================================

    const validateData = () => {
        const e = {};

        if (!Data.bookname.trim()) {
            e.bookname = "Book name is required";
        }

        if (!Data.description.trim()) {
            e.description = "Description is required";
        }

        if (!Data.price) {
            e.price = "Price is required";
        } else if (Number(Data.price) < 0) {
            e.price = "Price cannot be negative";
        }

        if (!Data.category) {
            e.category = "Category is required";
        }

        if (!Data.condition) {
            e.condition = "Condition is required";
        }

        if (!Data.image) {
            e.image = "Image is required";
        }

        setErrors(e);

        return Object.keys(e).length === 0;
    };


    const handleForm = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setData((previousData) => ({
                ...previousData,
                image:
                    files && files.length > 0
                        ? files[0]
                        : null
            }));

            return;
        }

        setData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("🔥 FORM SUBMIT EVENT FIRED");
        console.log("Current Data:", Data);

        setError("");

        // Check API URL
        if (!API_URL) {
            setError("VITE_API_URL is not configured.");
            console.error(
                "❌ VITE_API_URL is undefined. Check your Render environment variable."
            );
            return;
        }

        // Check token
        const token = sessionStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        // Validate
        const isValid = validateData();

        console.log("Validation result:", isValid);

        if (!isValid) {
            console.log("❌ Validation failed:", errors);
            return;
        }

        try {
            setLoading(true);

  
            const formData = new FormData();

            formData.append("bookname", Data.bookname.trim());
            formData.append(
                "description",
                Data.description.trim()
            );
            formData.append("price", Data.price);
            formData.append("category", Data.category);
            formData.append("condition", Data.condition);

            if (Data.image) {
                formData.append("image", Data.image);
            }

            // Debug FormData
            console.log("📦 FormData:");

            for (const [key, value] of formData.entries()) {
                console.log(
                    key,
                    value instanceof File
                        ? value.name
                        : value
                );
            }

            console.log("🌐 API URL:", API_URL);
            console.log(
                "📡 POST:",
                `${API_URL}/api/items`
            );


            const response = await fetch(
                `${API_URL}/api/items`,
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    body: formData
                }
            );

            console.log(
                "📡 Response Status:",
                response.status
            );

            console.log(
                "📡 Response Content-Type:",
                response.headers.get("content-type")
            );

            const contentType =
                response.headers.get("content-type") || "";

            let result;

            if (contentType.includes("application/json")) {
                result = await response.json();
            } else {
                const text = await response.text();

                console.error(
                    "❌ Server returned non-JSON response:"
                );

                console.error(text);

                throw new Error(
                    `Server returned ${response.status}. Check Render backend logs.`
                );
            }

            console.log(
                "📨 Backend response:",
                result
            );

            // ================================
            // HANDLE ERROR
            // ================================

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Failed to create listing"
                );
            }

            // ================================
            // SUCCESS
            // ================================

            console.log(
                "✅ ITEM CREATED:",
                result.item
            );

            alert(
                "Listing posted successfully!"
            );

            navigate("/my-listings");

        } catch (err) {
            console.error(
                "❌ POST ITEM ERROR:",
                err
            );

            setError(
                err.message ||
                "Failed to post listing"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="item-page">

            <div className="item-card">

                <div className="item-header">
                    <h2>Create New Listing</h2>

                    <p>
                        Sell or swap an item with
                        students on your campus.
                    </p>
                </div>

                {/* ERROR */}

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <form
                    className="item-form"
                    onSubmit={handleSubmit}
                >

                    {/* TITLE */}

                    <div className="form-group">

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="bookname"
                            value={Data.bookname}
                            onChange={handleForm}
                            placeholder="e.g. Engineering Mathematics Book"
                        />

                        {errors.bookname && (
                            <small>
                                {errors.bookname}
                            </small>
                        )}

                    </div>

                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={Data.description}
                            onChange={handleForm}
                            placeholder="Describe your item..."
                        />

                        {errors.description && (
                            <small>
                                {errors.description}
                            </small>
                        )}

                    </div>

                    {/* PRICE + CATEGORY */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={Data.price}
                                onChange={handleForm}
                                placeholder="₹ Enter price"
                                min="0"
                            />

                            {errors.price && (
                                <small>
                                    {errors.price}
                                </small>
                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={Data.category}
                                onChange={handleForm}
                            >

                                <option value="">
                                    Select category
                                </option>

                                <option value="electronics">
                                    Electronics
                                </option>

                                <option value="books">
                                    Books
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

                            {errors.category && (
                                <small>
                                    {errors.category}
                                </small>
                            )}

                        </div>

                    </div>

                    {/* CONDITION + IMAGE */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Condition
                            </label>

                            <select
                                name="condition"
                                value={Data.condition}
                                onChange={handleForm}
                            >

                                <option value="">
                                    Select condition
                                </option>

                                <option value="new">
                                    New
                                </option>

                                <option value="like-new">
                                    Like New
                                </option>

                                <option value="good">
                                    Good
                                </option>

                                <option value="used">
                                    Used
                                </option>

                            </select>

                            {errors.condition && (
                                <small>
                                    {errors.condition}
                                </small>
                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Image
                            </label>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleForm}
                            />

                            {errors.image && (
                                <small>
                                    {errors.image}
                                </small>
                            )}

                        </div>

                    </div>

                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="post-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Posting..."
                            : "Post Listing"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ItemList;

