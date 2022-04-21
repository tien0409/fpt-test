import { FC } from "react";
import clsx from "clsx";

import SelectField from "../shared/SelectField";
import styles from "./TenderDetailFilter.module.scss";
import LaptopImage from "../../assets/images/laptop.svg";
import Table from "../shared/Table";
import { TenderDetail } from "../../pages/tenders/_id";
import Button from "../shared/Button";

interface Props {
  tenderDetailList: TenderDetail[];
  setTenderDetailList: (tenderDetailList: TenderDetail[]) => void;
}

const TenderDetailFilter: FC<Props> = ({
  tenderDetailList,
  setTenderDetailList,
}) => {
  return (
    <div>
      <div className={clsx(styles.filterSection)}>
        <SelectField
          className={clsx(styles.select)}
          optionList={["THÔNG TIN CHI TIẾT"]}
        />
      </div>
      <div className={clsx(styles.filterSection)}>
        <SelectField
          className={clsx(styles.select)}
          optionList={["THÔNG BÁO MỜI THẦU"]}
        />
      </div>
      <div className={clsx(styles.tableSection)}>
        <div>
          <SelectField
            className={clsx(styles.select)}
            optionList={["THÔNG TIN GÓI THẦU"]}
          />
        </div>
        <Table className={clsx(styles.table)}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn vị tính</th>
              <th className={clsx(styles.productOtherRequirements)}>
                Yêu cầu khác
              </th>
            </tr>
          </thead>
          <tbody>
            {tenderDetailList.map((tender, index) => (
              <tr key={index} className={clsx(styles.row)}>
                <td className={clsx(styles.productTextContainer)}>
                  <img
                    className={clsx(styles.productImage)}
                    src={LaptopImage}
                    alt="laptop"
                  />
                  <div className={clsx(styles.productText)}>
                    <h4 className={clsx(styles.productName)}>
                      {tender.productName}
                    </h4>
                    <p className={clsx(styles.productDescription)}>
                      {tender.productDescription}
                    </p>
                  </div>
                </td>
                <td className={clsx(styles.productQuantity)}>
                  {tender.productQuantity}
                </td>
                <td className={clsx(styles.productUnit)}>
                  {tender.productUnit}
                </td>
                <td className={clsx(styles.productOtherRequirements)}>
                  {tender.otherRequirements}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className={clsx(styles.attachmentWrapper)}>
          <Button className={clsx(styles.btnAttach)}>
            <i className={clsx("fas fa-link", styles.iconBtn)}></i>
            <span>Đính kèm</span>
            <span className={clsx(styles.numAttach)}>10</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenderDetailFilter;
