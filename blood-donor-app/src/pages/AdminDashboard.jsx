import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await API.get("admin/requests/");
      setRequests(res.data);
    } catch (err) {
      toast.error("Unauthorized or failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`admin/requests/${id}/`, { status });
      toast.success(`Request ${status}`);
      fetchRequests();
    } catch {
      toast.error("Action failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Blood Requests</h2>

      {requests.length === 0 ? (
        <p>No requests available</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{req.patient_name}</p>
                <p>🩸 {req.blood_group}</p>
                <p>📍 {req.location}</p>
                <p>Status: <strong>{req.status}</strong></p>
              </div>

              {req.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(req.id, "APPROVED")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, "REJECTED")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
