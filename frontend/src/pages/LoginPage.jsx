import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="mt-32 max-w-lg mx-auto shadow-md rounded-lg py-4 px-3 ">
      <h1 className="text-4xl text-center font-medium mb-4">Login</h1>
      <form className="flex flex-col gap-3 items-center ">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="p-3 rounded-md border w-full hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-3 rounded-md border w-full hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* {!passwordMatch && (
          <p className="text-red-500 "> Password are not matched!</p>
        )} */}

        <button
          type="submit"
          className="bg-primary p-3 w-full text-white rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
          // disabled={!passwordMatch}
        >
          Login
        </button>
      </form>

      <div className="mt-5 flex gap-2">
        <p>New User?</p>
        <Link to={"/register"} className="text-blue-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
