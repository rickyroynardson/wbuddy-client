import { Link } from "react-router-dom";
import Login from "../pages/Login";

const Navbar = () => {
  return (
    <header className="bg-white shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">
          <Link to="/">Workout Buddy</Link>
        </h1>
        <nav>
          <ul className="flex items-center list-none gap-3">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
