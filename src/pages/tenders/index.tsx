import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./Tenders.module.scss";
import { Tender } from "../../models/tenderModel";
import TenderTable from "../../components/tender/TenderTable";
import TenderSearch from "../../components/tender/TenderSearch";
import TenderForm from "../../components/tender/TenderForm";
import Pagination from "../../components/shared/Pagination";

const Tenders: FC = () => {
  const [tenderList] = useState(fakeData);
  const [currentPage, setCurrentPage] = useState(2);

  const handleChangePage = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className={clsx(styles.container)}>
      <TenderSearch />
      <div className={clsx(styles.sectionForm)}>
        <TenderForm />
      </div>
      <div className={clsx(styles.sectionTable)}>
        <div className={clsx(styles.pagination)}>
          <Pagination
            onClick={handleChangePage}
            currentPage={currentPage}
            totalPage={10}
            currentResult={8}
            totalResult={101}
          />
        </div>
        <div className={clsx(styles.table)}>
          <TenderTable tenderList={tenderList} />
        </div>
      </div>
    </div>
  );
};

export default Tenders;

var fakeData: Tender[] = [
  {
    id: "HSMT_001/2022",
    creatorName: "Nguyễn Diệu Linh",
    creatorEmail: "linhnd@fpt.com.vn",
    proposalCode: "PR537949534",
    company: "FHO",
    packageName: "Gói thầu mua sắm...",
    expiredAt: "15/12/2022",
  },
  {
    id: "HSMT_001/2022",
    creatorName: "Nguyễn Diệu Linh",
    creatorEmail: "linhnd@fpt.com.vn",
    proposalCode: "PR537949534",
    company: "FHO",
    packageName: "Gói thầu mua sắm...",
    expiredAt: "15/12/2022",
  },
  {
    id: "HSMT_001/2022",
    creatorName: "Nguyễn Diệu Linh",
    creatorEmail: "linhnd@fpt.com.vn",
    proposalCode: "PR537949534",
    company: "FHO",
    packageName: "Gói thầu mua sắm...",
    expiredAt: "15/12/2022",
  },
];
