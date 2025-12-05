"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;

interface DiceRewardFromDB {
  diceNumber: DiceNumber;
  percent: number;
}

const DiceRolls = () => {
  const [rewardPercent, setRewardPercent] = useState<Record<DiceNumber, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const [loading, setLoading] = useState(false);
  const [savedRewards, setSavedRewards] = useState<DiceRewardFromDB[]>([]);
  const [saveMessage, setSaveMessage] = useState(""); // ✅ Inline message
  const diceNumbers: DiceNumber[] = [1, 2, 3, 4, 5, 6];

  /* Load Data From DB */
  const fetchRewards = async () => {
    try {
      const res = await axios.get<DiceRewardFromDB[]>("/api/dice-reward");

      const data: Record<DiceNumber, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };

      res.data.forEach((item) => {
        data[item.diceNumber] = item.percent;
      });

      setRewardPercent(data);
      setSavedRewards(res.data);
    } catch (err) {
      console.error("Fetch Error", err);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  /* Change Handler */
  const handleChange = (num: DiceNumber, value: number) => {
    setRewardPercent({ ...rewardPercent, [num]: value });
  };

  /* Save Into Database */
  const handleSave = async () => {
    setLoading(true);
    setSaveMessage(""); // reset message
    try {
      const payload: DiceRewardFromDB[] = diceNumbers.map((num) => ({
        diceNumber: num,
        percent: rewardPercent[num],
      }));

      await axios.post("/api/dice-reward/save", payload);

      setSaveMessage(" Reward Percentage Saved Successfully!"); // ✅ Inline message
      fetchRewards(); // refresh table
    } catch (err) {
      setSaveMessage("❌ Save Failed!");
      console.error(err);
    } finally {
      setLoading(false);

      // ✅ Optional: hide message after 3 sec
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="mb-4"> Dice Reward Control Panel</h3>

      <div className="card p-3 shadow-sm mb-4">
        <div className="row">
          {diceNumbers.map((num) => (
            <div className="col-md-2 mb-3" key={num}>
              <label className="fw-bold">Dice {num}</label>
              <input
                type="number"
                className="form-control"
                value={rewardPercent[num]}
                onChange={(e) => handleChange(num, Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        <button
          className="btn btn-success mt-3"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "💾 Save / Update"}
        </button>

        {/* ✅ Inline Save Message */}
        {saveMessage && (
          <div
            className={`mt-2 fw-bold ${
              saveMessage.includes("❌") ? "text-danger" : "text-success"
            }`}
          >
            {saveMessage}
          </div>
        )}
      </div>

      {/* Saved Data Table */}
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Saved Dice Rewards</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Dice Number</th>
                <th>Reward Percent</th>
              </tr>
            </thead>
            <tbody>
              {savedRewards.map((item) => (
                <tr key={item.diceNumber}>
                  <td>{item.diceNumber}</td>
                  <td>{item.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiceRolls;
