import { FC } from "react";
import clsx from "clsx";

import { Tender } from "../../models/tenderModel";
import styles from "./TenderTable.module.scss";

interface Props {
  tenderList: Tender[];
}

const TenderTable: FC<Props> = ({ tenderList }) => {
  return (
    <div
      className={clsx(styles.container, "custom__scroll custom__scroll--small")}
    >
      <div className={clsx(styles.wrapper)}>
        <table className={clsx(styles.table)}>
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
                  <div className={clsx(styles.columnValue, styles.id)}>
                    {tender.id}
                  </div>
                  <div className={styles.columnLabel}>Hồ sơ mời thầu</div>
                </td>
                <td>
                  <div className={clsx(styles.columnValue)}>
                    {tender.creatorName}
                  </div>
                  <div className={styles.columnLabel}>
                    {tender.creatorEmail}
                  </div>
                </td>
                <td>
                  <div
                    className={clsx(styles.columnValue, styles.proposalCode)}
                  >
                    {tender.proposalCode}
                  </div>
                  <div
                    className={clsx(styles.columnLabel, styles.proposalCode)}
                  >
                    Mã đề nghị
                  </div>
                </td>
                <td>
                  <div className={clsx(styles.columnValue)}>
                    {tender.company}
                  </div>
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
                  <button className="btn btnPrimary">
                    <i className={clsx("fas fa-plus", styles.iconBtn)} />
                    <span>Phát hành</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenderTable;
