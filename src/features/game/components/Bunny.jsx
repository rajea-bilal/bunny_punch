import React from "react";

const Bunny = ({ bunnyPosition, bunnyHit }) => {
  // console.log("bunnyPosition from inside bunny", bunnyPosition);
  // console.log("bunnyHit state", bunnyHit);
  return (
    <div
      style={{
        left: `${bunnyPosition?.randomX}px`,
        top: `${bunnyPosition?.randomY}px`,
        transform: `translate(-50%, -50%) scale(${bunnyHit ? 1.2 : 1})`,
      }}
      className="w-[7rem] h-[7rem] absolute bg-[#C9A661] rounded-full p-2 z-100"
    >
      <img
        className="w-full h-full"
        src={bunnyHit ? "/images/knocked_off.png" : "/images/bunny.png"}
      />
    </div>
  );
};

export default Bunny;
