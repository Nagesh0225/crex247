import React, { useEffect, useState } from "react";
import RewardDice from "./Rewards";
import Deposit from "./deposit";
import Withdraw from "./Withdrow";
import Customersuport from "./Csuport";

const Crex247: React.FC = () => {
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
            <p className="fw-bold fs-5 mb-2" style={{ color: "#fff700" }}>
              India's No.1 Sports ID Provider Since 2008
            </p>
            <p className="mb-2 fs-6" style={{ color: "#ffd700" }}>
              Crex247 Customer Support
            </p>
            <p className="mb-3 small text-light">
              Get in touch with Crex247 for any Queries, Emergencies, Feedback or Complaints. We are here to help you 24/7 with our online services.
            </p>
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-10 col-lg-7">
                {isNewCustomer && (
                  <div className="alert alert-warning fw-bold mb-3" style={{ background: "#fff700", color: "#232526" }}>
                    🎁 Reward only for New Customers
                  </div>
                )}
                <div className="bg-dark p-3 rounded shadow-lg" style={{ border: "2px solid #ffd700" }}>
                  <RewardDice />
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
