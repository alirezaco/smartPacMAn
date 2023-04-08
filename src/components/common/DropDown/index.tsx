import React, { FC, ReactElement } from "react";
import Style from "./DropDown.module.css";

interface IDropdown {
  trigger: ReactElement;
  menu: Array<ReactElement>;
  className?: string;
  Id?: string;
}

const Dropdown: FC<IDropdown> = ({ trigger, menu, className, Id }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={`${Style["dropdown"]} ${className}`} id={Id}>
      {React.cloneElement(trigger, {
        onClick: handleOpen,
        className: `${Style["trigger"]} ${trigger.props.className}`
      })}
      {open ? (
        <ul className={Style["menu"]}>
          {menu.map((menuItem, index) => (
            <li key={index} className={Style["menu-item"]}>
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
