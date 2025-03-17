import { Link } from "react-router-dom";

export default function Nav({ isLoggedIn }) {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            <img src="/IMG_2626.PNG" width="500px"></img>
          </a>
          <div id="navbarNav">
            <ul className="navbar-nav">
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link to="/auth/register">Register</Link>
                </li>
              ) : null}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link to="/auth/login">Login</Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link to="/classes">Classes</Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link to="/account">Account</Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link to="/reviews">Reviews</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <ul classNameName="nav">
        <li classNameName="nav-item">
          <Link to="/auth/register">Register</Link>
        </li>
        <li classNameName="nav-item">
          <Link to="/auth/login">Login</Link>
        </li>
        <li classNameName="nav-item">
          <Link to="/classNamees">classNamees</Link>
        </li>
        <li classNameName="nav-item">
          <Link to="/account">Account</Link>
        </li>
        <li classNameName="nav-item">
          <Link to="/classNamees/:classNameId/reviews">Reviews</Link>
        </li>
      </ul> */}
    </div>
  );
}
