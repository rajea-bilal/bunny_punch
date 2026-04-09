// const StartScreen = ({ setGameStarted, gameStarted }) => {
//   const handleGameStart = () => {
//     gameStarted ? setGameStarted(false) : setGameStarted(true);
//   };

//   return (
//     <main className="min-h-screen font-helvetica bg-brand-primary text-brand-text">
//       <div className="flex flex-col gap-6 max-w-3xl px-10 py-10">
//         <h1 className="text-5xl">BunnyPunch</h1>
//         <p className="text-lg leading-[1.8rem] max-w-2xl">
//           BunnyPunch is a playful camera-based game where your real hand becomes
//           the controller: Google MediaPipe tracks your hand landmarks live from
//           the webcam, and your punches hit bunnies on screen in real time,
//           turning simple hand movement into a fun arcade-style experience.
//           MediaPipe’s Hand Landmarker detects key points on the hand, and its
//           gesture tools can support real-time interaction and gesture
//           recognition for this kind of game
//         </p>

//         <button
//           onClick={() => handleGameStart()}
//           className="w-fit border items-center cursor-pointer px-5 py-4 hover:bg-green-300/80 hover:border-transparent text-xl"
//         >
//           Lets knock out some bunnies
//         </button>
//       </div>
//     </main>
//   );
// };

// export default StartScreen;

import { BookOpen, Gamepad2, ScanLine } from "lucide-react";

const StartScreen = ({ setGameStarted, gameStarted }) => {
  const handleGameStart = () => {
    gameStarted ? setGameStarted(false) : setGameStarted(true);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4F0E6] font-['Space_Mono',monospace] text-[#4C4841] selection:bg-[#D49A9A] selection:text-[#F4F0E6]">
      {/* Background Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(#E6DFCE 1px, transparent 1px), linear-gradient(90deg, #E6DFCE 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(#9E8C7A 1px, transparent 1px), linear-gradient(90deg, #9E8C7A 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center px-6 py-8 text-center">
        {/* Label */}
        <div className="mb-2 inline-flex items-center gap-3 border-2 border-[#9E8C7A] bg-[#F4F0E6] px-4 py-1.5 shadow-[2px_2px_0_0_#9E8C7A]">
          <ScanLine className="h-4 w-4 text-[#D49A9A]" strokeWidth={1.5} />
          <span className="text-xs font-medium tracking-widest text-[#7A7469]">
            HAND-TRACKED ARCADE GAME
          </span>
        </div>

        {/* Bunny Card */}
        <div className="w-[200px] h-[200px]">
          <img src={"/images/bunny.png"} className="text-green-500" />
        </div>

        {/* Title */}
        <div className="relative mb-3">
          <h1
            className="text-7xl tracking-[-0.15em] text-[#C9A661] sm:text-8xl md:text-9xl"
            style={{
              fontFamily: "Silkscreen, cursive",
            }}
          >
            BunnyPunch
          </h1>
        </div>

        {/* Tagline */}
        <h2
          style={{
            fontfamily: "Figtree, sans-serif",
          }}
          className="mb-6 text-3xl font-bold tracking-relaxed text-[#769A6F] sm:text-4xl"
        >
          Punch bunnies. Score fast.
        </h2>

        {/* Supporting Text */}
        <p
          style={{ fontFamily: "Figtree, sans-serif" }}
          className="mx-auto font-medium  mb-10 max-w-xl text-2xl leading-relaxed tracking-tight text-[#4D4841]"
        >
          A webcam-powered pixel game where your real hand becomes the
          controller, using Google MediaPipe Hand Landmarker to track your
          movement live in the browser.
        </p>

        {/* Buttons */}
        <div className="flex w-full max-w-md flex-col justify-center gap-5 sm:flex-row">
          <button
            style={{ fontFamily: "Figtree, sans-serif" }}
            onClick={() => handleGameStart()}
            className="group relative flex w-full cursor-pointer items-center justify-center gap-3  bg-[#BA686F]/80 px-6 py-4 text-xl font-bold text-[#F5F0E6] transition-colors hover:bg-[#C28A8A] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_0_#4C4841]"
          >
            <Gamepad2 className="h-6 w-6" strokeWidth={1.5} />
            Start Game
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border-2 border-[#4C4841] bg-transparent px-6 py-4 text-lg font-bold text-[#4C4841] transition-colors hover:bg-[#E6DFCE] active:translate-x-1 active:translate-y-1 active:shadow-[0_0_0_0_#4C4841]"
          >
            <BookOpen className="h-5 w-5 text-[#9E8C7A]" strokeWidth={1.5} />
            How to Play
          </button>
        </div>
      </div>
    </main>
  );
};

export default StartScreen;
