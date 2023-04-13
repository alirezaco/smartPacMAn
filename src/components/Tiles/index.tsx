import React, { FC, ReactNode } from "react";
import { ObjectEnum } from "../../enum/object.enum";
import Tile from "./Tile";
import Style from "./tiles.module.css";

const createBoard = (
  boards: Array<ObjectEnum>,
  onClick?: (index: number) => void,
  moves?: Array<number>,
  mainWay?: Array<number>
) => {
  let lines: Array<ReactNode> = [];
  let items: Array<ReactNode> = [];

  boards.map((type, index) => {
    const column = (index % 16) + 1;
    const row = Math.ceil((index + 1) / 16);

    if (moves?.find((x) => x === index)) {
      type = ObjectEnum.MOVES;
    }
    if (mainWay?.find((x) => x === index)) {
      type = ObjectEnum.MAIN_WAY;
    }

    items.push(
      <Tile
        column={column}
        row={row}
        id={index}
        type={type}
        onClick={onClick}
        way={mainWay?.findIndex((x) => x === index)}
      ></Tile>
    );

    if (column === 16) {
      lines.push(<div style={{ margin: 0, height: "40px" }}>{items}</div>);
      items = [];
    }
  });

  return lines;
};

interface ITiles {
  boards: Array<ObjectEnum>;
  onClick?: (index: number) => void;
  moves?: Array<number>;
  mainWay?: Array<number>;
}

const Tiles: FC<ITiles> = ({ boards, onClick, mainWay, moves }) => {
  return (
    <div className={Style["tiles"]}>
      {createBoard(boards, onClick, moves, mainWay)}
    </div>
  );
};

export default Tiles;
