import React from "react";

const HandCursor = ({ handPosition }) => {
  console.log("im being logged from handCursor component", handPosition);
  return (
    <div
      className="fixed w-[2rem] h-[2rem] bg-green-300 pointer-events-none"
      style={{
        left: `${handPosition?.x}px`,
        top: `${handPosition?.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default HandCursor;

// top-[${x}] left-[${y}]
