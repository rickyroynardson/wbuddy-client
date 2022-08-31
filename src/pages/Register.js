import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password);
  };

  return (
    <div className="bg-white shadow rounded-xl m-6 p-4">
      <h3 className="text-xl font-semibold text-sky-600">Register</h3>
      {error && (
        <ul className="my-3 text-red-600 list-disc list-inside">
          <li>{error}</li>
        </ul>
      )}
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="block w-full px-3 py-1.5 border rounded-xl text-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            className="block w-full px-3 py-1.5 border rounded-xl text-gray-600 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:shadow"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 w-full px-2 py-2 text-sm font-medium text-white rounded-xl transition-all duration-200 hover:bg-blue-600 disabled:bg-blue-800 focus:bg-blue-600 focus:outline-none focus:ring-2"
        >
          Register
        </button>
        <p className="text-sm my-1 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
