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
}

const HandyBoard: FC<IHandyBoard> = ({ boards, setInfo, typeGame }) => {
  const [objectType, setObjectType] = useState<string>(ObjectEnum.WALL);

  const onGoToGame = () => {
    console.log(25);
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
              defaultValue={typeGame === TypeGameEnum.ONE ? 1 : 2}
              readOnly={typeGame === TypeGameEnum.ONE ? true : false}
            />
          </div>
        </div>
      </Filter>
      <Tiles boards={boards}></Tiles>
    </div>
  );
};

export default HandyBoard;
