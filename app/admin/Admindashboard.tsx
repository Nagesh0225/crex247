"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface RollType {
  _id: string;
  number: number;
  reward: number;
  code: string;
  instantId: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [rolls, setRolls] = useState<RollType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRolls = async () => {
    try {
      const res = await axios.get("/api/admin/rolls");

      console.log("ADMIN API RESPONSE =>", res.data);

      if (Array.isArray(res.data.data)) {
        setRolls(res.data.data);
      } else {
        setRolls([]);
      }
    } catch (error) {
      console.error("Admin Fetch Error:", error);
      setRolls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRolls();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : rolls.length === 0 ? (
        <p className="text-center text-danger">No rolls found</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Dice</th>
              <th>Reward</th>
              
              <th>Instant ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {rolls.map((roll, index) => (
              <tr key={roll._id}>
                <td>{index + 1}</td>
                <td>{roll.number}</td>
                <td>{roll.reward}%</td>
                <td>{roll.code}</td>
                <td>{new Date(roll.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
