import { useRef, useEffect } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import HandCursor from "./HandCursor";
import Bunny from "./Bunny";

const GameBoard = ({
  score,
  setScore,
  handPosition,
  // setHandPosition,
  updateHandPosition,
  bunnyPosition,
  generateRandomBunnyPosition,
}) => {
  const videoRef = useRef(null);
  const handLandmarkerRef = useRef(null);

  const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    const handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/hand_landmarker.task",
      },
      runningMode: "VIDEO",
      numHands: 1,
    });

    handLandmarkerRef.current = handLandmarker;

    console.log("hand landmarker ready");
  };

  //MediaPipe to:
  // look at the webcam frame
  // check if it can see a hand print the hand points in the console
  const detectHand = () => {
    const video = videoRef.current;
    const handLandmarker = handLandmarkerRef.current;

    if (!video || !handLandmarker) return;

    const results = handLandmarker.detectForVideo(video, performance.now());
    console.log("results", results);

    // Make sure we actually see a hand before grabbing the finger!
    if (results.landmarks && results.landmarks.length > 0) {
      // 1. Declare it as a const right here inside the function
      const indexFingerTip = results.landmarks[0][8];
      // 2. Do the math
      const pixelX = window.innerWidth * indexFingerTip.x;
      const pixelY = window.innerHeight * indexFingerTip.y;

      // 3. Update the global state so normal React takes over!
      updateHandPosition(pixelX, pixelY);
    }

    // 4. Loop it! (Fixing the "run once" issue)
    requestAnimationFrame(detectHand);
  };

  useEffect(() => {
    const setup = async () => {
      // getUserMedia() is a method, asks the browser for access to the user’s camera or microphone.
      // stream is the live video feed from the webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      // take this live camera stream and plug it into the video element so it can show it on the page
      videoRef.current.srcObject = stream;

      await createHandLandmarker();
      requestAnimationFrame(detectHand);
    };

    setup();
    generateRandomBunnyPosition();
  }, []);

  useEffect(() => {
    // If the game just started and there is no hand or bunny yet, wait.
    if (!handPosition || !bunnyPosition) return;

    // 2. Calculate the distance between them
    // Math.abs() ensures the number is always positive, even if calculating negative distance
    const xDistance = Math.abs(handPosition.x - bunnyPosition.randomX);
    const yDistance = Math.abs(handPosition.y - bunnyPosition.randomY);

    // 3. Are they close enough to count as a "punch"?
    // (You can change '80' to make the hitbox bigger or smaller!)
    if (xDistance < 80 && yDistance < 80) {
      console.log("💥 HIT THE BUNNY! 💥");

      // Step A: Increase the score! (You'll need to pass setScore down from GamePage)
      // Example: setScore(prevScore => prevScore + 1);
      setScore((prev) => prev + 1);
      // Step B: Call your randomizer function to respawn the bunny instantly!
      generateRandomBunnyPosition();
    }
  }, [handPosition, bunnyPosition]); // <--- This tells React: "Run this math every single time the hand or bunny moves!"

  return (
    <main className=" min-h-screen font-helvetica bg-black/90 text-orange-50">
      <div className=" relative flex flex-col gap-6 max-w-3xl px-10 py-10">
        <div className="flex justify-between ">
          <h1 className="text-5xl">GameBoard</h1>

          <h1 className="text-5xl">Score: {score}</h1>
        </div>

        <HandCursor handPosition={handPosition} />
        <Bunny bunnyPosition={bunnyPosition} />
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-[400px]"
        />
      </div>
    </main>
  );
};

export default GameBoard;
