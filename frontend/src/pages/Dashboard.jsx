import API from "../services/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    API.get("/issues").then(res => setIssues(res.data));
  }, []);

  const submit = async () => {
    await API.post("/issues", { title });
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>User Dashboard</h2>
        <input placeholder="Issue title" onChange={e => setTitle(e.target.value)} />
        <button onClick={submit}>Report Issue</button>

        {issues.map(i => (
  <div key={i._id} className="issue">
    <strong>{i.title}</strong>
    <span style={{ marginLeft: "10px" }}>
      ({i.status})
    </span>
  </div>
        ))}
      </div>
    </>
  );
}
