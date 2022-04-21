import { FC, ReactNode } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({
  className,
  type,
  children,
  variant = "default",
  size = "medium",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, styles[variant], styles[size], className)}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
