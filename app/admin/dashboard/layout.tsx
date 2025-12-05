"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}


export const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {},
});

export const useAdminSearch = () => useContext(SearchContext);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [adminName, setAdminName] = useState("");

  // ✅ Get admin name from cookie on client-side
useEffect(() => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const name = getCookie("admin-name"); // ye cookie ab available hai
  if (name) setAdminName(name);
}, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="d-flex min-vh-100" style={{ background: "linear-gradient(135deg, #eef2ff, #fdf4ff)" }}>
        {/* SIDEBAR */}
        <div
          className={`text-white p-3 shadow-lg ${open ? "d-block" : "d-none d-md-block"}`}
          style={{ width: "260px", background: "linear-gradient(180deg, #1e3a8a, #312e81)" }}
        >
          <h4 className="text-center mb-4 fw-bold text-warning">
            ⚙️ Admin Panel
          </h4>
          <ul className="nav flex-column gap-3">
            <li className="nav-item">
              <Link href="/admin/dashboard" className="nav-link text-white fw-semibold rounded hover-shadow">
                📊 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/dashboard/dicerolls" className="nav-link text-white fw-semibold rounded">
                🎲 Dice Rolls
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/dashboard/whatsappnumber" className="nav-link text-white fw-semibold rounded">
                📞 WhatsApp
              </Link>
            </li>
          </ul>
        </div>

        {/* MAIN AREA */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* HEADER */}
          <header
            className="d-flex align-items-center justify-content-between px-3 py-2 shadow sticky-top"
            style={{ background: "linear-gradient(135deg, #4f46e5, #9333ea)" }}
          >
            <button className="btn btn-light d-md-none" onClick={() => setOpen(!open)}>
              ☰
            </button>

            <h5 className="mb-0 text-white fw-bold">Admin Dashboard</h5>

            <div className="d-flex align-items-center gap-2">
              {adminName && (
                <span className="badge bg-warning text-dark fw-bold px-2 py-1 rounded">
                  👤 {adminName}
                </span>
              )}

              <button
                className="btn btn-danger btn-sm fw-semibold"
                onClick={async () => {
                  await fetch("/api/admin/logout", { method: "POST" });
                  window.location.href = "/admin";
                }}
              >
                🚪 Logout
              </button>
            </div>
          </header>

          {/* SEARCH BAR */}
          <div className="bg-white p-3 shadow-sm border-bottom">
            <div className="container d-flex">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="🔍 Search data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ maxWidth: "350px", width: "100%" }}
              />
            </div>
          </div>

          {/* CONTENT */}
          <main
            className="p-3 flex-grow-1"
            style={{ background: "linear-gradient(135deg, #f8fafc, #f1f5f9)" }}
          >
            {children}
          </main>
        </div>
      </div>
    </SearchContext.Provider>
  );
}
