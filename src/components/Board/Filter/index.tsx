import React, { FC, ReactNode } from "react";
import Style from "./filter.module.css";

interface IFilter {
  children?: ReactNode;
}

const Filter: FC<IFilter> = ({ children }) => {
  return <div className={Style["filter"]}>{children}</div>;
};

export default Filter;
