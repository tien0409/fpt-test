import { FC, useState } from "react";
import clsx from "clsx";

import TurnIcon from "../../assets/images/tune.svg";
import styles from "./TenderSearch.module.scss";
import Button from "../shared/Button";

const TenderSearch: FC = () => {
  const [btnActived, setBtnActived] = useState<number>(1);

  const changeBtnActived = (value: number) => {
    setBtnActived(value);
  };

  return (
    <div>
      <div className={clsx(styles.btnGroup)}>
        <Button
          onClick={() => changeBtnActived(1)}
          variant={btnActived === 1 ? "primary" : ""}
          size="small"
          className={clsx(styles.buttonToggle, {
            [styles.default]: btnActived !== 1,
          })}
        >
          Hồ sơ mời thầu
        </Button>
        <Button
          onClick={() => changeBtnActived(2)}
          variant={btnActived === 2 ? "primary" : ""}
          className={clsx(styles.buttonToggle, {
            [styles.default]: btnActived !== 2,
          })}
          size="small"
        >
          Thông tin đấu thầu
        </Button>
      </div>
      <div className={clsx(styles.searchContainer)}>
        <div className={clsx(styles.searchGroup)}>
          <div className={clsx(styles.searchInputGroup)}>
            <i className="fas fa-search" />
            <input type="text" placeholder="Tìm kiếm theo số HSMT" />
          </div>
          <Button variant="primary">
            <img src={TurnIcon} alt="turn icon" />
            <span>Bộ lọc</span>
          </Button>
        </div>
        <div className={clsx(styles.excelContainer)}>
          <Button>Xuất excel</Button>
        </div>
      </div>
    </div>
  );
};

export default TenderSearch;
