import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user } = useAuthContext();

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={user ? <Dashboard /> : <Navigate to='/login' />}
        />
        <Route
          path='/register'
          element={!user ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
      </Routes>
    </div>
  );
}

export default App;
