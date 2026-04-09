// custom punch cursor
const HandCursor = ({ handPosition, cursorRef }) => {
  return (
    <div
      ref={cursorRef}
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
