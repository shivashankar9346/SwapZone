
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <main className="home">

            {/* ================= HERO SECTION ================= */}

            <section className="hero">

                <div className="hero-content">

                    <span className="hero-badge">
                        🎓 Built for Students
                    </span>

                    <h1>
                        Find what you need.
                        <br />
                        <span>Swap on Campus.</span>
                    </h1>

                    <p>
                        SwapZone is a student marketplace where you can
                        buy, sell, and exchange textbooks, electronics,
                        dorm items, and useful skills within your campus
                        community.
                    </p>


                    {/* ================= CALL TO ACTION ================= */}

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="create-account-btn"
                        >
                            Create Account
                        </Link>

                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </section>


            {/* ================= WHY SWAPZONE ================= */}

            <section className="swap-info">

                <div className="section-header">

                    <span className="section-label">
                        HOW IT WORKS
                    </span>

                    <h2>
                        Swap your things. Keep it simple.
                    </h2>

                    <p>
                        Create an account to start buying, selling,
                        and swapping with students around you.
                    </p>

                </div>


                <div className="info-cards">

                    <div className="info-card">

                        <div className="info-icon">
                            📝
                        </div>

                        <h3>
                            Create an Account
                        </h3>

                        <p>
                            Sign up with your student details and
                            create your SwapZone account.
                        </p>

                    </div>


                    <div className="info-card">

                        <div className="info-icon">
                            📦
                        </div>

                        <h3>
                            Post Your Items
                        </h3>

                        <p>
                            List textbooks, electronics, dorm items,
                            or anything useful to other students.
                        </p>

                    </div>


                    <div className="info-card">

                        <div className="info-icon">
                            🔄
                        </div>

                        <h3>
                            Buy or Swap
                        </h3>

                        <p>
                            Connect with students and buy, sell,
                            or exchange items within your campus.
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= BOTTOM CTA ================= */}

            <section className="bottom-cta">

                <h2>
                    Ready to swap your things?
                </h2>

                <p>
                    Join SwapZone and start connecting with students
                    on your campus.
                </p>

                <Link
                    to="/register"
                    className="create-account-btn"
                >
                    Create Your Account
                </Link>

            </section>

        </main>
    );
};

export default Home;

