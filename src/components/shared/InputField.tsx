import { ChangeEvent, FC } from "react";
import clsx from "clsx";

import styles from "./InputField.module.scss";

interface Props {
  className?: string;
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  iconPrefix?: boolean;
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<Props> = ({
  className,
  id,
  label,
  type = "text",
  placeholder,
  iconPrefix = false,
  icon,
  value,
  name,
  checked,
  onChange,
  onFocus,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label className={clsx(styles.label)} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={clsx(styles.inputGroup)}>
        {icon && (
          <i
            className={clsx(icon, styles.icon, { [styles.prefix]: iconPrefix })}
          />
        )}
        <input
          checked={checked}
          value={value}
          name={name}
          onChange={onChange}
          onFocus={onFocus}
          className={clsx({ [styles.prefix]: iconPrefix })}
          id={id}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;
