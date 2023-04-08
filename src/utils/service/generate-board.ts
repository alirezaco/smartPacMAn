import { ObjectEnum } from "../../enum/object.enum";

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

export const generateRandomBoard = () => {
  const result: Array<ObjectEnum> = [];

  for (let index = 0; index < 16 * 16; index++) {
    result.push(randomTile());
  }

  result[randomPacMAn()] = ObjectEnum.PAC_MAN;

  return result;
};

export const generateBoard = (board?: Array<ObjectEnum>) => {
  if (!board || board.length === 0) {
    board = generateRandomBoard();
  }

  return board;
};
