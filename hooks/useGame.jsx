import { useContext } from "react";
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
    bunnyPosition,
    setBunnyPosition,
    bunnyHit,
    setBunnyHit,
  } = context;

  const updateHandPosition = (x, y) => {
    setHandPosition({ x, y });
  };

  const generateRandomBunnyPosition = () => {
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);

    setBunnyPosition({ randomX, randomY });
  };

  return {
    gameStarted,
    setGameStarted,
    score,
    handPosition,
    setHandPosition,
    updateHandPosition,
    setScore,
    bunnyPosition,
    setBunnyPosition,
    generateRandomBunnyPosition,
    bunnyHit,
    setBunnyHit,
  };
};

export default useGame;
