import { FC, ReactNode } from "react";
import clsx from "clsx";

import styles from "./Table.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

const Table: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        className,
        styles.container,
        "custom__scroll custom__scroll--small"
      )}
    >
      <div className={clsx(styles.wrapper)}>
        <table>{children}</table>
      </div>
    </div>
  );
};

export default Table;
