import React from "react";

const Bunny = ({ bunnyPosition }) => {
  console.log("bunnyPosition from inside bunny", bunnyPosition);
  return (
    <div
      style={{
        left: `${bunnyPosition?.randomX}px`,
        top: `${bunnyPosition?.randomY}px`,
        transform: "translate(-50%, -50%)",
      }}
      className="w-[6rem] h-[6rem] absolute"
    >
      <img className="w-full h-full" src={"./images/bunny.jpeg"} />
    </div>
  );
};

export default Bunny;
