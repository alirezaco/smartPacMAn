import React, { FC } from "react";
import Tiles from "../../Tiles";
import Filter from "../Filter";
import Style from './main-board.module.css'

interface IMainBoard {}

const MainBoard: FC<IMainBoard> = () => {
  return (
    <div className={Style["parent"]}>
      <Filter></Filter>
      <Tiles></Tiles>
    </div>
  );
}

export default MainBoard