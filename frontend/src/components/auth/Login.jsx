import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation, Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectRole = new URLSearchParams(location.search).get("role") || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // Navigate to role-specific root
      if (user.role === "Admin") navigate("/admin");
      else if (user.role === "Manager") navigate("/manager");
      else navigate("/team-member");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4"><Link to='/'>Login</Link></h2>
        {redirectRole && <p className="mb-2 text-sm">Login as {redirectRole}</p>}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
        <div className="mt-4 text-sm text-center">
          <span>Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
