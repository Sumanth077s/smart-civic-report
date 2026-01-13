import API from "../services/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    type: "Pothole",
    location: "",
    image: null
  });

  useEffect(() => {
    API.get("/issues").then(res => setIssues(res.data));
  }, []);

  const submit = async () => {
    if (!form.title || !form.location) {
      alert("Please fill all required fields");
      return;
    }

    await API.post("/issues", {
      title: form.title,
      type: form.type,
      location: form.location
    });

    setForm({
      title: "",
      type: "Pothole",
      location: "",
      image: null
    });
    setImagePreview(null);

    const res = await API.get("/issues");
    setIssues(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {/* REPORT ISSUE CARD */}
        <div className="report-card">
          <h2>Report Civic Issue</h2>

          <div className="form-grid">
            <input
              placeholder="Issue title"
              value={form.title}
              onChange={e =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={e =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>Pothole</option>
              <option>Garbage</option>
              <option>Streetlight</option>
              <option>Water Leakage</option>
              <option>Road Damage</option>
            </select>

            <input
              placeholder="Location (Area / Street)"
              value={form.location}
              onChange={e =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                setForm({ ...form, image: file });
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button className="primary-btn" onClick={submit}>
            Submit Issue
          </button>
        </div>

        {/* ISSUES LIST */}
        <h3 className="section-title">My Reported Issues</h3>

        <div className="issues-grid">
          {issues.map(i => (
            <div key={i._id} className="issue-card">
              <div className="issue-header">
                <span className="badge">{i.type || "General"}</span>

                {/* STATUS BADGE WITH ICON */}
                <span className={`status-badge ${i.status}`}>
                  {i.status === "open" && "🔴 Open"}
                  {i.status === "in-progress" && "🟡 In Progress"}
                  {i.status === "resolved" && "🟢 Resolved"}
                </span>
              </div>

              <h4>{i.title}</h4>
              <p className="location">📍 {i.location || "N/A"}</p>
              <p className="date">
                🕒 {new Date(i.createdAt || Date.now()).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
