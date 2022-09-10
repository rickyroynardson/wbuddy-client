import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <header className='bg-white shadow p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium'>
          <Link to='/'>
            <span className='border-b-2 border-sky-600 py-1'>Workou</span>t
            Buddy
          </Link>
        </h1>
        <nav>
          {user ? (
            <div className='relative'>
              <button
                className='py-1 text-sm'
                onClick={() => setIsOpen(!isOpen)}
              >
                {user.email}
              </button>
              <ul
                className={`absolute right-0 mt-2 w-full rounded-md overflow-hidden bg-white shadow ${
                  isOpen ? "visible" : "invisible"
                }`}
              >
                <li className='text-sm px-3 py-1.5 hover:bg-slate-50'>
                  <button onClick={handleLogout} className='w-full text-start'>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <ul className='flex items-center list-none gap-3'>
              <li>
                <Link
                  to='/login'
                  className={`py-1 border-b-2  hover:border-sky-600 transition-all duration-200 ${
                    isActive("/login") ? "border-sky-600" : "border-transparent"
                  }`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to='/register'
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
