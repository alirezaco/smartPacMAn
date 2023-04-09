import React, { FC, useEffect, useState } from "react";
import { AlgorithmEnum } from "../../enum/algorithm.enum";
import { ObjectEnum } from "../../enum/object.enum";
import { SelectTypeEnum } from "../../enum/select-type.enum";
import { TypeGameEnum } from "../../enum/type-game.enum";
import { generateBoard } from "../../utils/service/generate-board";
import HandyBoard from "./HandBoard";
import MainBoard from "./MainBoard";

interface IBoard {
  info: {
    algorithm: AlgorithmEnum;
    typeGame: TypeGameEnum;
    selection: SelectTypeEnum;
  };
  setInfo: any;
}

const Board: FC<IBoard> = ({ info, setInfo }) => {
  const [board, setBoard] = useState<Array<ObjectEnum>>();

  useEffect(() => {
    if (info.selection === SelectTypeEnum.UNHANDY) {
      setBoard(generateBoard(info.typeGame));
    }
  }, [info, setBoard]);

  return (
    <>
      {board && (
        <MainBoard
          boards={board}
          setInfo={setInfo}
          typeGame={info.typeGame}
          setBoard={setBoard}
          selectionType={info.selection}
        ></MainBoard>
      )}
      {info.selection === SelectTypeEnum.HANDY && !board && (
        <HandyBoard
          boards={Array.from({ length: 256 })}
          setInfo={setInfo}
          typeGame={info.typeGame}
          setBoard={setBoard}
        ></HandyBoard>
      )}
    </>
  );
};

export default Board;
