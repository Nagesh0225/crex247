import axios from "axios";
import React, { useEffect,  useState } from "react";

const Customersuport = () => {
   const [whatsapp, setWhatsapp] = useState<any>(null);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        // API route: GET /api/whatsapp
        const res = await axios.get("/api/whatsapp");
        // res.data may be a mongoose doc or an object with fields
        setWhatsapp(res.data || null);
      } catch (error) {
        console.error("Failed to fetch WhatsApp number", error);
        setWhatsapp(null);
      }
    };

    fetchNumber();
  }, []);

  const SupportMessage = `Hello Sir,
  Crex247 Customer Support
  Get in touch with crex247 for any Queries, Emergencies, 
  Feedback or Complaints. We are here to help you 24/7 with our online services.`;
  const supportNumber = whatsapp?.support || "";
  const suportLink = supportNumber
    ? `https://wa.me/${supportNumber}?text=${encodeURIComponent(
        SupportMessage
      )}`
    : "#";
  
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
             <p className="mb-2 fs-6" style={{ color: "#ffd700" }}>
              Crex247 Customer Support
            </p>
            <p className="mb-3 small text-light">
              Get in touch with Crex247 for any Queries, Emergencies, Feedback or Complaints. We are here to help you 24/7 with our online services.
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
