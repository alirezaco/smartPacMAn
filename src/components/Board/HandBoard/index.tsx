import React, { ChangeEvent, FC, useState } from "react";
import { ObjectEnum } from "../../../enum/object.enum";
import { TypeGameEnum } from "../../../enum/type-game.enum";
import Dropdown from "../../common/DropDown";
import Tiles from "../../Tiles";
import Filter from "../Filter";
import Style from "./handy-board.module.css";

interface IHandyBoard {
  boards: Array<ObjectEnum>;
  setInfo: any;
  typeGame: TypeGameEnum;
  setBoard: any;
}

const HandyBoard: FC<IHandyBoard> = ({
  boards,
  setInfo,
  typeGame,
  setBoard,
}) => {
  const [objectType, setObjectType] = useState<ObjectEnum>(ObjectEnum.WALL);
  const [localBoard, setLocalBoard] = useState<Array<ObjectEnum>>(boards);
  const [countFood, setCountFood] = useState<number>(
    typeGame === TypeGameEnum.ONE ? 1 : 2
  );

  const onGoToGame = () => {
    if (
      localBoard.find((x) => x === ObjectEnum.PAC_MAN) &&
      localBoard.filter((x) => x === ObjectEnum.FOOD).length === countFood
    ) {
      setBoard(localBoard);
    }
  };

  const changeCountFood = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = +e.target.value;
    if (typeof value === "number" && value < 9 && value > 1) {
      setCountFood(value);
    } else {
      e.target.value = String(countFood);
    }
  };

  const clickOnATile = (index: number) => {
    const column = (index % 16) + 1;
    const row = Math.ceil((index + 1) / 16);

    if (!(row === 1 || row === 16 || column === 1 || column === 16)) {
      if (objectType === ObjectEnum.PAC_MAN) {
        const lastIndex = localBoard.findIndex((x) => x === ObjectEnum.PAC_MAN);

        if (lastIndex !== -1) {
          localBoard[lastIndex] = ObjectEnum.TILE;
        }
      }

      if (
        objectType === ObjectEnum.FOOD &&
        localBoard.filter((x) => x === ObjectEnum.FOOD).length === countFood
      ) {
        const lastIndex = localBoard.findIndex((x) => x === ObjectEnum.FOOD);

        if (lastIndex !== -1) {
          localBoard[lastIndex] = ObjectEnum.TILE;
        }
      }

      localBoard[index] = objectType;

      setLocalBoard([...localBoard]);
    }
  };

  return (
    <div className={Style["parent"]}>
      <Filter btnClick={onGoToGame} btnName="GO" setInfo={setInfo}>
        <div className={Style["parent-select"]}>
          <div
            style={{
              width: "100%",
              height: "50%",
              marginLeft: "14%",
              marginTop: "3%",
            }}
          >
            <label htmlFor="object">Object: </label>
            <Dropdown
              menu={[
                <button
                  type="button"
                  onClick={() => setObjectType(ObjectEnum.WALL)}
                >
                  {ObjectEnum.WALL}
                </button>,
                <button
                  type="button"
                  onClick={() => setObjectType(ObjectEnum.PAC_MAN)}
                >
                  {ObjectEnum.PAC_MAN}
                </button>,
                <button
                  type="button"
                  onClick={() => setObjectType(ObjectEnum.FOOD)}
                >
                  {ObjectEnum.FOOD}
                </button>,
                <button
                  type="button"
                  onClick={() => setObjectType(ObjectEnum.TILE)}
                >
                  {ObjectEnum.TILE}
                </button>,
              ]}
              trigger={
                <button type="button" className={Style["trigger"]}>
                  {objectType}
                </button>
              }
              Id="object"
            ></Dropdown>
          </div>
          <div
            className={Style["count"]}
            style={{ width: "100%", height: "50%" }}
          >
            <label htmlFor="count">count food: </label>
            <input
              placeholder="count food"
              id="count"
              type={"number"}
              min={2}
              max={8}
              defaultValue={countFood}
              onChange={changeCountFood}
              readOnly={typeGame === TypeGameEnum.ONE ? true : false}
            />
          </div>
        </div>
      </Filter>
      <Tiles boards={localBoard} onClick={clickOnATile}></Tiles>
    </div>
  );
};

export default HandyBoard;
