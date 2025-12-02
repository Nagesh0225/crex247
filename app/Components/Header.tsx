"use client";
import React from "react";

const ADMIN_NUMBER = "917440505220";

const Header: React.FC = () => {
  const whatsappLink =
    "https://wa.me/" +
    ADMIN_NUMBER +
    "?text=" +
    encodeURIComponent("Hi, I need support regarding Crex247.");

  return (
    <header
      className="w-100 shadow-lg"
      style={{
        background: "linear-gradient(90deg, #232526 0%, #ffd700 100%)",
        color: "#232526",
        borderBottom: "3px solid #ffd700",
        padding: "0.5rem 0"
      }}
    >
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center gap-4 justify-content-center justify-content-md-between">
          {/* Logo */}
          <div>
            <img
              src="/logom.jpeg"
              alt="Crex247 Logo"
              className="img-fluid"
              style={{
                height: "50px",
                width: "200px",
               
              }}
            />
          </div>
          <div className="mt-2 mt-md-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn fw-bold"
              style={{
                fontSize: "1rem",
                background: "linear-gradient(90deg, #ffd700 60%, #fff700 100%)",
                color: "#232526",
                borderRadius: "24px",
                boxShadow: "0 0 8px #ffd700",
                border: "2px solid #ffd700"
              }}
            >
              📞 WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
