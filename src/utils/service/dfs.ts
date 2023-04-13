import { MoveEnum } from "../../enum/move.enum";
import { ObjectEnum } from "../../enum/object.enum";

const moveToTop = (index: number) => {
  return index - 16;
};

const moveToLeft = (index: number) => {
  return index - 1;
};

const moveToRigth = (index: number) => {
  return index + 1;
};

const moveToDown = (index: number) => {
  return index + 16;
};

const nextMove = (
  index: number,
  lastMove: MoveEnum | undefined
): [number, MoveEnum] | [] => {
  switch (lastMove) {
    case undefined:
      return [moveToTop(index), MoveEnum.TOP];

    case MoveEnum.TOP:
      return [moveToRigth(index), MoveEnum.RIGTH];

    case MoveEnum.RIGTH:
      return [moveToDown(index), MoveEnum.DOWN];

    case MoveEnum.DOWN:
      return [moveToLeft(index), MoveEnum.LEFT];

    default:
      return [];
  }
};

const checkTypeMove = (start: number, end: number): MoveEnum => {
  if (start + 1 === end) {
    return MoveEnum.RIGTH;
  } else if (start - 1 === end) {
    return MoveEnum.LEFT;
  } else if (start > end) {
    return MoveEnum.TOP;
  } else {
    return MoveEnum.DOWN;
  }
};

const movePacManToAFood = (
  start: number,
  foods: Array<number>,
  walls: Array<number>
) => {
  let lastMove: MoveEnum | undefined;
  const mainWay: Array<number> = [start];
  const moves: Array<number> = [start];

  let pacManPosition = start;
  let count = 0;

  while (true) {
    if (count > 500000) {
      return {
        moves: Array.from(new Set(moves)),
        mainWay: [],
        food: -1,
      };
    }

    if (foods.find((x) => x === pacManPosition)) {
      return {
        moves: Array.from(new Set(moves)),
        mainWay,
        food: pacManPosition,
      };
    }
    const [nowMove, moveType] = nextMove(pacManPosition, lastMove);

    if (!nowMove) {
      if (mainWay.length === 1) {
        break;
      }
      mainWay.pop();
      const prePosition = mainWay[mainWay.length - 1] as number;

      lastMove = checkTypeMove(prePosition, pacManPosition);
      pacManPosition = prePosition;

      continue;
    }

    if (
      walls.findIndex((x) => x === nowMove) !== -1 ||
      mainWay.findIndex((x) => x === nowMove) !== -1
    ) {
      lastMove = moveType;
    } else {
      lastMove = undefined;
      pacManPosition = nowMove;
      mainWay.push(nowMove);
      moves.push(nowMove);
    }

    count++;
  }

  return {
    mainWay,
    moves: Array.from(new Set(moves)),
    food: -1,
  };
};

export const calDFS = (
  pacManIndex: number,
  foods: Array<number>,
  walls: Array<number>
) => {
  let moves = [];
  let mainWay = [];
  let pacManPosition = pacManIndex;

  while (foods.length > 0) {
    const res = movePacManToAFood(pacManPosition, foods, walls);
    res.mainWay.shift();
    res.moves.shift();
    moves.push(...res.moves);
    mainWay.push(...res.mainWay);

    if (res.food !== -1) {
      mainWay.pop();
      moves.pop();
      walls.push(pacManPosition);
      pacManPosition = res.food;

      foods = foods.filter((x) => x !== pacManPosition);
    } else {
      alert("not found food");
      break;
    }
  }

  return {
    moves: Array.from(new Set(moves)),
    mainWay,
  };
};
