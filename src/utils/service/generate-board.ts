import { ObjectEnum } from "../../enum/object.enum";
import { TypeGameEnum } from "../../enum/type-game.enum";

const randomTile = () => {
  const random = Math.ceil(Math.random() * 10);

  if (random < 9) {
    return ObjectEnum.TILE;
  } else {
    return ObjectEnum.WALL;
  }
};

const randomPacMAn = () => {
  const random = Math.ceil(Math.random() * 1000);

  let index = random % (16 * 16);

  const column = (index % 16) + 1;
  const row = Math.ceil((index + 1) / 16);

  if (row === 16) {
    index -= 18;
  } else if (row === 1) {
    index += 18;
  }

  if (column === 16) {
    index--;
  } else if (column === 1) {
    index++;
  }

  return index;
};

const randomFood = (count: number, pacManIndex: number) => {
  const res: Array<number> = [];
  for (let i = 0; i < count; i++) {
    const random = Math.ceil(Math.random() * 1000);

    let index = random % (16 * 16);

    if (res.find((x) => x === index) || pacManIndex === index) {
      i--;
    } else {
      res.push(index);
    }
  }

  return res;
};

export const generateRandomBoard = (typeGame: TypeGameEnum) => {
  const result: Array<ObjectEnum> = [];

  for (let index = 0; index < 16 * 16; index++) {
    result.push(randomTile());
  }

  const pacManIndex = randomPacMAn();
  result[pacManIndex] = ObjectEnum.PAC_MAN;

  if (typeGame === TypeGameEnum.ONE) {
    result[randomFood(1, pacManIndex)[0]] = ObjectEnum.FOOD;
  } else {
    const randoms = randomFood(
      Math.ceil((Math.random() * 1000) % 7) + 1,
      pacManIndex
    );

    randoms.map((value) => {
      result[value] = ObjectEnum.FOOD;
    });
  }

  return result;
};

export const generateBoard = (
  typeGame: TypeGameEnum,
  board?: Array<ObjectEnum>
) => {
  if (!board || board.length === 0) {
    board = generateRandomBoard(typeGame);
  }

  return board;
};
