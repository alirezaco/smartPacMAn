import React, { FC, useEffect, useState } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import { getObjectInfo } from "../../../utils/service/object-info";
import Style from "./tile.module.css";

interface ITile {
  id: number;
  row: number;
  column: number;
  type: ObjectEnum;
  onClick?: (index: number) => void;
  way?: number;
}

const Tile: FC<ITile> = ({ id, row, column, type, onClick, way }) => {
  if (row === 1 || row === 16 || column === 1 || column === 16) {
    type = ObjectEnum.WALL;
  }
  const [mainClass, setClass] = useState<string>("");

  const objectInfo = getObjectInfo(type);

  const onClickHandller = () => {
    if (onClick) {
      onClick(id);
    }
  };

  useEffect(() => {
    setClass("");
    let timer: NodeJS.Timeout;
    if (way !== undefined && way !== -1) {
      timer = setTimeout(() => {
        setClass("main-way");
      }, way * 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [way]);

  return (
    <div
      className={`${Style["tile"]} ${Style[objectInfo.className]} ${
        Style[mainClass]
      }`}
      onClick={onClickHandller}
    >
      {type === ObjectEnum.MAIN_WAY && (
        <div className={Style["num"]}>{way}</div>
      )}
      {type === ObjectEnum.FOOD && <div className={Style["food"]}></div>}
    </div>
  );
};

export default Tile;
