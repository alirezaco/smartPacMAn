import React, { FC, useEffect, useState } from "react";
import { AlgorithmEnum } from "../../../enum/algorithm.enum";
import { ObjectEnum } from "../../../enum/object.enum";
import { SelectTypeEnum } from "../../../enum/select-type.enum";
import { TypeGameEnum } from "../../../enum/type-game.enum";
import { calMoves } from "../../../utils/service/cal-moves";
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
  algorithm: AlgorithmEnum;
}

const MainBoard: FC<IMainBoard> = ({
  boards,
  setInfo,
  typeGame,
  setBoard,
  selectionType,
  algorithm,
}) => {
  const [time, setTime] = useState<string>("0:0");
  const [countNode, setCountNode] = useState<number>(0);
  const [resolve, setResolve] = useState<boolean>(false);
  const [moves, setMoves] = useState<Array<number>>();
  const [mainWay, setMainWay] = useState<Array<number>>();

  const onReset = () => {
    if (resolve) {
      if (selectionType === SelectTypeEnum.HANDY) {
        setBoard(undefined);
      } else {
        setBoard(generateBoard(typeGame));
      }
      setResolve(false);
    }
  };

  useEffect(() => {
    const res = calMoves(algorithm, boards);
    setTime(res.time);
    setCountNode(res.countNode);
    setMoves(res.moves);
    setMainWay(res.mainWay);
    setResolve(true);
  }, [boards, algorithm]);

  return (
    <div className={Style["parent"]}>
      <Filter btnClick={onReset} btnName="RESET" setInfo={setInfo}>
        <div className={Style["parent-select"]}>
          <div className={Style["time"]}>
            <label htmlFor="time">Run Time: </label>
            <input value={time} id="time" type={"text"} readOnly={true} />
          </div>

          <div className={Style["count-node"]}>
            <label htmlFor="countNode">Count Node: </label>
            <input
              value={countNode}
              id="countNode"
              type={"text"}
              readOnly={true}
            />
          </div>
        </div>
      </Filter>
      <Tiles boards={boards} moves={moves} mainWay={mainWay}></Tiles>
    </div>
  );
};

export default MainBoard;
