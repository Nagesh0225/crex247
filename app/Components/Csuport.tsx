import React from "react";

const Customersuport = () => {
  const whatsappNumber = "917440505220";

  const SupportMessage = `Hello Sir,
  Crex247 Customer Support
  Get in touch with crex247 for any Queries, Emergencies, 
  Feedback or Complaints. We are here to help you 24/7 with our online services.`;

 

  const suportLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    SupportMessage
  )}`;
  
  return (
    <div className="container-fluid py-4 bg-dark text-white shadow rounded">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center text-md-start">
          
          <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
            <img
              src="/logom.jpeg"
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "80px" }}
            />
          </div>

          <div className="col-12 col-md-5 mb-3 mb-md-0 text-center">
            <h5 className="fw-bold mb-1 text-warning">
              Need Help With Customer Support?
            </h5>
            <p className="small mb-0 text-light">
              For directly chat with support on WhatsApp.
            </p>
          </div>

         
          <div className="col-12 col-md-4 text-center">
            <a
              href={suportLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success px-3 py-2 fw-bold rounded-pill me-2 mb-2"
            >
               Customer Support
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Customersuport;
