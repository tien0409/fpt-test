import { FC, useState } from "react";
import clsx from "clsx";
import TurnIcon from '../../assets/images/tune.svg'

import styles from "./TenderSearch.module.scss";

const TenderSearch: FC = () => {
  const [btnActived, setBtnActived] = useState<number>(1);

  const changeBtnActived = (value: number) => {
    setBtnActived(value);
  };

  return (
    <div>
      <h2 className={clsx(styles.title)}>THÔNG TIN ĐẤU THẦU</h2>
      <div className={clsx(styles.btnGroup)}>
        <button
          onClick={() => changeBtnActived(1)}
          className={clsx("btn", { btnPrimary: btnActived === 1 })}
        >
          Hồ sơ mời thầu
        </button>
        <button
          onClick={() => changeBtnActived(2)}
          className={clsx("btn", { btnPrimary: btnActived === 2 })}
        >
          Thông tin đấu thầu
        </button>
      </div>
      <div className={clsx(styles.searchContainer)}>
        <div className={clsx(styles.searchGroup)}>
          <div className={clsx(styles.searchInputGroup)}>
            <i className="fas fa-search" />
            <input type="text" placeholder="Tìm kiếm theo số HSMT" />
          </div>
          <button className="btn btnPrimary">
            <img src={TurnIcon} alt="turn icon" />
            <span>Bộ lọc</span>
          </button>
        </div>
        <div className={clsx(styles.excelContainer)}>
          <button className="btn">Xuất excel</button>
        </div>
      </div>
    </div>
  );
};

export default TenderSearch;
