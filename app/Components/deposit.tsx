import React, { useEffect, useState } from "react";
import axios from "axios";


const Deposit = () => {
   const [whatsapp, setWhatsapp] = useState<any>(null);
   useEffect(() => {
    const fetchNumber = async () => {
      try {
       
        const res = await axios.get("/api/whatsapp");
      
        setWhatsapp(res.data || null);
      } catch (error) {
        console.error("Failed to fetch WhatsApp number", error);
        setWhatsapp(null);
      }
    };

    fetchNumber();
  }, []);
  const depositMessage = `Hello Sir,
I need help with *DEPOSIT*.

🔹 Name:
🔹 User ID / Registered Number:
🔹 Amount I want to deposit:
🔹 Payment Method (UPI/Bank/Other):
🔹 Transaction ID (if already paid):
🔹 Screenshot sent on WhatsApp (Yes/No):

Please check and confirm my deposit.`;

 
const supportNumber = whatsapp?.deposit || "";
  const depositLink = supportNumber
    ? `https://wa.me/${supportNumber}?text=${encodeURIComponent(
        depositMessage
      )}`
    : "#";

  
  return (
    <div className="container-fluid py-4 bg-dark text-white shadow rounded">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-md-start">
          {/* Logo */}
          <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
            <img
              src="/logod.jpeg"
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "80px" }}
            />
          </div>

          {/* Text */}
          <div className="col-12 col-md-5 mb-3 mb-md-0 text-center">
            <h5 className="fw-bold mb-1 text-warning">
              Need Help With Money?
            </h5>
            <p className="small mb-0 text-light">
              For deposit directly chat with support on WhatsApp.
            </p>
          </div>

          {/* Buttons */}
          <div className="col-12 col-md-4 text-center">
            <a
              href={depositLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success px-3 py-2 fw-bold rounded-pill me-2 mb-2"
            >
              💰 Deposit Support
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
