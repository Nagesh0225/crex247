import React, { useEffect, useState } from "react";
import RewardDice from "./Rewards";
import Deposit from "./deposit";
import Withdraw from "./Withdrow";


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
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div>
           
          <div className="p-4 rounded shadow bg-dark text-warning text-center">
            
           <div className="col-12 col-md-10 col-lg-6 mx-auto">
            <h4 className="fw-bold mb-3">🎲 Roll & Win</h4>

            
              <div className="alert alert-warning fw-bold mb-3">
                🎁 Reward only for New Customers
              </div>
               <div className="flex-fill bg-gold p-3 rounded shadow text-white text-center">
                <RewardDice />
              </div>
                </div>
            <div className="d-flex flex-column flex-md-row gap-3 mt-4">

              <div className="flex-fill bg-success p-3 rounded shadow text-white text-center">
                <Deposit />
              </div>

              <div className="flex-fill bg-danger p-3 rounded shadow text-white text-center">
                <Withdraw />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Crex247;
