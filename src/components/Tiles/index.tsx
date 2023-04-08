import React, { FC } from "react";
import { ObjectEnum } from "../../enum/object.enum";
import Tile from "./Tile";
import Style from "./tiles.module.css";

const Tiles: FC<{}> = () => {
  return (
    <div className={Style["tiles"]}>
      {Array.from({ length: 16 }).map((x, column) => {
        return (
          <div style={{ margin: 0, height: "14.5px" }}>
            {Array.from({ length: 16 }).map((x, row) => {
              return (
                <Tile
                  column={column + 1}
                  row={row + 1}
                  id={row + column}
                  type={ObjectEnum.TILE}
                ></Tile>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Tiles;
