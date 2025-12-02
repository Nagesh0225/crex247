"use client";
import React, { useState } from "react";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex min-vh-100">

      {/* ✅ SIDEBAR */}
      <div
        className={`bg-dark text-white p-3 sidebar ${
          open ? "d-block" : "d-none d-md-block"
        }`}
        style={{ width: "240px" }}
      >
        <h4 className="text-center mb-4">Admin Panel</h4>

        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link href="/admin" className="nav-link text-white">
              📊 Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/admin/users" className="nav-link text-white">
              👤 Users
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/admin/rolls" className="nav-link text-white">
              🎲 Dice Rolls
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/admin/settings" className="nav-link text-white">
              ⚙️ Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* ✅ MAIN CONTENT AREA */}
      <div className="flex-grow-1">

        {/* ✅ HEADER */}
        <header className="bg-primary text-white d-flex align-items-center justify-content-between px-3 py-2 shadow">
          <button
            className="btn btn-light d-md-none"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <h5 className="mb-0">Admin Dashboard</h5>

          <button className="btn btn-danger btn-sm">Logout</button>
        </header>

        {/* ✅ PAGE CONTENT */}
        <main className="p-3 bg-light min-vh-100">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
