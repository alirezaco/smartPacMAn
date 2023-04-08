import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  icon?: any;
  href?: string;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  href,
  icon,
  className = "btn-primary",
  children,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={
        className
      }
      {...rest}
    >
      {icon && !isLoading ? icon : ""}
      {children}
    </button>
  );
};

export default Button;
