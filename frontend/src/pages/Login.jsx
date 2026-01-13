import API from "../services/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      setToast("Login successful!");
      setTimeout(() => {
        window.location.href =
          res.data.role === "admin" ? "/admin" : "/dashboard";
      }, 1000);
    } catch {
      setToast("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <Toast message={toast} type="error" />
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue</p>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={login}>Login</button>

        <p className="switch-text">
          New user? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}
