import React, { FC, ReactNode } from "react";
import { ObjectEnum } from "../../enum/object.enum";
import Tile from "./Tile";
import Style from "./tiles.module.css";

const createBoard = (boards: Array<ObjectEnum>, onClick?: (index:number) => void) => {
  let lines: Array<ReactNode> = [];
  let items: Array<ReactNode> = [];

  boards.map((type, index) => {
    const column = (index % 16) + 1;
    const row = Math.ceil((index + 1) / 16);

    items.push(
      <Tile
        column={column}
        row={row}
        id={index}
        type={type}
        onClick={onClick}
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
  onClick?: (index:number) => void;
}

const Tiles: FC<ITiles> = ({ boards, onClick }) => {
  return <div className={Style["tiles"]}>{createBoard(boards, onClick)}</div>;
};

export default Tiles;
