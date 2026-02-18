import React from "react";
import Demo from "../components/Demo";
import Scrollup from "../components/Scrollup";
import Topup from "../components/Topup";

function Blog() {
  const vlogs = [
    {
      id: 1,
      title: "A Day in Our Warehouse",
      desc: "Behind the scenes of packing & shipping",
      img: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg",
    },
    {
      id: 2,
      title: "How We Choose Our Products",
      desc: "Quality checks & sourcing process",
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    },
    {
      id: 3,
      title: "Customer Favorites Explained",
      desc: "Why these products are loved",
      img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    },
    {
      id: 4,
      title: "Styling Tips from Our Team",
      desc: "How to use products better",
      img: "https://images.pexels.com/photos/3772622/pexels-photo-3772622.jpeg",
    },
    {
      id: 5,
      title: "New Collection Launch",
      desc: "Sneak peek of our latest arrivals",
      img: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
    },
    {
      id: 6,
      title: "Care Tips & Maintenance",
      desc: "Make your products last longer",
      img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen mt-6 md:mt-8 overflow-x-hidden">
      {/* Utilities */}
      <Demo />
      <Scrollup />
      <Topup />

      {/* ================= HERO ================= */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg"
          alt="Blog Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative text-center text-white px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our Stories & Vlogs
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200">
            Discover our journey, product stories, styling tips, and
            behind-the-scenes moments.
          </p>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          {["All", "Behind The Scenes", "Product Stories", "Styling Tips", "Launches"].map(
            (cat) => (
              <button
                key={cat}
                className="px-5 py-2 text-sm sm:text-base rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-black hover:text-white transition"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
            alt="Featured Vlog"
            className="w-full h-[250px] sm:h-[300px] md:h-full object-cover"
          />

          <div className="p-6 sm:p-8 text-center md:text-left">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              Featured Vlog
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-2 mb-4">
              Inside Our Creative Process
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Take a deeper look into how our team designs, selects, and curates
              products you love.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Watch Now ▶
            </button>
          </div>
        </div>
      </div>

      {/* ================= VLOG GRID ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8 text-center">
          Latest Vlogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {vlogs.map((vlog) => (
            <div
              key={vlog.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={vlog.img}
                  alt={vlog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white font-semibold">
                    Watch Vlog ▶
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {vlog.title}
                </h3>
                <p className="text-sm text-gray-600">{vlog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="bg-black text-white py-14 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Never Miss a Story
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-6">
            Subscribe to get updates on new vlogs, launches, and exclusive
            content.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 px-5 rounded-lg text-gray-900 w-full sm:w-2/3 bg-white"
            />
            <button className="h-12 px-6 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Spacer */}
      <div className="py-8"></div>
    </div>
  );
}

export default Blog;
