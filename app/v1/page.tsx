"use client";
import Header from "../Components/Header";
import Crex247 from "../Components/Crex247";

export default function V1Home() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center p-0 m-0">
      <Header version="v1" />
      <Crex247 adminId={"v1"} version={"v1"} />
    </div>
  );
}
