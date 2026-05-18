import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  createTemple,
  updateTemple,
  deleteTemple,
  fetchTempleById,
  fetchTemples,
  clearTempleError,
  clearTempleSuccess,
} from "../redux/slices/templeSlice";

import { fetchCategories } from "../redux/slices/categorySlice";

import { Upload, ImagePlus, MapPin, Pencil, Trash2, Star } from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

const CreateTemple = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, error, success, temple, temples } = useSelector(
    (state) => state.temple,
  );

  const { categories: categoryList } = useSelector((state) => state.category);

  /* =========================
     STATES
  ========================= */

  const [templeName, setTempleName] = useState("");

  const [slug, setSlug] = useState("");

  const [deity, setDeity] = useState("");

  const [stateName, setStateName] = useState("");

  const [city, setCity] = useState("");

  const [history, setHistory] = useState("");

  const [architectureStyle, setArchitectureStyle] = useState("");

  const [dynasty, setDynasty] = useState("");

  const [builtYear, setBuiltYear] = useState("");

  const [timings, setTimings] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [festivals, setFestivals] = useState("");

  const [categories, setCategories] = useState([]);

  const [featured, setFeatured] = useState(false);

  const [dressCode, setDressCode] = useState("");

  const [rating, setRating] = useState(4.5);

  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  /* =========================
     FETCH DATA
  ========================= */

  useEffect(() => {
    dispatch(fetchCategories());

    dispatch(fetchTemples({}));
  }, [dispatch]);

  /* =========================
     FETCH SINGLE TEMPLE
  ========================= */

  useEffect(() => {
    if (id) {
      dispatch(fetchTempleById(id));
    }
  }, [dispatch, id]);

  /* =========================
     SET EDIT DATA
  ========================= */

  useEffect(() => {
    if (temple && id) {
      setTempleName(temple.templeName || "");

      setSlug(temple.slug || "");

      setDeity(temple.deity || "");

      setStateName(temple.state || "");

      setCity(temple.city || "");

      setHistory(temple.history || "");

      setArchitectureStyle(temple.architectureStyle || "");

      setDynasty(temple.dynasty || "");

      setBuiltYear(temple.builtYear || "");

      setTimings(temple.timings || "");

      setLatitude(temple.location?.latitude || "");

      setLongitude(temple.location?.longitude || "");

      setFestivals(temple.festivals?.join(", ") || "");

      setDressCode(temple.dressCode || "");

      setCategories(temple.categories || []);

      setFeatured(temple.featured || false);

      setRating(temple.rating || 4.5);

      if (temple.images) {
        setPreviewImages(temple.images.map((img) => img.url || img));
      }
    }
  }, [temple, id]);

  /* =========================
     AUTO SLUG
  ========================= */

  useEffect(() => {
    setSlug(templeName.toLowerCase().replace(/\s+/g, "-"));
  }, [templeName]);

  /* =========================
     HANDLE CATEGORY
  ========================= */

  const handleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((item) => item !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("templeName", templeName);

    formData.append("slug", slug);

    formData.append("deity", deity);

    formData.append("state", stateName);

    formData.append("city", city);

    formData.append("history", history);

    formData.append("architectureStyle", architectureStyle);

    formData.append("dynasty", dynasty);

    formData.append("builtYear", builtYear);

    formData.append("timings", timings);

    formData.append("featured", featured);

    formData.append("dressCode", dressCode);

    formData.append("rating", rating);

    formData.append("latitude", latitude);

    formData.append("longitude", longitude);

    festivals.split(",").forEach((festival) => {
      formData.append("festivals", festival.trim());
    });

    categories.forEach((category) => {
      formData.append("categories", category);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    if (id) {
      dispatch(
        updateTemple({
          id,
          formData,
        }),
      );
    } else {
      dispatch(createTemple(formData));
    }
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this temple?");

    if (confirmDelete) {
      dispatch(deleteTemple(id));
    }
  };

  /* =========================
   HANDLE IMAGES
========================= */

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  /* =========================
   REMOVE IMAGE
========================= */

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));

    setPreviewImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  /* =========================
     SUCCESS / ERROR
  ========================= */

  useEffect(() => {
    if (error) {
      alert(error);

      dispatch(clearTempleError());
    }

    if (success) {
      alert(id ? "Temple Updated Successfully" : "Temple Created Successfully");

      dispatch(clearTempleSuccess());

      dispatch(fetchTemples({}));

      if (!id) {
        setTempleName("");
        setSlug("");
        setDeity("");
        setStateName("");
        setCity("");
        setHistory("");
        setArchitectureStyle("");
        setDynasty("");
        setBuiltYear("");
        setTimings("");
        setLatitude("");
        setLongitude("");
        setFestivals("");
        setDressCode("");
        setCategories([]);
        setFeatured(false);
        setRating(4.5);
        setImages([]);
        setPreviewImages([]);
      }

      navigate("/admin/upload");
    }
  }, [error, success, dispatch, navigate, id]);

  return (
    <div className="min-h-screen bg-orange-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* =========================
           FORM
        ========================= */}

        <div className="bg-white rounded-[40px] shadow-2xl p-10 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              {id ? "Update Temple" : "Create Temple"}
            </h1>

            <p className="text-gray-600 text-lg">
              Manage temple heritage, architecture, pilgrimage and images.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASIC INFO */}

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Temple Name"
                value={templeName}
                onChange={(e) => setTempleName(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Slug"
                value={slug}
                readOnly
                className="border p-4 rounded-2xl bg-gray-100"
              />

              <input
                type="text"
                placeholder="Deity"
                value={deity}
                onChange={(e) => setDeity(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="State"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Architecture Style"
                value={architectureStyle}
                onChange={(e) => setArchitectureStyle(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Dynasty"
                value={dynasty}
                onChange={(e) => setDynasty(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Built Year"
                value={builtYear}
                onChange={(e) => setBuiltYear(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Temple Timings"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Dress Code"
                value={dressCode}
                onChange={(e) => setDressCode(e.target.value)}
                className="border p-4 rounded-2xl"
              />

              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border p-4 rounded-2xl"
              />
            </div>

            {/* HISTORY */}

            <textarea
              rows="7"
              placeholder="Temple History"
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              className="w-full border p-5 rounded-2xl"
            ></textarea>

            {/* LOCATION */}

            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <MapPin />
                Location
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="border p-4 rounded-2xl"
                />

                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="border p-4 rounded-2xl"
                />
              </div>
            </div>

            {/* FESTIVALS */}

            <input
              type="text"
              placeholder="Festivals"
              value={festivals}
              onChange={(e) => setFestivals(e.target.value)}
              className="w-full border p-4 rounded-2xl"
            />

            {/* CATEGORIES */}

            <div>
              <h3 className="text-2xl font-bold mb-5">Categories</h3>

              <div className="flex flex-wrap gap-4">
                {categoryList.map((category) => (
                  <button
                    type="button"
                    key={category._id}
                    onClick={() => handleCategory(category.name)}
                    className={`px-5 py-3 rounded-full border transition ${
                      categories.includes(category.name)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURED */}

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />

              <label className="font-semibold text-lg">Featured Temple</label>
            </div>

            {/* IMAGE */}

            <div>
              <label className="flex items-center gap-3 text-2xl font-bold mb-5">
                <ImagePlus />
                Upload Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="w-full border p-4 rounded-2xl"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt=""
                      className="h-44 w-full object-cover rounded-2xl shadow-lg"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON */}

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 transition duration-300">
              <Upload size={24} />

              {loading
                ? "Processing..."
                : id
                  ? "Update Temple"
                  : "Create Temple"}
            </button>
          </form>
        </div>

        {/* =========================
           TEMPLE CARDS
        ========================= */}

        <div>
          <h2 className="text-4xl font-black mb-10 text-center">
            Created Temples
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temples?.map((temple) => (
              <div
                key={temple._id}
                className="bg-white rounded-[30px] overflow-hidden shadow-xl"
              >
                <img
                  src={temple?.images?.[0]?.url || temple?.images?.[0]}
                  alt={temple.templeName}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold">{temple.templeName}</h3>

                    <div className="flex items-center gap-1 text-orange-500">
                      <Star size={18} />

                      <span>{temple.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-2">
                    {temple.city}, {temple.state}
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-3 mb-5">
                    {temple.history}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {temple.categories?.map((category, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/editTemple/${temple._id}`)
                      }
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(temple._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemple;
