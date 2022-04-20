import {FC} from "react";
import clsx from 'clsx';

import styles from './Pagination.module.scss';
import SelectField from "../base/SelectField";

interface Props {
  currentPage: number | string;
  totalPage: number | string;
  currentResult: number | string;
  totalResult: number | string;
  onClick: (page: number) => void;
}

const Pagination: FC<Props> = ({currentPage, totalPage, currentResult, totalResult, onClick}) => {

  const handleChangePage = (page: number) => {
    onClick(page);
  }

  return (<div className={clsx(styles.container)}>
    <div className={clsx(styles.totalResult)}>
      {totalResult} Kết quả
    </div>
    <div className={clsx(styles.paginationContainer)}>
      <div className={clsx(styles.paginationGroup)}>
        <i className={clsx("fas fa-angle-left", styles.prev)}></i>
        {Array(+totalPage).fill(0).map((_, index) => (<div onClick={() => handleChangePage(index + 1)}
                                                           className={clsx(styles.pageNumber, {[styles.active]: currentPage === index + 1})}
                                                           key={index}>
          {index + 1}
        </div>))}
        <i className={clsx("fas fa-angle-right", styles.next)}></i>
      </div>
      <div className={clsx(styles.paginationOption)}>
        <SelectField optionList={[8]} className={clsx(styles.paginationSelect)}  />
        <span>Kết quả</span>
      </div>
    </div>
  </div>)
}

export default Pagination
