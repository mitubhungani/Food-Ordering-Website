import React, { useState } from "react";
import { useUserStore } from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const { addUser } = useUserStore((ele) => ele);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = signupData;

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
    // console.log(signupData);
    addUser({ ...signupData });
    navigate("/login");
    setSignupData({ name: "", email: "", password: "" });
  };

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={signupData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={signupData.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
        <p className="text-center text-gray-500">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
