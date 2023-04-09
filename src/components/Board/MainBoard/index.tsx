import React, { FC } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import { SelectTypeEnum } from "../../../enum/select-type.enum";
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
  selectionType: SelectTypeEnum;
}

const MainBoard: FC<IMainBoard> = ({
  boards,
  setInfo,
  typeGame,
  setBoard,
  selectionType,
}) => {
  const onReset = () => {
    if (selectionType === SelectTypeEnum.HANDY) {
      setBoard(undefined);
    } else {
      setBoard(generateBoard(typeGame));
    }
  };

  return (
    <div className={Style["parent"]}>
      <Filter btnClick={onReset} btnName="RESET" setInfo={setInfo}></Filter>
      <Tiles boards={boards}></Tiles>
    </div>
  );
};

export default MainBoard;
