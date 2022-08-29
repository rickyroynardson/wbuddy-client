import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='bg-white shadow rounded-xl mx-4 my-5 px-4 py-3'>
      <h3 className='text-xl'>Register</h3>
      <form className='my-3' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          className='block w-full px-3 py-1.5 border'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          className='block w-full px-3 py-1.5 border'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-400 px-2 py-1 text-sm font-medium text-white rounded-xl disabled:bg-red-200'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
