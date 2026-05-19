import React from "react";

import {
  Landmark,
  MapPin,
  Star,
  Mountain,
  Building2,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-[#f8f5f0] overflow-hidden">
      {/* ================= HERO SECTION ================= */}

      <section className="relative h-[80vh] w-full">
        <img
          src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/architecture_heoavc.jpg"
          alt="Temple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
          <p className="uppercase tracking-[6px] text-orange-300 mb-4">
            Spiritual Heritage Of India
          </p>

          <h1 className="text-5xl md:text-7xl font-black max-w-5xl leading-tight">
            About Our Temple Heritage Portal
          </h1>

          <p className="max-w-3xl text-lg md:text-2xl text-gray-200 mt-8 leading-9">
            Explore India’s sacred temples, pilgrimage destinations,
            architectural wonders, spiritual traditions, and timeless divine
            heritage.
          </p>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}

          <div>
            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-4">
              About Platform
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Preserving India’s Spiritual & Cultural Heritage
            </h2>

            <p className="text-gray-600 text-lg leading-8 mb-8">
              India Temple Heritage & Pilgrimage Portal is a digital platform
              dedicated to showcasing the rich spiritual culture, ancient
              temples, sacred pilgrimage routes, and architectural beauty of
              India.
            </p>

            <p className="text-gray-600 text-lg leading-8 mb-10">
              From Jyotirlingas and Shakti Peethas to magnificent South Indian
              temple architecture and Himalayan pilgrimage sites, this platform
              helps devotees, travelers, and history lovers explore India’s
              divine heritage in one place.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-xl hover:scale-105 duration-75">
                <Landmark className="text-orange-500 mb-4" size={42} />

                <h3 className="text-2xl font-bold mb-3">
                  Sacred Pilgrimage
                </h3>

                <p className="text-gray-600 leading-7">
                  Discover holy pilgrimage destinations across India.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl hover:scale-105 duration-75">
                <Building2 className="text-orange-500 mb-4" size={42} />

                <h3 className="text-2xl font-bold mb-3">
                  Ancient Architecture
                </h3>

                <p className="text-gray-600 leading-7">
                  Explore incredible carvings, sculptures, and temple designs.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="relative">
            <img
              src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg"
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

      {/* ================= FEATURES SECTION ================= */}

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-3">
              Portal Features
            </p>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              What You Can Explore
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-xl text-center hover:scale-105 duration-75">
              <Landmark className="mx-auto text-orange-500 mb-5" size={50} />

              <h3 className="text-2xl font-bold mb-4">Temple Directory</h3>

              <p className="text-gray-600 leading-7">
                Browse famous temples across different states of India.
              </p>
            </div>

            <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-xl text-center hover:scale-105 duration-75">
              <Mountain className="mx-auto text-orange-500 mb-5" size={50} />

              <h3 className="text-2xl font-bold mb-4">Pilgrimage Tours</h3>

              <p className="text-gray-600 leading-7">
                Discover sacred pilgrimage destinations and spiritual routes.
              </p>
            </div>

            <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-xl text-center hover:scale-105 duration-75">
              <Building2 className="mx-auto text-orange-500 mb-5" size={50} />

              <h3 className="text-2xl font-bold mb-04">
                Temple Architecture
              </h3>

              <p className="text-gray-600 leading-7">
                Explore ancient Indian architecture and temple artistry.
              </p>
            </div>

            <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-xl text-center  hover:scale-105 duration-75">
              <MapPin className="mx-auto text-orange-500 mb-5" size={50} />

              <h3 className="text-2xl font-bold mb-4">Location Details</h3>

              <p className="text-gray-600 leading-7">
                Find temple locations, timings, festivals, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              <h3 className="text-5xl font-black text-orange-500 mb-3">
                500+
              </h3>

              <p className="text-gray-600 text-lg">Temples Listed</p>
            </div>

            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              <h3 className="text-5xl font-black text-orange-500 mb-3">28</h3>

              <p className="text-gray-600 text-lg">States Covered</p>
            </div>

            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              <h3 className="text-5xl font-black text-orange-500 mb-3">
                1000+
              </h3>

              <p className="text-gray-600 text-lg">Temple Images</p>
            </div>

            <div className="bg-white rounded-3xl p-10 text-center shadow-xl">
              <h3 className="text-5xl font-black text-orange-500 mb-3">
                Ancient
              </h3>

              <p className="text-gray-600 text-lg">Heritage Stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEVELOPER SECTION ================= */}

      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-4">
            Creator
          </p>

          <h2 className="text-5xl font-black text-gray-900 mb-8">
            Developed By Ritik Raushan
          </h2>

          <p className="text-lg text-gray-600 leading-9">
            A passionate Full Stack Developer focused on building modern,
            scalable, and visually engaging web applications inspired by Indian
            spirituality, culture, and heritage.
          </p>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}

      <section className="bg-orange-500 py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            Begin Your Spiritual Journey Across India
          </h2>

          <p className="text-xl text-orange-100 leading-9 mb-10">
            Explore sacred temples, divine traditions, and the timeless beauty
            of India’s spiritual heritage.
          </p>

          <Link
            to="/templeList"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-orange-500 rounded-full text-lg font-bold hover:scale-105 transition duration-300 shadow-2xl"
          >
            Explore Temples
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;