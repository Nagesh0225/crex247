"use client";
import React from "react";
import Crex247 from "./Components/Crex247";
import Header from "./Components/Header";

export default function Home() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center p-0 m-0">
      <Header />
      <Crex247 adminId="your-admin-id" />
    </div>
  );
}
