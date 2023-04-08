import { ObjectEnum } from "../../enum/object.enum";

interface IGetObjectInfo {
  className: string;
}

export const getObjectInfo = (type: ObjectEnum): IGetObjectInfo => {
  switch (type) {
    case ObjectEnum.WALL:
      return {
        className: "wall",
      };

    case ObjectEnum.TILE:
      return {
        className: "",
      };

    case ObjectEnum.PAC_MAN:
      return {
        className: "pac-man",
      };

    case ObjectEnum.FOOD:
      return {
        className: "",
      };

    default:
      return {
        className: "",
      };
  }
};
