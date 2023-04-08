import React, { FC } from "react";
import Button from "../common/Button";
import logo from "./pacman.svg";
import Style from "./Start.module.css";

interface IStart {
  onClickStart: (falg: boolean) => any;
}

const Start: FC<IStart> = ({ onClickStart }) => {
  return (
    <header className={Style["App-header"]}>
      <img src={logo} className={Style["App-logo"]} alt="logo" />
      <h1>Welcome!!!</h1>
      <p>This code was written by Seyed Alireza Mahmoudi for AI course</p>
      <div>
        <Button className={Style.Btn} onClick={() => onClickStart(true)}>
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Start;
