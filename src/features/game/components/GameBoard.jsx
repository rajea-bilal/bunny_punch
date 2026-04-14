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
  const rafIdRef = useRef(null); // keeps latest animation frame id
  const streamRef = useRef(null); // keeps webcam stream so cleanup can stop it

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

      
      const board = boardRef.current;
      if (!board) return;

      // object describing where that board sits on screen in pixels.
     const rect = board.getBoundingClientRect();

      // convert the MP x/y values (0-1) into real pixel values on the screen
      // `1 - indexFingerTip.x` flips the x-axis because the webcam view is mirrored
      const pixelX = rect.left + rect.width * (1 - indexFingerTip.x);
      const pixelY = rect.top + rect.height * indexFingerTip.y;

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
        }, 200);
      }
    }

    // looping logic to ensure detectHand runs continuously
    rafIdRef.current = requestAnimationFrame(detectHand);
  };

  useEffect(() => {
    const setup = async () => {
      // getUserMedia() is a method, asks the browser for access to the user’s camera or microphone.
      // stream is the live video feed from the webcam
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;

      // take this live camera stream and plug it into the video element so it can show it on the page
      videoRef.current.srcObject = stream;

      await createHandLandmarker();

      // start the hand-detect loop and save the id so we can cancel it later
      rafIdRef.current = requestAnimationFrame(detectHand);
    };

    setup();
    generateRandomBunnyPosition(boardRef);

    return () => {
      // stop the animation loop when this screen goes away
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // if camera stream exists, stop every track to fully release the webcam
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // store the latest bunny position value from state inside
  useEffect(() => {
    bunnyPositionRef.current = bunnyPosition;
  }, [bunnyPosition]);

  return (
    <main className="min-h-screen font-helvetica bg-orange-50 text-[#4D4841] relative overflow-hidden">
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
        className="relative z-10 min-h-screen max-w-7xl mx-auto px-8 py-8 flex flex-col"
      >
        {/* Top Bar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <div className="w-24 h-24 rounded-full flex items-center justify-center shrink-0">
              <img
                src="/images/bunny.png"
                alt="Bunny logo"
                className="w-16 h-16 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <p className="mt-2 text-2xl text-[#7A6E62]">
                Move your hand to control the cursor and hit the bunny
              </p>
            </div>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7D7C3] shadow-md rounded-full px-6 py-3">
            <p className="text-sm uppercase tracking-[0.2em] text-[#9A8C7C]">
              Score
            </p>
            <h2 className="text-4xl font-semibold leading-none">{score}</h2>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center">
          <HandCursor cursorRef={cursorRef} handPosition={handPosition} />
          <Bunny bunnyHit={bunnyHit} bunnyPosition={bunnyPosition} />

          <div className="bg-[#F7F1E8]/80 backdrop-blur-sm border border-[#D8CBB8] rounded-[32px] p-6 shadow-md">
            <div className="relative w-[700px] h-[500px] p-[5px] rounded-[28px] shadow-md bg-[conic-gradient(from_45deg,_rgb(255,179,209),_rgb(156,50,131),_rgb(255,199,96))]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover bg-black rounded-[24px]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GameBoard;
