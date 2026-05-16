import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { Menu, X, Landmark, LogOut } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [mobileMenu, setMobileMenu] = useState(false);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  /* =========================
     NAV LINKS
  ========================= */

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Temples",
      path: "/templeList",
    },

    {
      name: "Pilgrimage",
      path: "/pilgrimage",
    },

    {
      name: "Architecture",
      path: "/architecture",
    },

    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ================= LOGO ================= */}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-orange-500 text-white p-3 rounded-2xl shadow-lg">
            <Landmark size={28} />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
              India Temple
            </h1>

            <p className="text-sm text-orange-500 font-semibold tracking-wide">
              Heritage & Pilgrimage
            </p>
          </div>
        </div>

        {/* ================= DESKTOP MENU ================= */}

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-semibold transition duration-300 hover:text-orange-500 ${
                  isActive ? "text-orange-500" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* ================= RIGHT SIDE ================= */}

        <div className="hidden lg:flex items-center gap-4">
          {userInfo ? (
            <>
              {/* USER NAME */}

              <div className="font-semibold text-gray-700">
                Hello, <span className="text-orange-500">{userInfo.name}</span>
              </div>

              {/* ADMIN BUTTON */}

              {userInfo.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/upload")}
                  className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition duration-300 font-semibold"
                >
                  Admin Panel
                </button>
              )}

              {/* LOGOUT */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg transition duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 font-semibold"
              >
                Login
              </button>

              {/* REGISTER */}

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition duration-300"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden text-gray-800"
        >
          {mobileMenu ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-xl">
          {/* NAV LINKS */}

          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `font-semibold text-lg ${
                    isActive ? "text-orange-500" : "text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* MOBILE USER AREA */}

          <div className="flex flex-col gap-4 mt-8">
            {userInfo ? (
              <>
                <div className="text-center font-bold text-lg">
                  Hello,{" "}
                  <span className="text-orange-500">{userInfo.name}</span>
                </div>

                {userInfo.role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/admin/upload");

                      setMobileMenu(false);
                    }}
                    className="w-full text-center px-6 py-3 rounded-full bg-black text-white font-semibold"
                  >
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={() => {
                    handleLogout();

                    setMobileMenu(false);
                  }}
                  className="w-full text-center px-6 py-3 rounded-full bg-red-500 text-white font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");

                    setMobileMenu(false);
                  }}
                  className="w-full text-center px-6 py-3 rounded-full border border-orange-500 text-orange-500 font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/register");

                    setMobileMenu(false);
                  }}
                  className="w-full text-center px-6 py-3 rounded-full bg-orange-500 text-white font-semibold"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
