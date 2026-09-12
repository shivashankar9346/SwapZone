import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";

const Home = () => {

  const [loading, setLoading] =useState("true");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");

        const data = await response.json();
        setUserData(data.items || []);


      }
      catch (err) {
        console.log("", err);

      }
      finally {
        setLoading(false);
      }
    }
    getItems()

  }, [])



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
            The ultimate marketplace for students. Buy, sell, or trade
            textbooks, electronics, and skills within your campus community.
          </p>

          {/* ================= SEARCH ================= */}
          <form className="search-form">
            <div className="search-box">
              <input type="text" placeholder="Search for books, electronics, skills..." />
              <button type="submit"> Search</button>
            </div>
            <div className="category-box">
              <select defaultValue="">
                <option value="" disabled> All categories</option>
                <option value="electronics"> Electronics</option>
                <option value="books"> Books</option>
                <option value="dorm"> Dorm Gear</option>
                <option value="skills"> Skills</option>
                <option value="others"> Others</option>
              </select>
            </div>
          </form>
        </div>
      </section>


      {/* ================= LISTING SECTION ================= */}
      <section className="listings">
        <div className="section-header">
          <div>
            <span className="section-label">   EXPLORE </span>
            <h2>   Fresh on SwapZone </h2>
          </div>
          <button className="view-all">   View all → </button>
        </div>

        {/* ================= CARDS ================= */}
        <div className="list-cards">
          {userData.length > 0 ? (
            userData.map((item, index) => (
              <div className="listing-card">
                <div className="card-image">
                  <span>{item.bookname}</span>
                </div>

                <div className="card-content">
                  <h1>{item.bookname}</h1>
                  <span className="category">{item.category}  </span>
                  <h3>    {item.price}  </h3>
                  <p>  {item.description} </p>
                  <div className="card-bottom">
                    <strong> {item.condition} </strong>
                    <button>Swap  </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>  No items</h1>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;