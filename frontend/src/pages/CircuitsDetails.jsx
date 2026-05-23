import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import { MapPin, ArrowRight, Star, Landmark, Mountain } from "lucide-react";

import { fetchTemples } from "../redux/slices/templeSlice";

const CircuitsDetails = () => {
  const { pilgrimage } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { temples = [], loading, error } = useSelector((state) => state.temple);

  /* =========================
     FETCH TEMPLES
  ========================= */

  useEffect(() => {
    dispatch(
      fetchTemples({
        page: 1,
        keyword: pilgrimage,
      }),
    );
  }, [dispatch, pilgrimage]);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* HERO SECTION */}

      <div className="relative h-[45vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
          alt="Pilgrimage"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <div className="bg-orange-500/20 backdrop-blur-md border border-orange-300/20 px-6 py-3 rounded-full mb-6">
            <p className="text-orange-200 font-semibold tracking-widest uppercase text-sm">
              Sacred Pilgrimage Circuit
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            {decodeURIComponent(pilgrimage)}
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl leading-9">
            Explore divine temples, spiritual destinations, and sacred heritage
            connected with this pilgrimage circuit.
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* LOADING */}

        {loading && (
          <div className="flex items-center justify-center py-32">
            <h1 className="text-4xl font-black text-orange-500 animate-pulse">
              Loading Temples...
            </h1>
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="bg-red-100 text-red-600 p-6 rounded-3xl text-center text-xl font-semibold">
            {error}
          </div>
        )}

        {/* NO TEMPLE */}

        {!loading && temples?.length === 0 && (
          <div className="bg-white rounded-[40px] shadow-xl p-16 text-center">
            <Landmark size={80} className="mx-auto text-orange-400 mb-6" />

            <h2 className="text-4xl font-black text-gray-800 mb-4">
              No Temples Found
            </h2>

            <p className="text-gray-600 text-lg">
              No temples are available for this pilgrimage circuit.
            </p>
          </div>
        )}

        {/* TEMPLE GRID */}

        {!loading && temples?.length > 0 && (
          <>
            <div className="text-center mb-16">
              <p className="uppercase tracking-[5px] text-orange-500 font-semibold mb-4">
                Divine Destinations
              </p>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Temples in {decodeURIComponent(pilgrimage)}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {temples.map((temple) => (
                <div
                  key={temple._id}
                  className="bg-white rounded-[35px] overflow-hidden shadow-2xl hover:-translate-y-3 transition duration-500 group"
                >
                  {/* IMAGE */}

                  <div className="relative overflow-hidden">
                    <img
                      src={temple?.images?.[0]}
                      alt={temple.templeName}
                      className="h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute top-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl">
                      Sacred Temple
                    </div>

                    <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                      <Star
                        size={16}
                        className="text-orange-500 fill-orange-500"
                      />

                      <span className="font-bold text-gray-800">
                        {temple.rating || 4.5}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-7">
                    {/* LOCATION */}

                    <div className="flex items-center gap-2 text-orange-500 mb-4">
                      <MapPin size={18} />

                      <span className="font-medium">
                        {temple.city}, {temple.state}
                      </span>
                    </div>

                    {/* TITLE */}

                    <h2 className="text-3xl font-black text-gray-900 mb-4 line-clamp-2">
                      {temple.templeName}
                    </h2>

                    {/* HISTORY */}

                    <p className="text-gray-600 leading-7 mb-6 line-clamp-4">
                      {temple.history}
                    </p>

                    {/* INFO */}

                    <div className="space-y-4 mb-7">
                      <div className="flex items-center gap-3">
                        <Landmark size={18} className="text-orange-500" />

                        <span className="text-gray-700 font-medium">
                          {temple.deity}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mountain size={18} className="text-orange-500" />

                        <span className="text-gray-700 font-medium">
                          {temple.architectureStyle || "Ancient Architecture"}
                        </span>
                      </div>
                    </div>

                    {/* CATEGORIES */}

                    <div className="flex flex-wrap gap-3 mb-8">
                      {temple.categories?.slice(0, 4).map((category, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold capitalize"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={() => navigate(`/templeDetails/${temple._id}`)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition duration-300"
                    >
                      Explore Temple
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CircuitsDetails;
