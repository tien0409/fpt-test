import { FC } from "react";
import clsx from "clsx";

import styles from "./TenderDetailDocument.module.scss";
import DellImage from "../../assets/images/dell.svg";
import FptImage from "../../assets/images/fpt.svg";
import SelectField from "../shared/SelectField";
import Table from "../shared/Table";
import { BiddingDocument, TenderDocument } from "../../pages/tenders/_id";
import InputField from "../shared/InputField";

interface Props {
  tenderDocumentList: TenderDocument[];
  setTenderDocumentList: (tenderDocumentList: TenderDocument[]) => void;
  biddingDocumentList: BiddingDocument[];
  setBiddingDocumentList: (biddingDocumentList: BiddingDocument[]) => void;
}

const TenderDetailDocument: FC<Props> = ({
  tenderDocumentList,
  biddingDocumentList,
  setTenderDocumentList,
  setBiddingDocumentList,
}) => {
  const handleChangePublicBidding = (index: number) => {
    const newBidding = [...biddingDocumentList];
    newBidding[index].public = !newBidding[index].public;
    setBiddingDocumentList(newBidding);
  };

  const handleChangeRequiredDocument = (index: number) => {
    const newDocument = [...tenderDocumentList];
    newDocument[index].required = !newDocument[index].required;
    setTenderDocumentList(newDocument);
  };

  return (
    <div className={clsx(styles.container)}>
      <SelectField
        className={clsx(styles.selectHeadWrapper)}
        optionList={["HỒ SƠ DỰ THẦU CỦA NHÀ THẦU"]}
      />

      <div className={clsx(styles.main)}>
        {/*tab*/}
        <div className={clsx(styles.tabsSection)}>
          <div className={clsx(styles.tab, styles.active)}>
            <img className={clsx(styles.tabImage)} src={FptImage} alt="fpt" />
            <div className={clsx(styles.tabInfo)}>
              <h4 className={clsx(styles.name)}>Máy tính FPT</h4>
              <div className={clsx(styles.id)}>MST - 0101248141</div>
            </div>
          </div>
          <div className={clsx(styles.tab)}>
            <img className={clsx(styles.tabImage)} src={DellImage} alt="dell" />
            <div className={clsx(styles.tabInfo)}>
              <h4 className={clsx(styles.name)}>Máy tính FPT</h4>
              <div className={clsx(styles.id)}>MST - 0101248141</div>
            </div>
          </div>
        </div>

        {/*table*/}
        <div
          className={clsx(
            styles.tableSection,
            "custom__scroll custom__scroll--small"
          )}
        >
          <SelectField
            className={clsx(styles.selectWrapper)}
            optionList={["HỒ SƠ NỘP THẦU"]}
          />
          <br />
          <SelectField
            className={clsx(styles.selectWrapper, styles.dark)}
            optionList={["Hồ sơ năng lực kinh nghiệm"]}
          />
          <Table className={clsx(styles.table)}>
            <thead>
              <tr>
                <th className={clsx(styles.idColumn)}>STT</th>
                <th className={clsx(styles.documentNameColumn)}>Tên hồ sơ</th>
                <th className={clsx(styles.requiredColumn)}>Bắt buộc</th>
                <th className={clsx(styles.fileColumn)}>File hồ sơ</th>
                <th className={clsx(styles.filingColumn)}>Ngày nộp</th>
              </tr>
            </thead>
            <tbody>
              {tenderDocumentList.map((document, index) => (
                <tr key={index}>
                  <td className={clsx(styles.idColumn)}>{index + 1}</td>
                  <td className={clsx(styles.documentNameColumn)}>
                    {document.documentName}
                  </td>
                  <td className={clsx(styles.requiredColumn)}>
                    <InputField
                      checked={document.required}
                      className={clsx(styles.checkbox)}
                      type="checkbox"
                      onChange={() => handleChangeRequiredDocument(index)}
                    />
                  </td>
                  <td className={clsx(styles.fileColumn)}>{document.file}</td>
                  <td className={clsx(styles.filingColumn)}>
                    {document.filing}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className={clsx(styles.documentTextGroup)}>
            <SelectField
              className={clsx(styles.selectWrapper, styles.dark)}
              optionList={["Hồ sơ kỹ thuật và biện pháp thi công"]}
            />
            <h5 className={clsx(styles.documentText)}>Hồ sơ tài chính</h5>
            <h5 className={clsx(styles.documentText)}>Hồ sơ khác</h5>
          </div>
        </div>
      </div>

      <div className={clsx(styles.biddingDocument)}>
        <SelectField
          className={clsx(styles.selectHeadWrapper)}
          optionList={["LÀM RÕ HỒ SƠ MỜI THẦU"]}
        />
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Nhà cung cấp</th>
              <th>Ngày YC</th>
              <th>Nội dung cần làm rõ</th>
              <th className={clsx(styles.fileColumn)}>File yêu cầu</th>
              <th>Ngày phản hồi</th>
              <th>Thông tin phản hồi</th>
              <th className={clsx(styles.publicColumn)}>Public</th>
            </tr>
          </thead>
          <tbody>
            {biddingDocumentList.map((document, index) => (
              <tr className={clsx(styles.row)} key={index}>
                <td>{index + 1}</td>
                <td>{document.supplier}</td>
                <td>{document.dateRequest}</td>
                <td>{document.content}</td>
                <td className={clsx(styles.fileColumn)}>
                  {document.file && <i className={clsx("fas fa-link")}></i>}
                </td>
                <td>{document.dateResponse}</td>
                <td>{document.feedback}</td>
                <td className={clsx(styles.publicColumn)}>
                  <InputField
                    checked={document.public}
                    className={clsx(styles.checkbox)}
                    type="checkbox"
                    onChange={() => handleChangePublicBidding(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TenderDetailDocument;
