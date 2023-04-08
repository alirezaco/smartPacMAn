import React, { ChangeEvent, FC, ReactNode } from "react";
import Style from "./filter.module.css";

interface IFilter {
  children?: ReactNode;
  btnClick: () => void;
  btnName: string;
  setInfo: any;
}

const Filter: FC<IFilter> = ({ children, btnClick, btnName, setInfo }) => {
  const onBack = () => {
    setInfo({
      isOk: false,
    });
  };

  return (
    <div className={Style["filter"]}>
      {children}
      <div className={Style["parent-btn"]}>
        <button className={Style.Btn} onClick={onBack}>
          BACK
        </button>
        <button className={Style.Btn} onClick={btnClick}>
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default Filter;
