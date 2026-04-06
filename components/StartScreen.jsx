const StartScreen = ({ setGameStarted, gameStarted }) => {
  const handleGameStart = () => {
    gameStarted ? setGameStarted(false) : setGameStarted(true);
  };

  return (
    <main className="min-h-screen font-helvetica bg-brand-primary text-brand-text">
      <div className="flex flex-col gap-6 max-w-3xl px-10 py-10">
        <h1 className="text-5xl">BunnyPunch</h1>
        <p className="text-lg leading-[1.8rem] max-w-2xl">
          BunnyPunch is a playful camera-based game where your real hand becomes
          the controller: Google MediaPipe tracks your hand landmarks live from
          the webcam, and your punches hit bunnies on screen in real time,
          turning simple hand movement into a fun arcade-style experience.
          MediaPipe’s Hand Landmarker detects key points on the hand, and its
          gesture tools can support real-time interaction and gesture
          recognition for this kind of game
        </p>

        <button
          onClick={() => handleGameStart()}
          className="w-fit border items-center cursor-pointer px-5 py-4 hover:bg-green-300/80 hover:border-transparent text-xl"
        >
          Lets knock out some bunnies
        </button>
      </div>
    </main>
  );
};

export default StartScreen;
