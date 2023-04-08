import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { AlgorithmEnum } from "../../enum/algorithm.enum";
import { SelectTypeEnum } from "../../enum/select-type.enum";
import { TypeGameEnum } from "../../enum/type-game.enum";
import useOnChange from "../../utils/on-change/use-on-change";
import Dropdown from "../common/DropDown";
import Style from "./style.module.css";

interface IInfoForm {
  isSubmited: boolean;
  changeInfo: any;
}

const InfoForm: FC<IInfoForm> = ({ isSubmited, changeInfo }) => {
  const [algorithm, setAlgorithm] = useState<string>();
  const [typeGame, setTypeGame] = useState<string>();
  const [selection, setSelection] = useState<string>();
  const [name, setName] = useState<string>();

  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorAlgorithm, setErrorAlgorithm] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<boolean>(false);
  const [errorSelect, setErrorSelect] = useState<boolean>(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const validation = useCallback(() => {
    let res = true;

    if (!name) {
      setErrorName(true);
      res = false;
    } else {
      setErrorName(false);
    }

    if (!algorithm) {
      setErrorAlgorithm(true);
      res = false;
    } else {
      setErrorAlgorithm(false);
    }

    if (!typeGame) {
      setErrorType(true);
      res = false;
    } else {
      setErrorType(false);
    }

    if (!selection) {
      setErrorSelect(true);
      res = false;
    } else {
      setErrorSelect(false);
    }

    return res;
  }, [
    setErrorName,
    setErrorAlgorithm,
    setErrorType,
    setErrorSelect,
    algorithm,
    typeGame,
    selection,
    name,
  ]);

  useOnChange(isSubmited, () => {
    const existError = validation();

    if (existError) {
      changeInfo({
        isOk: true,
        name,
        algorithm,
        typeGame,
        selection,
      });
    }
  });

  return (
    <form>
      <div>
        <div className={Style["name"] + " " + (errorName && Style["error"])}>
          <label htmlFor="name">Name: </label>
          <input
            placeholder="Name"
            id="name"
            type={"text"}
            onChange={onChangeName}
          />
        </div>

        <div
          className={
            Style["algorithm"] + " " + (errorAlgorithm && Style["error"])
          }
        >
          <label htmlFor="algorithm">Algorithm: </label>
          <Dropdown
            menu={[
              <button
                type="button"
                onClick={() => setAlgorithm(AlgorithmEnum.A_START)}
              >
                {AlgorithmEnum.A_START}
              </button>,
              <button
                type="button"
                onClick={() => setAlgorithm(AlgorithmEnum.BFS)}
              >
                {AlgorithmEnum.BFS}
              </button>,
              <button
                type="button"
                onClick={() => setAlgorithm(AlgorithmEnum.DFS)}
              >
                {AlgorithmEnum.DFS}
              </button>,
            ]}
            trigger={<button type="button">{algorithm || "select"}</button>}
            Id="algorithm"
          ></Dropdown>
        </div>
      </div>

      <div style={{ marginTop: "5%" }}>
        <div className={Style["type"] + " " + (errorType && Style["error"])}>
          <label htmlFor="type">Type game: </label>
          <Dropdown
            menu={[
              <button
                type="button"
                onClick={() => setTypeGame(TypeGameEnum.ONE)}
              >
                {TypeGameEnum.ONE}
              </button>,
              <button
                type="button"
                onClick={() => setTypeGame(TypeGameEnum.MUTI)}
              >
                {TypeGameEnum.MUTI}
              </button>,
            ]}
            trigger={<button type="button">{typeGame || "select"}</button>}
            Id="type"
          ></Dropdown>
        </div>

        <div
          className={Style["select"] + " " + (errorSelect && Style["error"])}
        >
          <label htmlFor="select">Selection type: </label>
          <Dropdown
            menu={[
              <button
                type="button"
                onClick={() => setSelection(SelectTypeEnum.HANDY)}
              >
                {SelectTypeEnum.HANDY}
              </button>,
              <button
                type="button"
                onClick={() => setSelection(SelectTypeEnum.UNHANDY)}
              >
                {SelectTypeEnum.UNHANDY}
              </button>,
            ]}
            trigger={<button type="button">{selection || "select"}</button>}
            Id="select"
          ></Dropdown>
        </div>
      </div>
    </form>
  );
};

export default InfoForm;
