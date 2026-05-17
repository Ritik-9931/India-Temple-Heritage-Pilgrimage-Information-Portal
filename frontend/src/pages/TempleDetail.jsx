import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTempleById } from "../redux/slices/templeSlice";
import NearbyMap from "../components/NearbyMap";

const TempleDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { temple, loading, error } = useSelector((state) => state.temple);

  useEffect(() => {
    dispatch(fetchTempleById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Temple...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-semibold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <>
      {temple && (
        <div className="bg-gray-100 min-h-screen">
          {/* HERO SECTION */}
          <div className="relative h-[70vh] overflow-hidden">
            <img
              src={temple.images?.[0]}
              alt={temple.templeName}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <span className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold mb-5 shadow-lg">
                🛕 Sacred Destination
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                {temple.templeName}
              </h1>

              <p className="text-lg md:text-2xl text-gray-200 max-w-2xl">
                📍 {temple.city}, {temple.state}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white">
                  ⭐ {temple.rating} Rating
                </div>

                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white">
                  🕒 {temple.timing}
                </div>

                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white">
                  🏛️ {temple.architectureStyle}
                </div>
              </div>
            </div>
          </div>

          {/* MAIN SECTION */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* LEFT SIDE */}
              <div className="lg:col-span-2 space-y-10">
                {/* ABOUT */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    About Temple
                  </h2>

                  <p className="text-gray-600 leading-8 text-lg">
                    {temple.history}
                  </p>
                </div>

                {/* TEMPLE INFO */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Temple Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Main Deity</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.deity}
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Architecture</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.architectureStyle}
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Dynasty</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.dynasty}
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Build Year</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.builtYear}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* DRESS CODE */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Dress Code
                  </h2>

                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                    <p className="text-gray-700 leading-8 text-lg">
                      {temple.dressCode
                        ? temple.dressCode
                        : "No specific dress code information available."}
                    </p>
                  </div>
                </div>

                {/* CATEGORIES */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Categories
                  </h2>

                  <div className="flex flex-wrap gap-4">
                    {temple.categories?.map((cat, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold capitalize"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FESTIVALS */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Major Festivals
                  </h2>

                  <div className="flex flex-wrap gap-4">
                    {temple.festivals?.map((fest, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold"
                      >
                        🎉 {fest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GALLERY */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Temple Gallery
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {temple.images?.map((img, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl group"
                      >
                        <img
                          src={img}
                          alt={`temple-${index}`}
                          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-8">
                {/* STATUS CARD */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Temple Status
                  </h2>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Featured Temple</span>

                    <span
                      className={`px-5 py-2 rounded-full text-white font-semibold ${
                        temple.featured ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {temple.featured ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* QUICK INFO */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Quick Info
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <p className="text-gray-500">Location</p>

                      <h3 className="font-semibold text-lg">
                        {temple.city}, {temple.state}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Timing</p>

                      <h3 className="font-semibold text-lg">{temple.timing}</h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Coordinates</p>

                      <h3 className="font-semibold text-lg break-words">
                        {temple.location?.latitude},{" "}
                        {temple.location?.longitude}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* MAP */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <NearbyMap temple={temple} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TempleDetail;
