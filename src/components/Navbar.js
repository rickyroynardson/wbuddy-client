import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">
          <Link to="/">Workout Buddy</Link>
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
              {user && <li>{user.email}</li>}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
