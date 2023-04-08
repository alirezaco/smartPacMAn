import React, { useState } from "react";
import "./App.css";
import Info from "./components/Info";
import Start from "./components/Start/Start";

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [info, setInfo] = useState<Record<string, any>>({ isOk: false });

  const onClickStart = (flag: boolean) => {
    setIsStart(flag);
  };

  return (
    <div className="App">
      {!isStart && <Start onClickStart={onClickStart}></Start>}
      {isStart && !info.isOk && (
        <Info onClickStart={onClickStart} setInfo={setInfo}></Info>
      )}
      {isStart && info.isOk && <p></p>}
    </div>
  );
}

export default App;
