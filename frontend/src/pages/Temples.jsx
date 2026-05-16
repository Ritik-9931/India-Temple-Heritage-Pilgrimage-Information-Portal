import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemples } from "../redux/slices/templeSlice";
import { useNavigate } from "react-router-dom";

const Temples = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { temples, loading, error } = useSelector(
    (state) => state.temple
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      fetchTemples({
        page: 1,
        keyword: search,
      })
    );
  }, [dispatch, search]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Explore Temples
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Discover famous temples across India
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by temple name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg font-semibold text-orange-500">
          Loading temples...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* Temple Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {temples?.map((temple) => (
          <div
            key={temple._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={temple.images?.[0]}
                alt={temple.templeName}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {temple.templeName}
              </h2>

              <p className="text-gray-500 mb-3">
                📍 {temple.city}
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {temple.categories?.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Button */}
              <button onClick={()=>navigate(`/templeDetails/${temple._id}`)} className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {!loading && temples?.length === 0 && (
        <div className="text-center text-gray-500 mt-16 text-lg">
          No temples found
        </div>
      )}
    </div>
  );
};

export default Temples;