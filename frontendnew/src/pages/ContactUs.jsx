import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import Demo from "../components/Demo";
import Scrollup from "../components/Scrollup";
import Topup from "../components/Topup";
import axios from "axios";

function ContactUs() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setSuccessMsg(res.data.message);
      setFormData({ name: "", email: "", contactNo: "", message: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <>
        <Demo />
        <Scrollup />
        <Topup />
      </>
      {/* =================== HERO SECTION =================== */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/8867435/pexels-photo-8867435.jpeg')",
        }}
      >
        <h1 className="text-black text-4xl md:text-5xl font-semibold tracking-wide px-8 py-4 rounded-xl">
          Contact Us
        </h1>
      </div>

      {/* =================== MAIN SECTION =================== */}
      <div className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-15 items-stretch">

          {/* =================== CONTACT FORM =================== */}

          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send a message
            </h2>

            {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
            {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}


            <form onSubmit={handleSubmit} className="flex flex-col grow">
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full text-xl border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full text-xl border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Contact No</label>
                <input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Contact number"
                  className="w-full text-xl border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="mb-6 grow">
                <label className="block text-lg font-semibold mb-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="w-full text-xl h-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 mt-6 cursor-pointer hover:scale-105 transition-all duration-300">
                {loading ? "Sending..." : "SUBMIT"}
              </button>
            </form>
          </div>




          {/* =================== FOLLOW US =================== */}
          <div className="flex-1 bg-white border rounded-xl shadow-lg p-8 flex flex-col justify-center text-center space-y-6">
            <h2 className="text-4xl font-semibold text-gray-900">Follow Us</h2>

            <div className="flex justify-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white cursor-pointer hover:scale-110 transition-transform duration-300
">
                <FaFacebookF className="text-2xl" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-400 text-white cursor-pointer hover:scale-110 transition-transform duration-300
">
                <FaTwitter className="text-2xl" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer hover:scale-110 transition-transform duration-300
">
                <FaYoutube className="text-2xl" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white cursor-pointer hover:scale-110 transition-transform duration-300
">
                <IoLogoWhatsapp className="text-2xl" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:scale-110 transition-transform duration-300
">
                <FaInstagram className="text-2xl" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2">
              <IoLocationSharp className="text-4xl" />
              <p className="text-lg text-gray-900 font-semibold">
                1200 Market Street, Suite 400 San Francisco, CA 94102, USA
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2">
              <MdEmail className="text-4xl" />
              <p className="text-lg text-gray-900 font-semibold">support@buynest.com</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2">
              <IoCall className="text-4xl" />
              <p className="text-lg text-gray-900 font-semibold">
                +1 (888) 456-789 or +1 (888) 333-000
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2">
              <MdTimer className="text-4xl" />
              <p className="text-lg text-gray-900 font-semibold">
                Open Time: 8:00AM - 6:00PM
              </p>
            </div>
          </div>

          {/* =================== IMAGE =================== */}
          <div className="flex-1 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
            <img
              src="https://images.pexels.com/photos/6214450/pexels-photo-6214450.jpeg"
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactUs;
