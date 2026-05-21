import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loginUser, setCredentials } from "../redux/slices/authSlice";

import { useNavigate, Link } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  /* =========================
     LOGIN
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email,
        password,
      }),
    );
  };

  /* =========================
     SUCCESS
  ========================= */

  useEffect(() => {
    if (userInfo) {
      toast.success("Login Successful 🎉");

      navigate("/");
    }
  }, [userInfo, navigate]);

  /* =========================
     ERROR
  ========================= */

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-center justify-center px-4 py-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        {/* ================= LEFT ================= */}

        <div className="hidden md:flex flex-col justify-center bg-orange-500 text-white p-8">
          <h1 className="text-4xl font-extrabold mb-5 leading-tight">
            Welcome Back
          </h1>

          <p className="text-base text-orange-100 leading-7">
            Explore sacred temples, discover spiritual places, and continue your
            divine journey.
          </p>

          <img
            src="https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1200&auto=format&fit=crop"
            alt="Temple"
            className="mt-6 rounded-3xl h-52 object-cover shadow-xl"
          />
        </div>

        {/* ================= RIGHT ================= */}

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>

          <p className="text-gray-500 mb-6">Sign in to your account</p>

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl p-3 outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>

            <p className="text-right text-sm">
              Forgot your password?{" "}
              <b
                className="cursor-pointer text-blue-800"
                onClick={() => navigate(`/otp-generate`)}
              >
                Reset Password
              </b>
            </p>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-bold text-base transition duration-300"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-gray-300"></div>

            <span className="px-4 text-gray-400 text-sm">OR CONTINUE WITH</span>

            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* ================= GOOGLE LOGIN ================= */}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await fetch(
                    "https://india-temple-heritage-pilgrimage.onrender.com/api/users/google",
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

                  if (!res.ok) {
                    toast.error(data.message || "Google Login Failed");

                    return;
                  }

                  localStorage.setItem("userInfo", JSON.stringify(data));

                  dispatch(setCredentials(data));

                  toast.success("Login Successful 🎉");

                  navigate("/");
                } catch (error) {
                  console.log(error);

                  toast.error("Something went wrong");
                }
              }}
              onError={() => {
                toast.error("Google Login Failed");
              }}
            />
          </div>

          {/* ================= REGISTER LINK ================= */}

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?
            <Link to="/register" className="text-orange-500 font-semibold ml-2">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
