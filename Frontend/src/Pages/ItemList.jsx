import React, { useState } from 'react'
import "./ItemList.css"
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from "../Context/UserContext";

const ItemList = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [error, setError] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)


    const [Data, setData] = useState({
        bookname: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        image: null
    })

    const validateData = () => {

        const e = {};
        if (!Data.bookname.trim()) {
            e.bookname = "Bookname is required"
        }

        if (!Data.description.trim()) {
            e.description = "Description is required"
        }

        if (!Data.price) {
            e.price = "Price is required";
        } else if (Number(Data.price) < 0) {
            e.price = "Price cannot be negative";
        }

        if (!Data.category.trim()) {
            e.category = "Category is required"
        }

        if (!Data.condition.trim()) {
            e.condition = "condition is required"
        }

        if (!Data.image) {
            e.image = "Image is required"
        }
        setErrors(e)

        return Object.keys(e).length === 0;

    }


    const handleForm = (e) => {

        const { name, value, files } = e.target;

        if (name === "image") {

            setData((previousData) => ({
                ...previousData,
                image: files && files.length > 0
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

        console.log("🔥 SUBMIT BUTTON CLICKED");
        console.log("Current Data:", Data);

        setError("");

        const isValid = validateData();

        console.log("Validation result:", isValid);
        console.log("Validation errors:", errors);

        if (!isValid) {
            console.log("❌ Validation failed");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("bookname", Data.bookname);
            formData.append("description", Data.description);
            formData.append("price", Data.price);
            formData.append("category", Data.category);
            formData.append("condition", Data.condition);
            if (user?.id) {
                formData.append("userId", user.id);
            }

            if (Data.image) {
                formData.append("image", Data.image);
            }

            console.log("📦 Sending FormData");

            const response = await fetch(
                "http://localhost:3000/api/items",
                {
                    method: "POST",
                    body: formData
                }
            );

            console.log("📡 Response received:", response.status);

            const result = await response.json();

            console.log("📨 Backend response:", result);

            if (!response.ok) {
                throw new Error(
                    result.message || "Posting failed"
                );
            }

            console.log("✅ ITEM CREATED:", result.item);

            alert("Listing posted successfully!");

            navigate("/my-listings");

        } catch (err) {

            console.error("❌ POST ERROR:", err);

            setError(err.message || "Posting failed");

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="item-page">

            <div className="item-card">

                <div className="item-header">
                    <h2>Create New Listing</h2>
                    <p>Sell or swap an item with students on your campus.</p>
                </div>


                <form className="item-form" onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Title</label>

                        <input
                            type="text"
                            name="bookname"
                            onChange={handleForm}
                            placeholder="e.g. Engineering Mathematics Book"
                        />

                    </div>


                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            name='description'
                            onChange={handleForm}
                            placeholder="Describe your item..."
                        ></textarea>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>Price</label>

                            <input
                                type="text"
                                name="price"
                                onChange={handleForm}
                                placeholder="₹ Enter price"
                            />

                        </div>


                        <div className="form-group">

                            <label>Category</label>

                            <select name="category" onChange={handleForm}>

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

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>Condition</label>

                            <select name='condition' onChange={handleForm}>

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

                        </div>


                        <div className="form-group">

                            <label>Image</label>

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleForm}
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="post-button"
                        disabled={loading}
                    >
                        {loading ? "Posting..." : "Post Listing"}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default ItemList