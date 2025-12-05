"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #9333ea)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "380px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* ✅ TITLE */}
        <h3 className="text-center fw-bold mb-3 text-primary">
          🔐 Admin Login
        </h3>

        <p className="text-center text-muted mb-4">
          Please login to access dashboard
        </p>

        {/* ✅ ERROR */}
        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        {/* ✅ EMAIL */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control shadow-sm"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
        </div>

        {/* ✅ PASSWORD */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control shadow-sm"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "12px" }}
          />
        </div>

        {/* ✅ BUTTON */}
        <button
          className="btn w-100 fw-bold mt-2 shadow"
          style={{
            background: "linear-gradient(135deg, #2563eb, #9333ea)",
            border: "none",
            color: "white",
            borderRadius: "12px",
          }}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* ✅ FOOTER */}
        <p className="text-center mt-3 text-muted" style={{ fontSize: 14 }}>
          © 2025 Admin Panel
        </p>
      </div>
    </div>
  );
}
