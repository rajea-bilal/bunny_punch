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

  const generateRandomBunnyPosition = (boardRef) => {
    const board = boardRef.current;
    if (!board) return;

    const bunnyWidth = 112;
    const bunnyHeight = 112;

    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;

    const randomX = Math.floor(Math.random() * (boardWidth - bunnyWidth));
    const randomY = Math.floor(Math.random() * (boardHeight - bunnyHeight));

    setBunnyPosition({ randomX, randomY });
  };

  return {
    gameStarted,
    setGameStarted,
    score,
    handPosition,
    setHandPosition,

    setScore,
    bunnyPosition,
    setBunnyPosition,
    generateRandomBunnyPosition,
    bunnyHit,
    setBunnyHit,
  };
};

export default useGame;
