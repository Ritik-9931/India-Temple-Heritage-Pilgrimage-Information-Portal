import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { fetchTemples } from "../redux/slices/templeSlice";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { key } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "";

  const { temples, loading, error } = useSelector((state) => state.temple);

  useEffect(() => {
    const decodedKey = key ? decodeURIComponent(key) : "";
    dispatch(
      fetchTemples({
        page: 1,
        keyword: type === "" ? decodedKey : "",
        state: type === "state" ? decodedKey : "",
      }),
    );
  }, [dispatch, key, type]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Search results for "{decodeURIComponent(key)}"
        </h1>
        {type && (
          <p className="text-center text-gray-500 mt-2 capitalize">
            Searching by {type}
          </p>
        )}
      </div>

      {loading && (
        <div className="text-center text-lg font-semibold text-orange-500">
          Loading temples...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium">{error}</div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {temples?.map((temple) => (
          <div
            key={temple._id}
            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 group"
          >
            <div className="overflow-hidden">
              <img
                src={temple.images?.[0]}
                alt={temple.templeName}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {temple.templeName}
              </h2>
              <p className="text-gray-500 mb-3">📍 {temple.city}</p>
              <div className="flex flex-wrap gap-2">
                {temple.categories?.map((cat) => (
                  <span
                    key={`${temple._id}-${cat}`}
                    className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigate(`/templeDetails/${temple._id}`)}
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && temples?.length === 0 && (
        <div className="text-center text-gray-500 mt-16 text-lg">
          No temples found for "{decodeURIComponent(key)}"
        </div>
      )}
    </div>
  );
};

export default Search;