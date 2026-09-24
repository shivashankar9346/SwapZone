import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";


const Register = () => {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading , setLoading] = useState("")

    const [form, setForm] = useState({
        name: "",
        email: "",
        campusorhostel: "",
        branch: "",
        password: ""
    });

    const { handleRegister } = useUser();

    const validateForm = () => {

        const e = {};

        if (!form.name.trim()) {
            e.name = "Name is required";
        }

        if (!form.email.trim()) {
            e.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            e.email = "Invalid email";
        }

        if (!form.campusorhostel.trim()) {
            e.campusorhostel = "Campus or Hostel is required";
        }

        if (!form.branch.trim()) {
            e.branch = "Branch is required";
        }

        if (!form.password || form.password.length < 6) {
            e.password = "Minimum 6 characters";
        }

        setErrors(e);

        return Object.keys(e).length === 0;
    };


    const handleForm = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        try {

           const data = await handleRegister(form);
            console.log("Registration successful:", data);


            navigate("/login");

        } catch (err) {

            console.error("Registration failed:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Registration Failed"
            );
        }
    };


    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }



    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h2>Create Account</h2>

                    <p>Join SwapZone today</p>

                </div>


                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleForm}
                            placeholder="Enter your name"
                        />

                        {errors.name && (
                            <p className="form-error">
                                {errors.name}
                            </p>
                        )}

                    </div>


                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleForm}
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="form-error">
                                {errors.email}
                            </p>
                        )}

                    </div>


                    <div className="form-group">

                        <label>Campus / Hostel</label>

                        <input
                            type="text"
                            name="campusorhostel"
                            value={form.campusorhostel}
                            onChange={handleForm}
                            placeholder="Enter your campus or hostel"
                        />

                        {errors.campusorhostel && (
                            <p className="form-error">
                                {errors.campusorhostel}
                            </p>
                        )}

                    </div>


                    <div className="form-group">

                        <label>Branch</label>

                        <input
                            type="text"
                            name="branch"
                            value={form.branch}
                            onChange={handleForm}
                            placeholder="Enter your branch"
                        />

                        {errors.branch && (
                            <p className="form-error">
                                {errors.branch}
                            </p>
                        )}

                    </div>


                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleForm}
                            placeholder="Create a password"
                        />

                        {errors.password && (
                            <p className="form-error">
                                {errors.password}
                            </p>
                        )}

                    </div>


                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }
                    </button>



                </form>


                <p className="login-text">

                    Already registered?

                    <a href="/login">
                        {" "}Login
                    </a>

                </p>

            </div>

        </div>
    );
};

export default Register;