import StartScreen from "../components/StartScreen";
import GameBoard from "../components/GameBoard";
import useGame from "../hooks/useGame";

const GamePage = () => {
  const {
    gameStarted,
    setGameStarted,
    score,
    handPosition,
    setHandPosition,
    setScore,
    updateHandPosition,
    bunnyPosition,
    setBunnyPosition,
    generateRandomBunnyPosition,
    bunnyHit,
    setBunnyHit,
  } = useGame();

  return (
    <div>
      {gameStarted ? (
        <GameBoard
          score={score}
          setScore={setScore}
          handPosition={handPosition}
          setHandPosition={setHandPosition}
          updateHandPosition={updateHandPosition}
          bunnyPosition={bunnyPosition}
          bunnyHit={bunnyHit}
          setBunnyHit={setBunnyHit}
          setBunnyPosition={setBunnyPosition}
          generateRandomBunnyPosition={generateRandomBunnyPosition}
        />
      ) : (
        <StartScreen
          setGameStarted={setGameStarted}
          gameStarted={gameStarted}
        />
      )}
    </div>
  );
};

export default GamePage;
