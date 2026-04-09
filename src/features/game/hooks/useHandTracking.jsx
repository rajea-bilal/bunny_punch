import { useState, useContext } from "react";
import { GameContext } from "../game.context";

const useHandTracking = () => {
  const context = useContext(GameContext);
  const { handPosition, setHandPosition } = context;
};
