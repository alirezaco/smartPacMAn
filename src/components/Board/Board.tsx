import React, { FC } from "react";
import MainBoard from "./MainBoard";

interface IBoard {}

const Board: FC<IBoard> = () => {
  return <>{<MainBoard></MainBoard>}</>;
};

export default Board;
