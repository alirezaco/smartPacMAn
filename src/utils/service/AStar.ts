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

const calHValue = (food: number, pacMan: number) => {
  const foodColumn = (food % 16) + 1;
  const foodRow = Math.ceil((food + 1) / 16);
  const pacMAnColumn = (pacMan % 16) + 1;
  const pacManRow = Math.ceil((pacMan + 1) / 16);

  return Math.abs(foodColumn - pacMAnColumn) + Math.abs(foodRow - pacManRow);
};

const movePacManToAFood = (
  start: number,
  food: number,
  walls: Array<number>
) => {
  const moves: Array<number> = [];
  const queue: Array<{
    moves: Array<number>;
    h: number;
  }> = [{ moves: [start], h: calHValue(food, start) }];

  let count = 0;

  while (true) {
    const mainWay: Array<number> | undefined = queue.shift()?.moves;

    if (!mainWay || count > 500000) {
      break;
    }

    let pacManPosition = mainWay[mainWay.length - 1];
    let lastMove: MoveEnum | undefined;
    moves.push(pacManPosition);

    while (true) {
      const [nowMove, moveType] = nextMove(pacManPosition, lastMove);

      if (!nowMove) {
        break;
      }

      if (
        walls.findIndex((x) => x === nowMove) !== -1 ||
        mainWay.findIndex((x) => x === nowMove) !== -1
      ) {
        lastMove = moveType;
      } else {
        lastMove = moveType;
        mainWay.push(nowMove);

        if (food === nowMove) {
          return {
            moves: Array.from(new Set(moves)),
            mainWay,
            food: nowMove,
          };
        }

        queue.push({ moves: [...mainWay], h: calHValue(food, nowMove) });
        mainWay.pop();
      }
    }

    queue.sort((a, b) => a.h - b.h);

    count++;
  }

  return {
    mainWay: [],
    moves: Array.from(new Set(moves)),
    food: -1,
  };
};

export const calAStart = (
  pacManIndex: number,
  foods: Array<number>,
  walls: Array<number>
) => {
  let moves = [];
  let mainWay = [];
  let pacManPosition = pacManIndex;

  while (foods.length > 0) {
    foods = foods.sort(
      (a, b) => calHValue(a, pacManPosition) - calHValue(b, pacManPosition)
    );
    const food = foods.shift() as number;
    const res = movePacManToAFood(pacManPosition, food, walls);
    res.mainWay.shift();
    res.moves.shift();
    moves.push(...res.moves);
    mainWay.push(...res.mainWay);

    if (res.food !== -1) {
      mainWay.pop();
      moves.pop();
      walls.push(pacManPosition);
      pacManPosition = res.food;
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
