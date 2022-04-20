import { FC, ReactNode } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

interface Props {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  variant?: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ type, children, variant, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(styles.button)} type={type}>
      {children}
    </button>
  );
};

export default Button;
