import React from "react";

const Deposit = () => {
  const whatsappNumber = "917440505220";



  const withdrawMessage = `Hello Sir,
I need help with *WITHDRAW*.

🔹 Name:
🔹 User ID / Registered Number:
🔹 Amount I want to withdraw:
🔹 Withdrawal Method (UPI/Bank/Other):
🔹 UPI ID / Bank Details:
🔹 Last game / last transaction info (optional):

Please process my withdrawal request as soon as possible.`;


  const withdrawLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    withdrawMessage
  )}`;

  return (
    <div className="container-fluid py-4 bg-dark text-white shadow rounded">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-md-start">
          {/* Logo */}
          <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
            <img
              src="/logow.jpeg"
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "80px" }}
            />
          </div >

          {/* Text */}
          <div className="col-12 col-md-5 mb-3 mb-md-0 text-center">
            <h5 className="fw-bold mb-1 text-warning">
              Need Help With Money?
            </h5>
            <p className="small mb-0 text-light">
              For withdraw directly chat with support on WhatsApp.
            </p>
          </div>

          {/* Buttons */}
          <div className="col-12 col-md-4 text-center">
          

            <a
              href={withdrawLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning px-3 py-2 fw-bold rounded-pill mb-2"
            >
              💸 Withdraw Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
