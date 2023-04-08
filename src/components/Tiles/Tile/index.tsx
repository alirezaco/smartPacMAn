import React, { FC } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import { getObjectInfo } from "../../../utils/service/object-info";
import Style from "./tile.module.css";

interface ITile {
  id: number;
  row: number;
  column: number;
  type: ObjectEnum
}

const Tile: FC<ITile> = ({id, row , column, type}) => {
  if(row === 1 || row === 16 || column === 1 || column === 16) {
    type = ObjectEnum.WALL
  }

  const objectInfo = getObjectInfo(type);

  return <div className={`${Style["tile"]} ${Style[objectInfo.className]}`}></div>;
};

export default Tile;
