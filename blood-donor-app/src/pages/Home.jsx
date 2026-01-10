import bloodImage from "../assets/blood-donor.jpg";

import { isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Home() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (isAuthenticated()) {
      navigate("/register"); // logged in → register donor
    } else {
      navigate("/login"); // not logged in → redirect to login
    }
  };

  const handleRequestClick = () => {
    if (isAuthenticated()) {
      navigate("/request-blood"); // logged in → request blood
    } else {
      navigate("/login"); // not logged in → redirect to login
    }
  };
  const [stats, setStats] = useState({
    total_donors: 0,
    total_requests: 0,
    lives_saved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("stats/"); // Make sure this matches your backend URL
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  


  return (
    <div className="space-y-16">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="text-center mt-10 px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Welcome to Blood Donor App
        </h1>
        <p className="text-gray-700 mb-6">
          Connect with blood donors near you and save lives. Donate, request, and make a difference.
        </p>
        <img
          src={bloodImage}
          alt="Blood Donation"
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="bg-gray-100 py-12 px-4 text-center rounded-lg shadow-lg mx-4">
        <h2 className="text-3xl font-bold text-red-600 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Register as Donor</h3>
            <p>Sign up and share your blood group and location to help people in need.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Request Blood</h3>
            <p>Submit a blood request for patients and instantly connect with available donors.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-xl mb-2">Save Lives</h3>
            <p>Receive timely help or donate to someone in need. Every drop counts!</p>
          </div>
        </div>
      </section>

      {/* ---------------- QUICK STATS ---------------- */}
      <section className="text-center py-12 px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-6">Quick Stats</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-red-600 text-white p-6 rounded shadow">
          <p className="text-4xl font-bold">{stats.total_donors}</p>
          <p>Registered Donors</p>
        </div>
        <div className="bg-red-600 text-white p-6 rounded shadow">
          <p className="text-4xl font-bold">{stats.total_requests}</p>
          <p>Blood Requests</p>
        </div>
        <div className="bg-red-600 text-white p-6 rounded shadow">
          <p className="text-4xl font-bold">{stats.lives_saved}</p>
          <p>Lives Saved</p>
        </div>
      </div>
    </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="text-center py-12 px-4 bg-gray-50 rounded-lg shadow-lg mx-4">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Get Started Today!</h2>
        <p className="mb-6 text-gray-700">
          Register as a donor or request blood now. Help save lives in your community.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleRegisterClick}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Register as Donor
          </button>
          <button
            onClick={handleRequestClick}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Request Blood
          </button>
        </div>
      </section>

      {/* ---------------- INFO / FOOTER LAYER ---------------- */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Why Donate Blood?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Donating blood is a simple act of kindness that can save multiple lives. Whether you're a regular donor or a first-timer, your contribution makes a difference.
        </p>
      </section>

    </div>
  );
}
