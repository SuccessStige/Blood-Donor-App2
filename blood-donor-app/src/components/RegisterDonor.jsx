import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

export default function RegisterDonor() {
  const [name, setName] = useState("");
  const [blood_group, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  
  const NIGERIAN_STATES = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
    "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
    "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
    "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    API.post("register/donor/", { name, blood_group, location, phone })
      .then(() => {
        toast.success("Donor registered!");
        setName("");
        setBloodGroup("");
        setLocation("");
        setPhone("");
      })
      .catch((err) => {
        console.error(err.response?.data);
        toast.error(JSON.stringify(err.response?.data) || "Registration failed");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register Donor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Blood Group */}
        <select
          className="border p-2 rounded w-full"
          value={blood_group}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        {/* Location */}
        <select
          className="border p-2 rounded w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">Select Your State</option>
          {NIGERIAN_STATES.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        {/* Phone */}
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Register Donor"}
        </button>
      </form>
    </div>
  );
}
