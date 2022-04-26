import { FC, ReactNode, MouseEvent } from "react";
import clsx from "clsx";

import styles from "./Modal.module.scss";

interface Props {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal: FC<Props> = ({ children, className, onClose }) => {
  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div onClick={handleClickOutside} className={clsx(styles.overlay)} />
      <div className={clsx(styles.body)}>{children}</div>
    </div>
  );
};

export default Modal;
