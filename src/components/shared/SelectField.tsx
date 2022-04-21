import {ChangeEvent, FC} from "react";
import clsx from 'clsx'

import styles from './SelectField.module.scss'

interface Props {
  className?: string;
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  optionList: string[] | number[],
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SelectField: FC<Props> = ({optionList, className, id, label, type, placeholder }) => {
  return (
    <div className={clsx(styles.container, className)}>
      {label && <label className={clsx(styles.label)} htmlFor={id}>{label}</label>}
      <select className={clsx(styles.select)} id={id}>
        {optionList.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
