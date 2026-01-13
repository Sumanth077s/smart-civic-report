import API from "../services/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const BASE_URL = "http://localhost:5000";

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

    const data = new FormData();
    data.append("title", form.title);
    data.append("type", form.type);
    data.append("location", form.location);
    if (form.image) data.append("image", form.image);

    await API.post("/issues", data);

    setForm({ title: "", type: "Pothole", location: "", image: null });
    setImagePreview(null);

    const res = await API.get("/issues");
    setIssues(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="report-card">
          <h2>Report Civic Issue</h2>

          <div className="form-grid">
            <input
              placeholder="Issue title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
            >
              <option>Pothole</option>
              <option>Garbage</option>
              <option>Streetlight</option>
              <option>Water Leakage</option>
              <option>Road Damage</option>
            </select>

            <input
              placeholder="Location"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                setForm({ ...form, image: file });
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="preview" />
            </div>
          )}

          <button className="primary-btn" onClick={submit}>
            Submit Issue
          </button>
        </div>

        <h3 className="section-title">My Reported Issues</h3>

        <div className="issues-grid">
          {issues.map(i => (
            <div key={i._id} className="issue-card">
              <div className="issue-header">
                <span className="badge">{i.type}</span>
                <span className={`status-badge ${i.status}`}>
                  {i.status === "open" && "🔴 Open"}
                  {i.status === "in-progress" && "🟡 In Progress"}
                  {i.status === "resolved" && "🟢 Resolved"}
                </span>
              </div>

              {i.image && (
                <img
                  className="issue-thumb"
                  src={`${BASE_URL}${i.image}`}
                  alt="issue"
                />
              )}

              <h4>{i.title}</h4>
              <p className="location">📍 {i.location}</p>
              <p className="date">
                🕒 {new Date(i.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
