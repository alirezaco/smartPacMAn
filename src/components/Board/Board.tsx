import React, { FC, useEffect, useState } from "react";
import { AlgorithmEnum } from "../../enum/algorithm.enum";
import { ObjectEnum } from "../../enum/object.enum";
import { SelectTypeEnum } from "../../enum/select-type.enum";
import { TypeGameEnum } from "../../enum/type-game.enum";
import { generateBoard } from "../../utils/service/generate-board";
import MainBoard from "./MainBoard";

interface IBoard {
  info: {
    algorithm: AlgorithmEnum;
    typeGame: TypeGameEnum;
    selection: SelectTypeEnum;
  };
}

const Board: FC<IBoard> = ({ info }) => {
  const [board, setBoard] = useState<Array<ObjectEnum>>();

  useEffect(() => {
    if (info.selection === SelectTypeEnum.UNHANDY) {
      setBoard(generateBoard());
    }
  }, [info, setBoard]);

  return <>{board && <MainBoard boards={board}></MainBoard>}</>;
};

export default Board;
