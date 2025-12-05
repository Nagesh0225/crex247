"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WhatsAppNumbers({ version }: { version: string }) {
  const [numbers, setNumbers] = useState({
    newCustomer: "",
    deposit: "",
    withdrawal: "",
    support: "",
  });

  const [mainNumber, setMainNumber] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // FETCH DATA ON LOAD
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/whatsapp/${version}`);
      setNumbers({
        newCustomer: res.data.newCustomer || "",
        deposit: res.data.deposit || "",
        withdrawal: res.data.withdrawal || "",
        support: res.data.support || "",
      });
      setMainNumber(res.data.number || "");
    } catch (err) {
      console.log(err);
    }
  };

  // SAVE DATA
  const handleSave = async () => {
    if (!mainNumber.trim()) {
      alert("Main number required!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`/api/whatsapp/${version}`, {
        ...numbers,
        number: mainNumber,
      });

      setSavedMsg("Numbers Updated Successfully ✔");
      setTimeout(() => setSavedMsg(""), 3000);
    } catch (err) {
      alert("Save Failed ❌");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">

      <h3 className="mb-4">📞 WhatsApp Numbers ({version.toUpperCase()})</h3>

      <div className="row g-3">

        {/* Main Number Field */}
        <div className="col-md-6 col-12">
          <label className="fw-bold">Main Number</label>
          <input
            className="form-control"
            value={mainNumber}
            onChange={(e) => setMainNumber(e.target.value)}
          />
        </div>

        {["newCustomer", "deposit", "withdrawal", "support"].map((key) => (
          <div className="col-md-6 col-12" key={key}>
            <label className="fw-bold text-capitalize">{key}</label>
            <input
              className="form-control"
              value={(numbers as any)[key]}
              onChange={(e) =>
                setNumbers({ ...numbers, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <button
        className="btn btn-success mt-3"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Numbers"}
      </button>

      {savedMsg && (
        <p className="text-success mt-2 fw-bold">{savedMsg}</p>
      )}

      <div className="card p-3 mt-4">
        <h5>🔍 Live Preview</h5>
        <p>Main Number: {mainNumber}</p>
        <p>New Customer: {numbers.newCustomer}</p>
        <p>Deposit: {numbers.deposit}</p>
        <p>Withdrawal: {numbers.withdrawal}</p>
        <p>Support: {numbers.support}</p>
      </div>

    </div>
  );
}
