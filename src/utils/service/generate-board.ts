import { ObjectEnum } from "../../enum/object.enum";

const randomTile = () => {
  const random = Math.ceil(Math.random() * 10);

  if (random < 7) {
    return ObjectEnum.TILE;
  } else {
    return ObjectEnum.WALL;
  }
};

export const generateRandomBoard = () => {
  const result: Array<ObjectEnum> = [];

  for (let index = 0; index < 16 * 16; index++) {
    result.push(randomTile());
  }

  return result;
};

export const generateBoard = (board?: Array<ObjectEnum>) => {
  if (!board || board.length === 0) {
    board = generateRandomBoard();
  }

  return board;
};
