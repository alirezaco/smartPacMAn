import React, { FC } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import Tiles from "../../Tiles";
import Filter from "../Filter";
import Style from "./main-board.module.css";

interface IMainBoard {
  boards: Array<ObjectEnum>;
}

const MainBoard: FC<IMainBoard> = ({ boards }) => {
  return (
    <div className={Style["parent"]}>
      <Filter></Filter>
      <Tiles boards={boards}></Tiles>
    </div>
  );
};

export default MainBoard;
