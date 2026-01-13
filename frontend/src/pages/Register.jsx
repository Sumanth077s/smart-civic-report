import API from "../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

export default function Register() {
  const [data, setData] = useState({});
  const [toast, setToast] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      setToast("Registered successfully! Please login.");
    } catch {
      setToast("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <Toast message={toast} type="success" />
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Report civic issues easily</p>

        <input placeholder="Full Name" onChange={e => setData({...data, name: e.target.value})} />
        <input placeholder="Email" onChange={e => setData({...data, email: e.target.value})} />
        <input type="password" placeholder="Password" onChange={e => setData({...data, password: e.target.value})} />

        <button className="primary-btn" onClick={register}>Register</button>

        <p className="switch-text">
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
