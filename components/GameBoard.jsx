import { useRef, useEffect } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import HandCursor from "./HandCursor";

const GameBoard = ({
  // score,
  // setScore,
  handPosition,
  // setHandPosition,
  updateHandPosition,
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
    };

    setup();
  }, []);

  const handleHandPosition = (e) => {
    const x = e.clientX;
    const y = e.clientY;

    updateHandPosition(x, y);
  };
  return (
    <main
      onMouseMove={(e) => handleHandPosition(e)}
      className=" min-h-screen font-helvetica bg-black/90 text-orange-50"
    >
      <div className=" relative flex flex-col gap-6 max-w-3xl px-10 py-10">
        <h1 className="text-5xl">GameBoard</h1>

        <HandCursor handPosition={handPosition} />
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
