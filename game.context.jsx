import React, { createContext, useState } from "react";

// state layer
export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(null);
  const [handPosition, setHandPosition] = useState(null);
  const [bunnyPosition, setBunnyPosition] = useState(null);
  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        score,
        setScore,
        handPosition,
        setHandPosition,
        bunnyPosition,
        setBunnyPosition,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
