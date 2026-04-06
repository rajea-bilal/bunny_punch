import { useState, useContext } from "react";
import { GameContext } from "../game.context";

const useGame = () => {
  const context = useContext(GameContext);
  const {
    gameStarted,
    setGameStarted,
    score,
    setScore,
    handPosition,
    setHandPosition,
  } = context;

  const updateHandPosition = (x, y) => {
    console.log(x, y);
    setHandPosition({ x, y });
  };

  return {
    gameStarted,
    setGameStarted,
    score,
    handPosition,
    setHandPosition,
    updateHandPosition,
    setScore,
  };
};

export default useGame;
