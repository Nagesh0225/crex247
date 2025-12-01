"use client";
import React, { useState, useRef, useEffect } from "react";
// Use a static path for the audio file in the public folder
const scrollersound = "/Scroller.mp3";
const DiceScroller = () => {
  const [diceNumber, setDiceNumber] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    
    const audio = new Audio(scrollersound);
    audio.play();

    
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-auto border border-secondary p-3 rounded d-flex justify-content-center align-items-center"
      style={{ height: "200px", width: "100%" }}
      onScroll={handleScroll}
    >
      <img
        src={`/dice${diceNumber}.png`}
        alt={`Dice ${diceNumber}`}
        className="img-fluid"
        style={{ maxHeight: "150px" }}
      />
    </div>
  );
};

export default DiceScroller;
