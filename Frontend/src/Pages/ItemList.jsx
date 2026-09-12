import React, { useState } from 'react'
import "./ItemList.css"
import { useNavigate, Navigate } from 'react-router-dom'

const ItemList = () => {

    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)


    const [Data, setData] = useState({
        bookname: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        image: ""
    })

    const validateData = () => {

        const e = {};
        if (!Data.bookname.trim()) {
            e.bookname = "Bookname is required"
        }

        if (!Data.description.trim()) {
            e.description = "Description is required"
        }
        if (!Data.price.trim()) {
            e.price = "Price is required"
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

        const { name, value ,files} = e.target;

        setData({
            ...Data,
            [name]:name === "image" ? files[0]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");



        const isValid = validateData();

        if (!isValid) {
            return;
        }


        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bookname: Data.bookname,
                    description: Data.description,
                    price: Number(Data.price),
                    category: Data.category,
                    condition: Data.condition,
                    image: Data.image
                })
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Posting failed");
            }

            console.log("Item created:", result.item);

            alert("Listing posted successfully!");

            navigate("/my-listings");


        } catch (err) {
            setError(err.message || "Posting Failed");
        }
        finally {
            setLoading(false);
        }
    }


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
                                onChange={handleForm}
                                accept="image/*"
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