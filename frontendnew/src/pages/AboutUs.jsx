import React from "react";
import Demo from "../components/Demo";
import Scrollup from "../components/Scrollup";
import Topup from "../components/Topup";

function AboutUs() {
  return (
    <div className="mt-6 md:mt-8 overflow-x-hidden">
      {/* Utilities */}
      <Demo />
      <Scrollup />
      <Topup />

      {/* Hero Section */}
      <div
        className="w-full h-[250px] sm:h-[300px] md:h-[350px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')",
        }}
      >
        <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide px-6 py-3 rounded">
          About Us
        </h1>
      </div>

      {/* Get to Know Us */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
              Get to Know Us
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              At <span className="font-semibold text-gray-800">BUYNEST</span>, we
              bring you carefully selected products that combine quality, style,
              and affordability.
              <br />
              <br />
              Our mission is to make online shopping easy, enjoyable, and
              trustworthy.
              <br />
              <br />
              Customer satisfaction is at the heart of everything we do.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 w-full overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.pexels.com/photos/13727962/pexels-photo-13727962.jpeg"
              alt="About us"
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Retail Store */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-stretch">
          {/* Image */}
          <div className="md:w-1/2 w-full overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.pexels.com/photos/3270220/pexels-photo-3270220.jpeg"
              alt="Retail store"
              className="w-full h-[250px] sm:h-[300px] md:h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 w-full flex flex-col justify-center text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
              Our Retail Store
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-10">
              Step into our retail store and discover products you’ll love.
              <br />
              <br />
              From everyday essentials to special finds, we focus on quality and
              thoughtful selection.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ["Fashion Essentials", "Carefully curated everyday styles"],
                ["Smart Tech Gear", "Innovative gadgets for modern life"],
                ["Trusted Quality", "Built to last"],
                ["Customer Care", "Support at every step"],
              ].map(([title, desc]) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Challenges */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200">
          <div className="flex items-center justify-center p-8 md:p-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
              Key Challenges
            </h1>
          </div>

          <div className="bg-gray-50 p-6 md:p-10 md:border-l border-gray-200">
            <ul className="space-y-4 md:space-y-6 text-gray-800 text-sm sm:text-base md:text-lg">
              {[
                "Keeping up with evolving fashion & tech trends",
                "Managing returns across multiple categories",
                "Balancing pricing with quality",
                "Avoiding supplier delays",
                "Personalizing customer experiences",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Blog */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-10 text-center md:text-left">
          Our Blog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"
                alt=""
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">
                  Blog Title Example
                </h3>
                <p className="text-sm text-gray-500 mb-3">July 3, 2025</p>
                <p className="text-gray-600 text-sm mb-4">
                  Short blog description goes here to give readers context.
                </p>
                <a href="#" className="font-semibold text-sm">
                  Read More &gt;&gt;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
