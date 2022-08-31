import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">
          <Link to="/">
            <span className="border-b-2 border-sky-600 py-1">Workou</span>t
            Buddy
          </Link>
        </h1>
        <nav>
          {user ? (
            <ul className="flex items-center list-none gap-3">
              <li>{user.email}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center list-none gap-3">
              <li>
                <Link
                  to="/login"
                  className={`py-1 border-b-2  hover:border-sky-600 transition-all duration-200 ${
                    isActive("/login") ? "border-sky-600" : "border-transparent"
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`py-1 border-b-2 hover:border-sky-600 transition-all duration-200 ${
                    isActive("/register")
                      ? "border-sky-600"
                      : "border-transparent"
                  }`}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
