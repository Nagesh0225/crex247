"use client";
import React, { useEffect, useState } from "react";
import RewardDice from "./Rewards";
import Deposit from "./deposit";
import Withdraw from "./Withdrow";
import Customersuport from "./Csuport";

interface Crex247Props {
  adminId: string;
}

const Crex247: React.FC<Crex247Props> = ({ adminId }) => {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("crex_user");
    if (!visited) {
      setIsNewCustomer(true);
      localStorage.setItem("crex_user", "old");
    }
  }, []);

  return (
    <div className="container-fluid py-4" style={{ background: "linear-gradient(135deg, #232526 0%, #414345 100%)" }}>
      <div className="row justify-content-center">
        <div>
          <div className="p-4 rounded shadow-lg text-center" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "#ffd700", border: "2px solid #ffd700" }}>
            <div className="text-center flex-grow-1 mb-3">
              <h1 className="fw-bold mb-1" style={{ fontSize: "2.2rem", background: "linear-gradient(90deg, #ffd700, #fff700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Welcome to Crex247 Book
              </h1>
              <p className="mb-0" style={{ fontSize: "1.1rem", color: "#e0e0e0" }}>
                India's No.1 sports ID provider since 2008
              </p>
            </div>
        
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-10 col-lg-7">
                {isNewCustomer && (
                  <div className="alert alert-warning fw-bold mb-3" style={{ background: "#fff700", color: "#232526" }}>
                    🎁 Reward only for New Customers
                  </div>
                )}
                <div className="bg-dark p-3 rounded shadow-lg" style={{ border: "2px solid #ffd700" }}>
                  <RewardDice adminId={adminId} />
                </div>
              </div>
            </div>
            <div className="row mt-4 g-3">
              <div className="col-12 col-md-6">
                <div className="bg-success p-3 rounded shadow-lg text-white text-center h-100" style={{ border: "2px solid #ffd700" }}>
                  <Deposit />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="bg-warning p-3 rounded shadow-lg text-dark text-center h-100" style={{ border: "2px solid #ffd700" }}>
                  <Withdraw />
                </div>
              </div>
              <div className="col-12 col-md-8 text-center mx-auto">
                <div className="bg-dark p-3 rounded shadow-lg text-white text-center h-100" style={{ border: "2px solid #ffd700" }}>
                  <Customersuport />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crex247;
