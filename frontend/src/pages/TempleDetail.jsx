import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  MapPin,
  Star,
  Clock,
  Landmark,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Camera,
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-500 animate-pulse">
          Loading Temple...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <h1 className="text-2xl font-semibold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <>
      {temple && (
        <div className="bg-orange-50 min-h-screen">
          {/* HERO SECTION */}

          <div className="relative h-[75vh] overflow-hidden">
            <img
              src={temple.images?.[0]}
              alt={temple.templeName}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                🛕 Sacred Spiritual Destination
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                {temple.templeName}
              </h1>

              <p className="text-lg md:text-2xl text-gray-200 flex items-center gap-2">
                <MapPin size={24} />
                {temple.city}, {temple.state}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white flex items-center gap-2">
                  <Star size={18} />
                  {temple.rating} Rating
                </div>

                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white flex items-center gap-2">
                  <Clock size={18} />
                  {temple.darshanTimings || "Timing Not Available"}
                </div>

                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl text-white flex items-center gap-2">
                  <Landmark size={18} />
                  {temple.architectureStyle || "Ancient Architecture"}
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
                  <div className="flex items-center gap-3 mb-6">
                    <ScrollText className="text-orange-500" />

                    <h2 className="text-3xl font-bold text-gray-800">
                      About Temple
                    </h2>
                  </div>

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
                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Main Deity</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.deity}
                      </h3>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Architecture Style</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.architectureStyle || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Dynasty</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.dynasty || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Built Year</p>

                      <h3 className="text-xl font-bold text-gray-800">
                        {temple.builtYear || "Unknown"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Address</p>

                      <h3 className="text-lg font-semibold text-gray-800">
                        {temple.address || "Address Not Available"}
                      </h3>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-5">
                      <p className="text-gray-500 mb-2">Darshan Timings</p>

                      <h3 className="text-lg font-semibold text-gray-800">
                        {temple.darshanTimings || "N/A"}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* VISITOR GUIDELINES */}

                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="text-orange-500" />

                    <h2 className="text-3xl font-bold text-gray-800">
                      Visitor Guidelines
                    </h2>
                  </div>

                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                    <p className="text-gray-700 leading-8 text-lg">
                      {temple.visitorGuidelines ||
                        "No visitor guidelines available."}
                    </p>
                  </div>
                </div>

                {/* DRESS CODE */}

                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Dress Code
                  </h2>

                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                    <p className="text-gray-700 leading-8 text-lg">
                      {temple.dressCode ||
                        "No dress code information available."}
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
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-yellow-500" />

                    <h2 className="text-3xl font-bold text-gray-800">
                      Major Festivals
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {temple.festivals?.length > 0 ? (
                      temple.festivals.map((fest, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold"
                        >
                          🎉 {fest}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No festivals available.</p>
                    )}
                  </div>
                </div>

                {/* RITUALS */}

                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Rituals & पूजा
                  </h2>

                  <div className="flex flex-wrap gap-4">
                    {temple.rituals?.length > 0 ? (
                      temple.rituals.map((ritual, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full font-semibold"
                        >
                          🪔 {ritual}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No rituals available.</p>
                    )}
                  </div>
                </div>

                {/* GALLERY */}

                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <Camera className="text-orange-500" />

                    <h2 className="text-3xl font-bold text-gray-800">
                      Temple Gallery
                    </h2>
                  </div>

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
                {/* STATUS */}

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
                      <p className="text-gray-500">Address</p>

                      <h3 className="font-semibold text-lg">
                        {temple.address || "N/A"}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500">Darshan Timings</p>

                      <h3 className="font-semibold text-lg">
                        {temple.darshanTimings || "N/A"}
                      </h3>
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
