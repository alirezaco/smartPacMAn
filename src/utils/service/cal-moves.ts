import { AlgorithmEnum } from "../../enum/algorithm.enum";
import { ObjectEnum } from "../../enum/object.enum";
import { calBFS } from "./bfs";
import { calDFS } from "./dfs";

const getFoodsIndex = (board: Array<ObjectEnum>) => {
  return board
    .map((type, index) => {
      if (type === ObjectEnum.FOOD) {
        return index;
      } else {
        return undefined;
      }
    })
    .filter((x) => x !== undefined) as Array<number>;
};

const getWallsIndex = (board: Array<ObjectEnum>) => {
  return board
    .map((type, index) => {
      const column = (index % 16) + 1;
      const row = Math.ceil((index + 1) / 16);
      if (row === 1 || row === 16 || column === 1 || column === 16) {
        type = ObjectEnum.WALL;
      }

      if (type === ObjectEnum.WALL) {
        return index;
      } else {
        return undefined;
      }
    })
    .filter((x) => x !== undefined) as Array<number>;
};

interface ICalMoves {
  time: string;
  countNode: number;
  mainWay: Array<number>;
  moves: Array<number>;
}

export const calMoves = (
  aligorithm: AlgorithmEnum,
  board: Array<ObjectEnum>
): ICalMoves => {
  const startTime = Date.now();

  const pacManIndex = board.findIndex((x) => x === ObjectEnum.PAC_MAN);
  const foods = getFoodsIndex(board);
  const walls = getWallsIndex(board);
  let mainWay: Array<number> = [];
  let moves: Array<number> = [];

  if (aligorithm === AlgorithmEnum.DFS) {
    const res = calDFS(pacManIndex, foods, walls);
    mainWay = res.mainWay;
    moves = res.moves;
  } else if (aligorithm === AlgorithmEnum.BFS) {
    const res = calBFS(pacManIndex, foods, walls);
    mainWay = res.mainWay;
    moves = res.moves;
  }

  const endTime = Date.now();
  
  return {
    time: calTime(endTime - startTime),
    countNode: moves.length,
    mainWay,
    moves,
  };
};

const calTime = (time: number) => {
  let milSec = String(time % 1000);

  if (milSec.length === 1) {
    milSec = "00" + milSec;
  }

  if (milSec.length === 2) {
    milSec = "0" + milSec;
  }

  return Math.floor(time / 1000) + ":" + milSec;
};
