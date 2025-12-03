"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../../app/Disc.css";

type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;
const dotPositions: Record<DiceNumber, [number, number][]> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [25, 75], [75, 25], [75, 75]],
  5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
  6: [[25, 25], [25, 50], [25, 75], [75, 25], [75, 50], [75, 75]],
};

const rotations: Record<DiceNumber, string> = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateY(90deg)",
  3: "rotateY(180deg)",
  4: "rotateY(-90deg)",
  5: "rotateX(90deg)",
  6: "rotateX(-90deg)",
};

const generateInstantId = () =>
  "CRX" + Math.floor(100000 + Math.random() * 900000);

const Rewards: React.FC = () => {
  const [number, setNumber] = useState<DiceNumber>(1);
  const [rolling, setRolling] = useState(false);
  const [reward, setReward] = useState<number>(0);
  const [instantId, setInstantId] = useState("");

  const [rewardMap, setRewardMap] = useState<Record<DiceNumber, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });
  const [whatsapp, setWhatsapp] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

 useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get("/api/dice-reward");
        const data: Record<DiceNumber, number> = {
          1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
        };
        res.data.forEach((item: { diceNumber: DiceNumber; percent: number }) => {
          data[item.diceNumber] = item.percent;
        });
        setRewardMap(data);
      } catch {}
    };
    fetchRewards();
  }, []);

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const res = await axios.get("/api/whatsapp");
        setWhatsapp(res.data || null);
      } catch {}
    };
    fetchWhatsApp();
  }, []);


  const rollDice = async () => {
    if (rolling) return;
    setRolling(true);
    setReward(0);
    setInstantId("");

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    const finalNumber = Math.floor(Math.random() * 6) + 1 as DiceNumber;

    setTimeout(async () => {
      const rewardValue = rewardMap[finalNumber];
      const newId = generateInstantId();

      setNumber(finalNumber);
      setReward(rewardValue);
      setInstantId(newId);

      try {
        await axios.post("/api/admin/rolls", {
          number: finalNumber,
          reward: rewardValue,
          code: newId,
          instantId: newId,
        });
      } catch {}

      setRolling(false);
    }, 800);
  };

  const sendToWhatsApp = () => {
    if (!instantId) return;
    const supportNumber = whatsapp?.newCustomer || "";
    const waLink =
      "https://wa.me/" +
      supportNumber +
      "?text=" +
      encodeURIComponent(
        `New Instant Sports ID Request

🆔 Instant ID: ${instantId}
🎲 Dice Number: ${number}
💰 Dice Reward: ${reward}%
🎁 Bonus: ₹10000

Please activate this ID: ${instantId}`
      );
    window.open(waLink, "_blank");
  };

  return (
    <div className="d-flex justify-content-center" style={{ background: "linear-gradient(135deg, #232526 0%, #414345 100%)", minHeight: "100vh" }}>
      <div className="text-center w-100" style={{ maxWidth: 400, padding: "2rem 0" }}>
        <audio ref={audioRef} src="/scroller.mp3" />
        <div className="alert fw-bold py-3 mb-3" style={{ background: "linear-gradient(90deg, #ffd700 60%, #fff700 100%)", color: "#232526", fontSize: "1.1rem", borderRadius: "12px", boxShadow: "0 0 8px #ffd700" }}>
          🎁 New users can get up to a ₹10000 bonus! 🎁<br />
          <span style={{ fontSize: "0.95rem" }}>Roll the dice to unlock your instant ID and claim your bonus.</span>
        </div>
           <div className="dice-scene mx-auto mb-2" onClick={rollDice}>
          <div
            className={`dice ${rolling ? "rolling" : ""}`}
            style={{ transform: rotations[number] }}
          >
            {[1, 2, 3, 4, 5, 6].map((face) => (
              <div key={face} className={`face face-${face}`}>
                {dotPositions[face as DiceNumber].map(([x, y], i) => (
                  <span key={i} className="dot" style={{ top: `${y}%`, left: `${x}%` }} />
                ))}
              </div>
            ))}
          </div>
        </div>
         <div className="d-flex flex-column align-items-center gap-3 mt-4">
          <button disabled={!instantId} className="btn w-100 fw-bold" style={{ fontSize: "1rem", background: "linear-gradient(90deg, #ffd700 60%, #fff700 100%)", color: "#232526", borderRadius: "24px", boxShadow: "0 0 8px #ffd700" }}>
            📲 Get an instant id now
          </button>
          <div className="mt-2 bg-success text-white rounded py-2 px-2 small d-flex gap-4 fw-bold justify-content-between" style={{ border: "2px solid #ffd700" }}>
            <span>Get ID: {instantId && instantId}</span>
            <div>
              <button onClick={sendToWhatsApp} disabled={!instantId} className="btn btn-light btn-sm fw-bold" style={{ background: "linear-gradient(90deg, #25d366 60%, #128c7e 100%)", color: "#232526", borderRadius: "16px", boxShadow: "0 0 8px #25d366" }}>
                WhatsApp
              </button>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default Rewards;

