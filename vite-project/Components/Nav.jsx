import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Fitness With Jill!
          </a>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/auth/register">Register</Link>
              </li>
              <li className="nav-item">
                  <Link to="/auth/login">Login</Link>
                </li>
              <li className="nav-item">
                <Link to="/classes">Classes</Link>
              </li>
              <li className="nav-item">
                <Link to="/account">Account</Link>
              </li>
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
