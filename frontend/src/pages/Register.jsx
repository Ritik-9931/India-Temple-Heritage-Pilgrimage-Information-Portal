import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../redux/slices/authSlice";

import { useNavigate, Link } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name,
        email,
        password,
      }),
    );
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center bg-orange-500 text-white p-12">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Join Us Today
          </h1>

          <p className="text-lg text-orange-100 leading-8">
            Create your account and explore the spiritual heritage of India’s
            most sacred temples.
          </p>

          <img
            src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1200&auto=format&fit=crop"
            alt="Temple"
            className="mt-10 rounded-3xl h-72 object-cover shadow-xl"
          />
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Register</h2>

          <p className="text-gray-500 mb-8">Create your new account</p>

          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition duration-300"
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <span className="px-4 text-gray-400 text-sm">OR CONTINUE WITH</span>

            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google Register */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await fetch(
                    "http://localhost:5000/api/users/google",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        token: credentialResponse.credential,
                      }),
                    },
                  );

                  const data = await res.json();

                  console.log(data);

                  localStorage.setItem("userInfo", JSON.stringify(data));

                  navigate("/");
                } catch (error) {
                  console.log(error);
                }
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>

          {/* Login */}
          <p className="mt-8 text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="text-orange-500 font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
