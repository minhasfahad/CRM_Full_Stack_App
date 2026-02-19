import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate, useLocation, Link } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Team Member");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // If a role was requested in query, prefill (don't set state during render)
  useEffect(() => {
    const requestedRole = new URLSearchParams(location.search).get("role");
    if (requestedRole) setRole(requestedRole);
  }, [location.search]);

  const [inviteCode, setInviteCode] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // send role and inviteCode; backend will validate inviteCode if elevated role requested
      const payload = { name, email, password };
      if (role) payload.role = role;
      if (inviteCode) payload.inviteCode = inviteCode;

      const res = await api.post("/auth/register", payload);
      const { token, user } = res.data;
      // Store token and user and redirect based on role
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "Admin") navigate("/admin");
      else if (user.role === "Manager") navigate("/manager");
      else navigate("/team-member");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4"><Link to='/'>Register</Link></h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="block text-sm">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div className="good">
            <label className="block text-sm">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded">
              <option>Team Member</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
            <div className="mt-2 text-sm text-gray-600">To register as <strong>Manager</strong> or <strong>Admin</strong> provide a valid invite code below.</div>
          </div>

          <div className="mb-3">
            <label className="block text-sm">Invite Code (optional)</label>
            <input value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} className="w-full border p-2 rounded" placeholder="Enter invite code for elevated roles" />
          </div>
          <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
