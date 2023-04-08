import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
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
      {isStart && info.isOk && <Board info={info as any}></Board>}
    </div>
  );
}

export default App;
