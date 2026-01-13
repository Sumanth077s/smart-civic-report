export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h3>Smart Civic Report</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
