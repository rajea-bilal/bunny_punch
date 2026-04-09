import { Howl } from "howler";
import { useRef, useEffect } from "react";
// tools we need for hand tracking
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import HandCursor from "./HandCursor";
import Bunny from "./Bunny";

const GameBoard = ({
  score,
  setScore,
  handPosition,
  // setHandPosition,
  // updateHandPosition,
  bunnyPosition,
  generateRandomBunnyPosition,
  bunnyHit,
  setBunnyHit,
}) => {
  const boardRef = useRef(null);
  const videoRef = useRef(null); // video element ref
  const handLandmarkerRef = useRef(null); // mediaPipe hand landmarker obj storage
  const cursorRef = useRef(null); // hand cursor DOM element
  const bunnyPositionRef = useRef(null); // storing latest bunny position data
  const soundRef = useRef(null);
  const canHitRef = useRef(true);

  const onBunnyHit = () => {
    console.log("the onBunnyHit function ran");
    const rate = 0.9 + Math.random() * 0.2;
    soundRef.current?.rate(rate);
    soundRef.current?.play();
  };

  const createHandLandmarker = async () => {
    // loads the MP vision files, needed before the hand model can work
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    // creates hand landmarker using loaded vision files
    const handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/hand_landmarker.task", // hand model file is in public folder
      },
      runningMode: "VIDEO", // providing video stream
      numHands: 1, // track 1 hand
    });

    handLandmarkerRef.current = handLandmarker;

    console.log("hand landmarker ready");
  };

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sounds/bonk.mp3"],
      volume: 0.8,
    });
  }, []);

  // MediaPipe to:
  // look at the webcam frame
  // check if it can see a hand print the hand points in the console
  const detectHand = () => {
    const video = videoRef.current;
    const handLandmarker = handLandmarkerRef.current;

    // look at current video stream, process it, give detection results
    const results = handLandmarker.detectForVideo(video, performance.now());

    // Make sure we actually see a hand before grabbing the finger
    if (results.landmarks && results.landmarks.length > 0) {
      // fingertip coordinates
      const indexFingerTip = results.landmarks[0][8];

      // convert the MP x/y values (0-1) into real pixel values on the screen
      // `1 - indexFingerTip.x` flips the x-axis because the webcam view is mirrored
      const pixelX = window.innerWidth * (1 - indexFingerTip.x);
      const pixelY = window.innerHeight * indexFingerTip.y;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${pixelX}px`;
        cursorRef.current.style.top = `${pixelY}px`;
      }

      const bunny = bunnyPositionRef.current;

      if (!bunny) return;
      // Calculate the distance between them
      // Math.abs() ensures the number is always positive, even if calculating negative distance
      const xDistance = Math.abs(pixelX - bunny.randomX);
      const yDistance = Math.abs(pixelY - bunny.randomY);

      // Are they close enough to count as a 'punch'?
      // (You can change '80' to make the hitbox bigger or smaller!)
      if (xDistance < 80 && yDistance < 80 && canHitRef.current === true) {
        console.log("HIT THE BUNNY! 💥");
        canHitRef.current = false;
        onBunnyHit();
        setBunnyHit(true);
        // Step A: Increase the score
        setScore((prev) => prev + 1);
        // Step B: Call the randomizer function to respawn the bunny instantly
        generateRandomBunnyPosition(boardRef);

        // change canHit from false to true after 2s so score doesn't jump
        setTimeout(() => {
          canHitRef.current = true;
          setBunnyHit(false);
        }, 300);
      }
    }

    // looping logic to ensure detectHand runs continuously
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

      requestAnimationFrame(detectHand); // starts the detectHand function when component first mounts
    };

    setup();
    generateRandomBunnyPosition(boardRef);
  }, []);

  // store the latest bunny position value from state inside
  useEffect(() => {
    bunnyPositionRef.current = bunnyPosition;
  }, [bunnyPosition]);

  return (
    <main className=" min-h-screen font-helvetica bg-orange-50 text-orange-50 flex justify-center">
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
      <div
        ref={boardRef}
        className="relative flex flex-col gap-6 max-w-6xl w-full px-10 py-10 "
      >
        <div className="flex justify-end mb-10">
          <h1 className="text-5xl text-[#4D4841]">Score: {score}</h1>
        </div>

        <HandCursor cursorRef={cursorRef} handPosition={handPosition} />
        <Bunny bunnyHit={bunnyHit} bunnyPosition={bunnyPosition} />
        <div className="w-[300px] h-[300px]  p-[5px] bg-[conic-gradient(from_45deg,_rgb(255,179,209),_rgb(156,50,131),_rgb(255,199,96))]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full  object-cover bg-black "
          />
        </div>
      </div>
    </main>
  );
};

export default GameBoard;
