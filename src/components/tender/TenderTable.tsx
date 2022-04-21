import { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./TenderTable.module.scss";
import Button from "../shared/Button";
import Table from "../shared/Table";

export interface Tender {
  id: string;
  creatorName: string;
  creatorEmail: string;
  proposalCode: string;
  company: string;
  packageName: string;
  expiredAt: string;
}

interface Props {
  tenderList: Tender[];
}

const TenderTable: FC<Props> = ({ tenderList }) => {
  return (
    <Table className={clsx(styles.table)}>
      <thead>
        <tr>
          <th>Mã HSMT</th>
          <th>Người lập</th>
          <th>Mã ĐNMS</th>
          <th>Đơn vị đề nghị</th>
          <th>Gói thầu</th>
          <th>Thời gian kết thúc</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tenderList.map((tender, index) => (
          <tr key={index} className={clsx(styles.row)}>
            <td className={styles.idColumn}>
              <Link
                to="/tenders/1"
                className={clsx(styles.columnValue, styles.id)}
              >
                {tender.id}
              </Link>
              <div className={styles.columnLabel}>Hồ sơ mời thầu</div>
            </td>
            <td>
              <div className={clsx(styles.columnValue)}>
                {tender.creatorName}
              </div>
              <div className={styles.columnLabel}>{tender.creatorEmail}</div>
            </td>
            <td>
              <div className={clsx(styles.columnValue, styles.proposalCode)}>
                {tender.proposalCode}
              </div>
              <div className={clsx(styles.columnLabel, styles.proposalCode)}>
                Mã đề nghị
              </div>
            </td>
            <td>
              <div className={clsx(styles.columnValue)}>{tender.company}</div>
              <div className={clsx(styles.columnLabel)}>Đơn vị</div>
            </td>
            <td>
              <div className={clsx(styles.columnValue)}>
                {tender.packageName}
              </div>
              <div className={clsx(styles.columnLabel)}>Tên gói thầu</div>
            </td>
            <td>
              <div className={clsx(styles.columnValue, styles.expiredAt)}>
                {tender.expiredAt}
              </div>
              <div className={clsx(styles.columnLabel, styles.expiredAt)}>
                Thời gian kết thúc
              </div>
            </td>
            <td>
              <Button variant="primary" className={clsx(styles.button)}>
                <i className={clsx("fas fa-plus", styles.iconBtn)} />
                <span>Phát hành</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TenderTable;
