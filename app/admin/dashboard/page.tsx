"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminSearch } from "./layout";

interface RollType {
  _id: string;
  number: number;
  reward: number;
  code: string;
  instantId: string;
  createdAt: string;
  claimed?: boolean;
}

interface AdminDashboardProps {
  version: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ version }) => {
  const [rolls, setRolls] = useState<RollType[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { searchQuery } = useAdminSearch();

  const fetchRolls = async () => {
    try {
      const res = await axios.get(`/api/admin/rolls?version=${version}`);
      setRolls(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Admin Fetch Error:", error);
      setRolls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolls();
  }, [version]);

  const handleClaim = async (id: string) => {
    try {
      const res = await axios.post("/api/admin/rolls", {
        action: "claim",
        id,
        version,
      });

      if (res.data.success) {
        setMessage("✅ Reward Claimed Successfully");

        setRolls((prev) =>
          prev.map((roll) =>
            roll._id === id ? { ...roll, claimed: true } : roll
          )
        );

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      alert("❌ Claim Failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this roll?")) return;
    try {
      await axios.delete(`/api/admin/rolls?id=${id}&version=${version}`);
      setRolls((prev) => prev.filter((roll) => roll._id !== id));
    } catch (error) {
      alert("❌ Delete Failed");
    }
  };

  const filteredRolls = rolls.filter((roll) =>
    Object.values(roll)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
      {/* ✅ HEADER CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow text-white bg-primary rounded-4">
            <div className="card-body text-center">
              <h5>Total Rolls</h5>
              <h3>{rolls.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-white bg-success rounded-4">
            <div className="card-body text-center">
              <h5>Claimed</h5>
              <h3>{rolls.filter(r => r.claimed).length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-white bg-danger rounded-4">
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h3>{rolls.filter(r => !r.claimed).length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ ALERT */}
      {message && (
        <div className="alert alert-success text-center fw-bold shadow">
          {message}
        </div>
      )}

      {/* ✅ LOADING */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : filteredRolls.length === 0 ? (
        <p className="text-center text-danger fw-bold">No rolls found</p>
      ) : (
        <div className="table-responsive shadow rounded-4">
          <table className="table table-hover align-middle mb-0">
            <thead className="text-white" style={{ background: "linear-gradient(45deg,#0d6efd,#6610f2)" }}>
              <tr className="text-center">
                <th>#</th>
                <th>🎲 Dice</th>
                <th>💰 Reward</th>
                <th>🆔 Code</th>
                <th>🕒 Time</th>
                <th>Status</th>
                <th>⚙ Version</th>
              </tr>
            </thead>

            <tbody>
              {filteredRolls.map((roll, index) => (
                <tr
                  key={roll._id}
                  className={`text-center ${roll.claimed ? "table-success" : ""}`}
                >
                  <td className="fw-bold">{index + 1}</td>

                  <td>
                    <span className="badge bg-info fs-6 px-3">
                      {roll.number}
                    </span>
                  </td>

                  <td className="fw-bold text-success">
                    {roll.reward}%
                  </td>

                  <td>
                    <span className="badge bg-dark">{roll.code}</span>
                  </td>

                  <td className="text-muted">
                    {new Date(roll.createdAt)
                      .toISOString()
                      .replace("T", " ")
                      .slice(0, 19)}
                  </td>

                  <td>
                    <button
                      className={`btn btn-sm px-3 ${
                        roll.claimed ? "btn-secondary" : "btn-success"
                      }`}
                      disabled={roll.claimed}
                      onClick={() => handleClaim(roll._id)}
                    >
                      {roll.claimed ? " Claimed" : " Claim"}
                    </button>
                  </td>

                  <td className="text-primary fw-bold">:</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
