import React, { FC, useState } from "react";
import InfoForm from "./Info-form";

import Style from "./style.module.css";

interface IInfo {
  onClickStart: (falg: boolean) => any;
  setInfo: any;
}

const Info: FC<IInfo> = ({ onClickStart, setInfo }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const onStartBtmHandller = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={Style.back}>
      <div className={Style["form-box"]}>
        <h5 className={Style["form-step"]}>Create a new game</h5>

        <InfoForm isSubmited={isClicked} changeInfo={setInfo}></InfoForm>

        <div className={Style["BtnParrent"]}>
          <button
            className={Style["prevBtn"]}
            type="button"
            onClick={() => onClickStart(false)}
          >
            BACK
          </button>
          <button
            className={Style["nextBtn"]}
            type="button"
            onClick={onStartBtmHandller}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
