"use client";
import Crex247 from "../Components/Crex247";
import Header from "../Components/Header";

export default function V2Page() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center p-0 m-0">
      <Header version="v2" />
      <Crex247 adminId={""} version={"v2"} />
    </div>
  );
}