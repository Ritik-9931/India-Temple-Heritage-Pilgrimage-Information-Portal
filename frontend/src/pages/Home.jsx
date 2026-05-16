import React, { useEffect } from "react";

import {
  ArrowRight,
  Landmark,
  MapPin,
  Star,
  Mountain,
  Building2,
  Filter,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemples } from "../redux/slices/templeSlice";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { temples = [], loading, error } = useSelector((state) => state.temple);

  const filterPilgrimage = temples?.filter((temple) =>
    temple.categories?.includes("pilgrimage"),
  );

  const filterArchitecture = temples?.filter((temple) =>
    temple.categories?.includes("architecture"),
  );

  useEffect(() => {
    dispatch(fetchTemples({}));
  }, [dispatch]);

  return (
    <div className="bg-[#f8f5f0] overflow-hidden">
      {userInfo?.role === "admin" && (
        <div className="fixed top-20 right-6 z-50 flex flex-col gap-4">
          {/* Create Temple Button */}
          <button
            onClick={() => navigate("/admin/upload")}
            className="group flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl shadow-2xl transition duration-300 hover:scale-105"
          >
            <div className="bg-white/20 p-2 rounded-xl">
              <Landmark size={22} />
            </div>

            <div className="text-left">
              <h3 className="font-bold text-lg leading-none">Create Temple</h3>

              <p className="text-sm text-orange-100">Add new temple details</p>
            </div>
          </button>

          {/* Create Category Button */}
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

              <p className="text-sm text-gray-300">Manage temple categories</p>
            </div>
          </button>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}

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
            Explore sacred pilgrimage destinations, ancient temple architecture,
            spiritual culture, and divine heritage from across India.
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

      {/* ================= ABOUT SECTION ================= */}

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
              India is home to thousands of ancient temples, pilgrimage
              circuits, spiritual legends, and architectural masterpieces. Every
              temple reflects centuries of devotion, history, and divine energy.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl">
                <Landmark className="text-orange-500 mb-4" size={42} />

                <h3 className="text-2xl font-bold mb-3">Pilgrimage Tours</h3>

                <p className="text-gray-600 leading-7">
                  Visit sacred destinations like Char Dham, Jyotirlinga, and
                  Shakti Peeth temples.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl">
                <Building2 className="text-orange-500 mb-4" size={42} />

                <h3 className="text-2xl font-bold mb-3">
                  Ancient Architecture
                </h3>

                <p className="text-gray-600 leading-7">
                  Explore magnificent temple carvings, sculptures, and
                  historical wonders.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}

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

                <p className="text-gray-600">Famous Temples Listed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PILGRIMAGE SECTION ================= */}

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-3">
              Sacred Pilgrimage
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Famous Pilgrimage Temples
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterPilgrimage.map((temple, index) => (
              <div
                key={index}
                className="bg-[#fffaf5] rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={temple.images?.[0]}
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

                  <button className="flex items-center gap-2 text-orange-500 font-semibold">
                    Explore More
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE SECTION ================= */}

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
            {filterArchitecture.map((temple, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={temple.images?.[0]}
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

                  <button className="flex items-center gap-2 text-orange-500 font-semibold">
                    Discover Heritage
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}

      <section className="bg-orange-500 py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            Begin Your Spiritual Journey Across India
          </h2>

          <p className="text-xl text-orange-100 leading-9 mb-10">
            Discover divine destinations, sacred traditions, and the timeless
            beauty of India’s temple heritage.
          </p>

          <Link
            to="/templeList"
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
