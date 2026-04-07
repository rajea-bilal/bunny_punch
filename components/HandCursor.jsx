import React from "react";

const HandCursor = ({ handPosition }) => {
  console.log("im being logged from handCursor component", handPosition);
  return (
    <div
      className="fixed w-[8rem] h-[8rem] pointer-events-none"
      style={{
        left: `${handPosition?.x}px`,
        top: `${handPosition?.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <img src={"./images/punch.png"} />
    </div>
  );
};

export default HandCursor;

// top-[${x}] left-[${y}]
