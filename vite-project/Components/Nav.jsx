import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <ul className="nav">
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
        {/* <li className="nav-item">
          <Link to="/classes/:classId/reviews">Reviews</Link>
        </li> */}
      </ul>
    </div>
  );
}
