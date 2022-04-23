import { FC } from "react";
import clsx from "clsx";

import InputField from "./InputField";
import styles from "./EditableCell.module.scss";

interface Props {
  className?: string;
  editing: boolean;
  initValue: string;
  onChangeValue: (value: string) => void;
  inputType?: string;
}

const EditableCell: FC<Props> = ({
  editing,
  initValue,
  onChangeValue,
  className,
  inputType,
}) => {
  return editing ? (
    <InputField
      type={inputType}
      className={clsx(className, styles.input)}
      value={initValue}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  ) : (
    <div className={className}>{initValue}</div>
  );
};

export default EditableCell;
