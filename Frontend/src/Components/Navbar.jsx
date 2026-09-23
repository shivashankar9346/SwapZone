import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth.context";
import { useUser } from "../Context/UserContext";

const Navbar = () => {

  const navigate = useNavigate();
  
  const { user } = useAuth();
const { handleLogout: logout } = useUser();


  const handleLogout = () => {
    logout()
    navigate("/login");
  };


  return (
    <nav className="Navbar-container">

      <div className="right-side">

        <Link to={user ? "/market-place" : "/"} className="logo">
          <span>Swap</span>Zone
        </Link>

      </div>


      {user ? (

        <div className="loggedin-nav">

          <ul>

            <li>
              <Link to="/add-item">
                Add Item
              </Link>
            </li>

            <li>
              <Link to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>


      ) : (

        <div className="left-side">

          <ul>

            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </li>

          </ul>

        </div>

      )}

    </nav>
  );
};

export default Navbar;