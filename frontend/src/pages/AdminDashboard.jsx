import API from "../services/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

const BASE_URL = "http://localhost:5000";

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
    if (!window.confirm("Delete this issue?")) return;
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
          <div key={i._id} className="admin-issue-card">
            {/* LEFT */}
            <div className="admin-issue-info">
              <h4>{i.title}</h4>
              <p>Status: <strong>{i.status}</strong></p>

              {i.image && (
                <img
                  src={`${BASE_URL}${i.image}`}
                  alt="issue"
                  className="issue-thumb"
                />
              )}
            </div>

            {/* RIGHT – ADMIN CONTROLS */}
            <div className="admin-actions">
              <select
                value={i.status}
                onChange={(e) =>
                  updateStatus(i._id, e.target.value)
                }
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <button
                className="delete-btn"
                onClick={() => deleteIssue(i._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
