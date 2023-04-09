import React, { FC } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import { getObjectInfo } from "../../../utils/service/object-info";
import Style from "./tile.module.css";

interface ITile {
  id: number;
  row: number;
  column: number;
  type: ObjectEnum;
  onClick?: (index: number) => void;
}

const Tile: FC<ITile> = ({ id, row, column, type, onClick }) => {
  if (row === 1 || row === 16 || column === 1 || column === 16) {
    type = ObjectEnum.WALL;
  }

  const objectInfo = getObjectInfo(type);

  const onClickHandller = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      className={`${Style["tile"]} ${Style[objectInfo.className]}`}
      onClick={onClickHandller}
    >
      {type === ObjectEnum.FOOD && <div className={Style["food"]}></div>}
    </div>
  );
};

export default Tile;
