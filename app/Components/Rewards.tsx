"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import GenerateCode from "../Utils/GenerateCode";
import "../../app/Disc.css";

const ADMIN_NUMBER = "917440505220";

const dotPositions: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [25, 75], [75, 25], [75, 75]],
  5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
  6: [[25, 25], [25, 50], [25, 75], [75, 25], [75, 50], [75, 75]],
};

const rotations: Record<number, string> = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateY(90deg)",
  3: "rotateY(180deg)",
  4: "rotateY(-90deg)",
  5: "rotateX(90deg)",
  6: "rotateX(-90deg)",
};

const rewardMap: Record<number, number> = {
  1: 20,
  2: 25,
  3: 30,
  4: 35,
  5: 40,
  6: 45,
};

const Rewards: React.FC = () => {
  const [number, setNumber] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [code, setCode] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [reward, setReward] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const rollDice = async () => {
    if (rolling) return;
    setRolling(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    const finalNumber = Math.floor(Math.random() * 6) + 1;
    setNumber(finalNumber);
    setReward(rewardMap[finalNumber]);

    const frontendCode = GenerateCode();
    setCode(frontendCode);

    try {
      await axios.post("/api/rolls", {
        number: finalNumber,
        code: frontendCode,
      });

      setWaUrl(
        `https://wa.me/${ADMIN_NUMBER}?text=${encodeURIComponent(
          `🎲 Dice: ${finalNumber}\n🎁 Code: ${frontendCode}\n💰 Reward: ${rewardMap[finalNumber]}`
        )}`
      );
    } catch {
      setWaUrl("");
    }

    setTimeout(() => setRolling(false), 3000);
  };

  return (
    <div className="text-center">
      <audio ref={audioRef} src="/scroller.mp3" />
      <div className="dice-scene mx-auto mb-3" onClick={rollDice}>
        <div
          className={`dice ${rolling ? "rolling" : ""}`}
          style={{ transform: rotations[number] }}
        >
          {[1, 2, 3, 4, 5, 6].map((face) => (
            <div key={face} className={`face face-${face}`}>
              {dotPositions[face].map(([x, y], i) => (
                <span key={i} className="dot" style={{ top: `${y}%`, left: `${x}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light text-dark p-3 rounded shadow">
        <div className="fw-bold fs-5">{code || "—"}</div>
        <div className="mt-1">
          <strong>Reward:</strong> {reward}
        </div>
        <div className="mt-2 text-success">
          <strong>Status:</strong> ✅ Claimed
        </div>
        {waUrl && (
          <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-success w-100 mt-2">
            Share on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
};

export default Rewards;
