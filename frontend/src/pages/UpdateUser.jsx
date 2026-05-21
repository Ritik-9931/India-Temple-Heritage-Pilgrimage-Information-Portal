import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

const UpdateUser = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  const updatePassword = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const res = await API.put("/auth/update-password", {
        email,
        password,
      });

      alert(res.data.message);

      localStorage.removeItem("otpVerified");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-yellow-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">
            Update Password
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Create a new secure password
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <div className="w-full px-4 py-3 rounded-xl border bg-gray-100 text-gray-600">
            {email}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          onClick={updatePassword}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-lg"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Your password will be updated securely.
        </p>
      </div>
    </div>
  );
};

export default UpdateUser;
