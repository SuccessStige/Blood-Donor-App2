import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// List of Nigerian states for location selection
const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara"
];

export default function RequestBloodForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    hospital: "",
    bloodGroup: "",
    quantity: "",
    phone: "",
    location: "",
  });
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [requestResult, setRequestResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleGoHome = () => {
  setRequestResult(null); // reset state (optional)
  navigate("/"); // 👈 change "/" if your home route is different
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  

  try {
    //  Include JWT token in headers
    const token = localStorage.getItem("token"); 
    const res = await API.post(
      "request/create/",
      {
        patient_name: formData.patientName,
        hospital_or_doctor: formData.hospital,
        blood_group: formData.bloodGroup,
        quantity: Number(formData.quantity),
        phone: formData.phone,
        location: formData.location,
      },
      {
        headers: { Authorization: `Bearer ${token}` } // must be valid
      }
    );

    // console.log("API RESPONSE:", res.data); // For debugging
    setRequestResult(res.data);
    toast.success("Blood request submitted successfully!");
  } catch (err) {
    console.error("API ERROR:", err.response?.data || err.message);
    toast.error("Request failed. Check console.");
  } finally {
    setSubmitting(false);
  }
};
  

  const handlePrint = () => {
    window.print();
  };

  //  Display submitted request details
  if (requestResult) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow print-area">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Blood Request Submitted
        </h2>

        <div className="space-y-2">
          <p><strong>Patient:</strong> {requestResult.patient_name}</p>
          <p><strong>Hospital / Doctor:</strong> {requestResult.hospital_or_doctor}</p>
          <p><strong>Blood Group:</strong> {requestResult.blood_group}</p>
          <p><strong>Quantity:</strong> {requestResult.quantity} unit(s)</p>
          <p><strong>Phone:</strong> {requestResult.phone}</p>
          <p><strong>Location:</strong> {requestResult.location}</p>
          <p className="text-sm text-gray-500">
            Request ID: #{requestResult.id}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
        <button
          onClick={handlePrint}
          className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Print
        </button>

        <button
          onClick={handleGoHome}
          className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          OK
        </button>
      </div>
      </div>
    );
  }

  // ✅ Form
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request Blood</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="hospital"
          placeholder="Hospital / Doctor"
          value={formData.hospital}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Quantity (units)"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="">Select Location</option>
          {NIGERIAN_STATES.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
