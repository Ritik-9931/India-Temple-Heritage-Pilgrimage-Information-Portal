import React, { useEffect, useState } from "react";

import {
  ArrowRight,
  Landmark,
  MapPin,
  Star,
  Mountain,
  Building2,
  Search,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchTemples } from "../redux/slices/templeSlice";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { temples = [] } = useSelector((state) => state.temple);

  const [search, setSearch] = useState("");

  /* =========================
     FETCH TEMPLES
  ========================= */

  useEffect(() => {
    dispatch(fetchTemples({ page: 1 }));
  }, [dispatch]);

  /* =========================
     SEARCH FILTER
  ========================= */

  const filteredSuggestions = temples
    .filter((temple) => {
      const searchText = search.toLowerCase();

      return (
        temple.templeName?.toLowerCase().includes(searchText) ||
        temple.state?.toLowerCase().includes(searchText) ||
        temple.city?.toLowerCase().includes(searchText)
      );
    })
    .slice(0, 5);

  /* =========================
     PILGRIMAGE TYPES
  ========================= */

  const pilgrimageTypes = [
    "Char Dham",
    "Jyotirlinga",
    "Shakti Peeth",
    "Divya Desam",
  ];

  /* =========================
     ARCHITECTURE TEMPLES
  ========================= */

  const filterArchitecture = temples
    ?.filter((temple) =>
      temple.categories?.includes("architecture"),
    )
    ?.slice(0, 6);

  return (
    <div className="bg-[#f8f5f0] overflow-hidden">
      {/* ================= ADMIN BUTTONS ================= */}

      {userInfo?.role === "admin" && (
        <div className="fixed top-38 right-6 z-50 flex flex-col gap-4">
          <button
            onClick={() => navigate("/admin/upload")}
            className="group flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl shadow-2xl transition duration-300 hover:scale-105"
          >
            <div className="bg-white/20 p-2 rounded-xl">
              <Landmark size={22} />
            </div>

            <div className="text-left">
              <h3 className="font-bold text-lg leading-none">
                Create Temple
              </h3>

              <p className="text-sm text-orange-100">
                Add new temple details
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/admin/category")}
            className="group flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-2xl shadow-2xl transition duration-300 hover:scale-105"
          >
            <div className="bg-white/10 p-2 rounded-xl">
              <Building2 size={22} />
            </div>

            <div className="text-left">
              <h3 className="font-bold text-lg leading-none">
                Create Category
              </h3>

              <p className="text-sm text-gray-300">
                Manage temple categories
              </p>
            </div>
          </button>
        </div>
      )}

      {/* ================= SEARCH ================= */}

      <div className="relative max-w-2xl mx-auto py-6 px-6 z-50">
        <div className="bg-white rounded-2xl shadow-xl flex items-center overflow-hidden border border-gray-200">
          <div className="px-4 text-gray-400">
            <Search size={22} />
          </div>

          <input
            type="text"
            placeholder="Search temple, city or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 outline-none text-gray-700"
          />
        </div>

        {search.trim() !== "" && (
          <div className="absolute left-6 right-6 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((temple) => (
                <div
                  key={temple._id}
                  onClick={() =>
                    navigate(`/templeDetails/${temple._id}`)
                  }
                  className="p-4 border-b cursor-pointer hover:bg-orange-50 transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    {temple.templeName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {temple.city}, {temple.state}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500">
                No temples found
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= HERO ================= */}

      <section className="relative h-screen w-full">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
          alt="Temple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="uppercase tracking-[6px] text-orange-300 mb-4">
            Spiritual Journey Across India
          </p>

          <h1 className="text-5xl md:text-7xl font-black max-w-6xl leading-tight">
            India Temple Heritage & Pilgrimage Portal
          </h1>

          <p className="max-w-3xl text-lg md:text-2xl text-gray-200 mt-8 leading-9">
            Explore sacred pilgrimage destinations, ancient
            architecture, divine culture, and spiritual heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-10">
            <Link
              to="/templeList"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full text-lg font-bold shadow-2xl transition hover:scale-105"
            >
              Explore Temples
            </Link>

            <button className="px-8 py-4 border border-white/40 rounded-full backdrop-blur-md hover:bg-white/10 transition text-lg font-semibold">
              Watch Journey
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-4">
              About Spiritual India
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Discover India’s Sacred Spiritual Heritage
            </h2>

            <p className="text-gray-600 text-lg leading-8 mb-8">
              India is home to thousands of ancient temples,
              pilgrimage circuits, and architectural marvels.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl">
                <Landmark
                  className="text-orange-500 mb-4"
                  size={42}
                />

                <h3 className="text-2xl font-bold mb-3">
                  Pilgrimage Tours
                </h3>

                <p className="text-gray-600 leading-7">
                  Explore Char Dham, Jyotirlinga and sacred
                  pilgrimage destinations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl">
                <Building2
                  className="text-orange-500 mb-4"
                  size={42}
                />

                <h3 className="text-2xl font-bold mb-3">
                  Temple Architecture
                </h3>

                <p className="text-gray-600 leading-7">
                  Discover ancient carvings and stunning
                  architectural wonders.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada"
              alt="Temple"
              className="rounded-[40px] shadow-2xl h-[650px] w-full object-cover"
            />

            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-3xl shadow-2xl flex gap-4 items-center">
              <div className="bg-orange-100 p-4 rounded-2xl">
                <Star className="text-orange-500" size={30} />
              </div>

              <div>
                <h3 className="text-3xl font-black">500+</h3>

                <p className="text-gray-600">
                  Famous Temples Listed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PILGRIMAGE SECTIONS ================= */}

      {pilgrimageTypes.map((type) => {
        const templesByType = temples
          ?.filter((temple) =>
            temple.pilgrimageCircuits?.includes(type),
          )
          ?.slice(0, 3);

        if (templesByType.length === 0) return null;

        return (
          <section
            key={type}
            className="bg-white py-24 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-3">
                  Sacred Pilgrimage
                </p>

                <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                  {type} Temples
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templesByType.map((temple) => (
                  <div
                    key={temple._id}
                    className="bg-[#fffaf5] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
                  >
                    <img
                      src={
                        temple.images?.[0]?.url ||
                        temple.images?.[0]
                      }
                      alt={temple.templeName}
                      className="h-72 w-full object-cover"
                    />

                    <div className="p-7">
                      <div className="flex items-center gap-2 text-orange-500 mb-3">
                        <MapPin size={18} />

                        <span>{temple.city}</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-4">
                        {temple.templeName}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {temple.pilgrimageCircuits?.map(
                          (circuit, index) => (
                            <span
                              key={index}
                              className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold"
                            >
                              {circuit}
                            </span>
                          ),
                        )}
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/templeDetails/${temple._id}`,
                          )
                        }
                        className="flex items-center gap-2 text-orange-500 font-semibold"
                      >
                        Explore More

                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ================= ARCHITECTURE ================= */}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-3">
              Ancient Architecture
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Architectural Marvel Temples
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterArchitecture.map((temple) => (
              <div
                key={temple._id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={
                    temple.images?.[0]?.url ||
                    temple.images?.[0]
                  }
                  alt={temple.templeName}
                  className="h-72 w-full object-cover"
                />

                <div className="p-7">
                  <div className="flex items-center gap-2 text-orange-500 mb-3">
                    <Mountain size={18} />

                    <span>{temple.city}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {temple.templeName}
                  </h3>

                  <button
                    onClick={() =>
                      navigate(`/templeDetails/${temple._id}`)
                    }
                    className="flex items-center gap-2 text-orange-500 font-semibold"
                  >
                    Discover Heritage

                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="bg-orange-500 py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            Begin Your Spiritual Journey Across India
          </h2>

          <p className="text-xl text-orange-100 leading-9 mb-10">
            Discover divine destinations, sacred traditions,
            and the timeless beauty of India’s temple heritage.
          </p>

          <Link
            to="/circuits"
            className="inline-block px-10 py-5 bg-white text-orange-500 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-2xl"
          >
            Explore All Temples
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;