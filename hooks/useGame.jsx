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
  } = context;

  const updateHandPosition = (x, y) => {
    console.log(x, y);
    setHandPosition({ x, y });
  };

  const generateRandomBunnyPosition = () => {
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);

    console.log("random bunny X", randomX);

    console.log("random bunny Y", randomY);
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
  };
};

export default useGame;
