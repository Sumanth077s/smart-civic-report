import API from "../services/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [toast, setToast] = useState("");

  const fetchIssues = async () => {
    const res = await API.get("/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/issues/${id}`, { status });
    setToast("Status updated successfully");
    fetchIssues();
  };

  const deleteIssue = async (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    await API.delete(`/issues/${id}`);
    setToast("Issue deleted successfully");
    fetchIssues();
  };

  return (
    <>
      <Navbar />
      <Toast message={toast} type="success" />

      <div className="container">
        <h2>Admin Dashboard</h2>

        {issues.length === 0 && <p>No issues reported yet.</p>}

        {issues.map((i) => (
          <div key={i._id} className="issue">
            <div>
              <strong>{i.title}</strong>
              <p>Status: {i.status}</p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {/* ✅ FIXED STATUS BINDING */}
              <select
                value={i.status}
                onChange={(e) => updateStatus(i._id, e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              {/* 🗑️ DELETE BUTTON */}
              <button
                style={{
                  background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
                  border: "none",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
                onClick={() => deleteIssue(i._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
