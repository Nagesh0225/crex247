"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Roll {
  _id: string;
  number: number;
  code: string;
  claimed: boolean;
  createdAt: string;
}

const rewardMap: Record<number, number> = {
  1: 20,
  2: 25,
  3: 30,
  4: 35,
  5: 40,
  6: 45,
};

const AdminDashboard = () => {
  const [rolls, setRolls] = useState<Roll[]>([]);

  const fetchRolls = async () => {
    try {
      const res = await axios.get("/api/admin/rolls");
      setRolls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRolls();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🎲 Dice Admin Dashboard</h2>
      <div style={{ overflowX: "auto" }}>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Dice</th>
              <th>Code</th>
              <th>Reward</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rolls.map((roll, index) => (
              <tr key={roll._id}>
                <td>{index + 1}</td>
                <td>{roll.number}</td>
                <td>{roll.code}</td>
                <td>{rewardMap[roll.number]}</td>
                <td>
                  <span className="badge bg-success">Claimed</span>
                </td>
                <td>{new Date(roll.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
