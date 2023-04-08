import React, { FC } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import { TypeGameEnum } from "../../../enum/type-game.enum";
import { generateBoard } from "../../../utils/service/generate-board";
import Tiles from "../../Tiles";
import Filter from "../Filter";
import Style from "./main-board.module.css";

interface IMainBoard {
  boards: Array<ObjectEnum>;
  setInfo: any;
  typeGame: TypeGameEnum;
  setBoard: any;
}

const MainBoard: FC<IMainBoard> = ({ boards, setInfo, typeGame, setBoard }) => {
  const onReset = () => {
    setBoard(generateBoard(typeGame));
  };

  return (
    <div className={Style["parent"]}>
      <Filter btnClick={onReset} btnName="RESET" setInfo={setInfo}></Filter>
      <Tiles boards={boards}></Tiles>
    </div>
  );
};

export default MainBoard;
