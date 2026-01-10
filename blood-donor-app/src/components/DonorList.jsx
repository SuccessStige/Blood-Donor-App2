import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodFilter, setBloodFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    API.get("register/donor/")
      .then((res) => setDonors(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredDonors = donors.filter(
    (d) =>
      
      d.blood_group.toLowerCase().includes(bloodFilter.toLowerCase()) &&
      d.location.toLowerCase().includes(locationFilter.toLowerCase())
      
  );
  

  if (loading) {
    return <p className="text-center text-gray-500">Loading donors...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Available Donors</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded w-full"
          value={bloodFilter}
          onChange={(e) => setBloodFilter(e.target.value)}
        >
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
            <option key={bg}>{bg}</option>
          ))}
        </select>

        <input
          className="border p-2 rounded w-full"
          placeholder="Search location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      {/* Results */}
      {filteredDonors.length === 0 ? (
        <p className="text-gray-500 text-center">No donors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="border rounded p-4 bg-gray-50 hover:shadow"
            >
              <p className="font-bold text-lg">{donor.name}</p>
              <p>🩸 {donor.blood_group}</p>
              <p>📍 {donor.location}</p>
              <p>📞 {donor.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
