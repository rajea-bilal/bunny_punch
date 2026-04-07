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

  //cMediaPipe to:
  // look at the webcam frame
  // check if it can see a hand print the hand points in the console
  let indexFingerTip;
  const detectHand = () => {
    const video = videoRef.current;
    const handLandmarker = handLandmarkerRef.current;

    if (!video || !handLandmarker) return;

    const results = handLandmarker.detectForVideo(video, performance.now());
    indexFingerTip = results.landmarks[0][8];
    console.log("results:", results);
    console.log("landmarks:", results.landmarks);
    console.log("indexFingerTip:", indexFingerTip);
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
      detectHand();
    };

    setup();
  }, []);

  const handleHandPosition = () => {
    // const x = e.clientX;
    // const y = e.clientY;
    //multiply indexFingerTip.x by to turn it into a real horizontal pixel value
    const x = indexFingerTip?.x;
    const y = indexFingerTip?.y;

    const pixelX = window.innerWidth * x;
    const pixelY = window.innerHeight * y;

    updateHandPosition(pixelX, pixelY);
  };
  return (
    <main
      onMouseMove={() => handleHandPosition()}
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
