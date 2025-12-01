"use client";
import React from "react";
import Crex247 from "./Components/Crex247";

export default function Home() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-warning bg-gradient px-2">
      <h1
        className="mb-4 fw-bold text-center text-dark"
        style={{ fontSize: "clamp(1.2rem, 6vw, 2.2rem)" }}
      >
        🎲 Dice Disc Roller 🎲
      </h1>

      <Crex247 />
    </div>
  );
}
