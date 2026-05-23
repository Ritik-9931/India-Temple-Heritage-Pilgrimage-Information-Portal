import React from "react";

import {
  Map,
  Mountain,
  Landmark,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const PilgrimageCircuits = () => {
  const navigate = useNavigate();

  const pilgrimageCircuits = [
    {
      name: "Char Dham",
      description:
        "Explore the sacred Himalayan pilgrimage of Yamunotri, Gangotri, Kedarnath and Badrinath.",
      icon: <Mountain size={34} />,
      image:
        "https://images.unsplash.com/photo-1627894483216-2138af692e32",
    },

    {
      name: "Chota Char Dham",
      description:
        "One of the most important spiritual journeys in Uttarakhand.",
      icon: <Landmark size={34} />,
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    },

    {
      name: "Jyotirlinga",
      description:
        "Discover the 12 sacred Jyotirlinga temples dedicated to Lord Shiva.",
      icon: <Sparkles size={34} />,
      image:
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca",
    },

    {
      name: "Shakti Peeth",
      description:
        "Visit divine temples dedicated to Goddess Shakti across India.",
      icon: <Map size={34} />,
      image:
        "https://images.unsplash.com/photo-1583391733981-8498401540c3",
    },

    {
      name: "Sapta Puri",
      description:
        "Seven sacred cities believed to provide moksha and spiritual liberation.",
      icon: <Landmark size={34} />,
      image:
        "https://images.unsplash.com/photo-1514222134-b57cbb8ce073",
    },

    {
      name: "Panch Kedar",
      description:
        "Sacred Shiva temples located in the Garhwal Himalayas.",
      icon: <Mountain size={34} />,
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    },

    {
      name: "Pancha Bhoota Sthalams",
      description:
        "Five famous Shiva temples representing nature’s five elements.",
      icon: <Sparkles size={34} />,
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    },

    {
      name: "Divya Desam",
      description:
        "Sacred Vishnu temples praised by the Alvar saints.",
      icon: <Landmark size={34} />,
      image:
        "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658",
    },

    {
      name: "Ashtavinayak",
      description:
        "Eight holy temples of Lord Ganesha located in Maharashtra.",
      icon: <Sparkles size={34} />,
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
    },

    {
      name: "Kanwar Yatra",
      description:
        "Annual pilgrimage devoted to Lord Shiva during Shravan month.",
      icon: <Map size={34} />,
      image:
        "https://images.unsplash.com/photo-1609766857041-ed402ea8069a",
    },

    {
      name: "Amarnath Yatra",
      description:
        "Sacred Himalayan pilgrimage to the holy Amarnath cave shrine.",
      icon: <Mountain size={34} />,
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    },

    {
      name: "Kumbh Mela Circuit",
      description:
        "World’s largest spiritual gathering celebrated across holy rivers.",
      icon: <Sparkles size={34} />,
      image:
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {/* HERO */}

      <div className="relative h-[55vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da"
          alt="Pilgrimage"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <p className="uppercase tracking-[6px] text-orange-300 font-semibold mb-4">
            Sacred India
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white max-w-5xl leading-tight">
            Pilgrimage Circuits Of India
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mt-8 leading-9">
            Discover India’s most sacred spiritual journeys,
            ancient temple routes and divine pilgrimage destinations.
          </p>
        </div>
      </div>

      {/* CIRCUITS */}

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pilgrimageCircuits.map((circuit, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(
                  `/travel/${encodeURIComponent(circuit.name)}`,
                )
              }
              className="group bg-white rounded-[35px] overflow-hidden shadow-2xl cursor-pointer hover:-translate-y-3 transition duration-500"
            >
              {/* IMAGE */}

              <div className="relative overflow-hidden">
                <img
                  src={circuit.image}
                  alt={circuit.name}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md text-white p-4 rounded-2xl">
                  {circuit.icon}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-8">
                <h2 className="text-3xl font-black text-gray-900 mb-4">
                  {circuit.name}
                </h2>

                <p className="text-gray-600 leading-8 mb-8">
                  {circuit.description}
                </p>

                <button className="flex items-center gap-3 text-orange-500 font-bold text-lg group-hover:gap-5 transition-all">
                  Explore Circuit

                  <ArrowRight size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PilgrimageCircuits;