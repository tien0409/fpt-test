import { FC, useState } from "react";
import clsx from "clsx";

import styles from "./Id.module.scss";
import TenderDetailFilter from "../../components/tender/TenderDetailFilter";
import TenderDetailDocument from "../../components/tender/TenderDetailDocument";
import TenderDetailOption from "../../components/tender/TenderDetailOption";

export interface TenderDetail {
  productName: string;
  productImage: string;
  productDescription: string;
  productQuantity: number;
  productUnit: string;
  otherRequirements: string;
}

export interface TenderDocument {
  documentName: string;
  required: boolean;
  file: string;
  filing: string;
}

export interface BiddingDocument {
  supplier: string;
  dateRequest: string;
  content: string;
  file?: string;
  dateResponse: string;
  feedback: string;
  public: boolean;
}

const TenderDetailPage: FC = () => {
  const [tenderDetailList, setTenderDetailList] =
    useState<TenderDetail[]>(_tenderDetailList);
  const [tenderDocumentList, setTenderDocumentList] =
    useState<TenderDocument[]>(_tenderDocumentList);
  const [biddingDocumentList, setBiddingDocumentList] =
    useState<BiddingDocument[]>(_biddingDocumentList);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.main)}>
        <div className={clsx(styles.information)}>
          <div className={clsx(styles.titleWrapper)}>
            <h3>THÔNG TIN ĐẤU THẦU</h3>
            <h3>HỦY ĐẤU THẦU</h3>
          </div>
          <div className={clsx(styles.filterSection)}>
            <TenderDetailFilter
              setTenderDetailList={setTenderDetailList}
              tenderDetailList={tenderDetailList}
            />
          </div>

          <div className={clsx(styles.documentSelection)}>
            <TenderDetailDocument
              setBiddingDocumentList={setBiddingDocumentList}
              biddingDocumentList={biddingDocumentList}
              setTenderDocumentList={setTenderDocumentList}
              tenderDocumentList={tenderDocumentList}
            />
          </div>
        </div>

        <div className={clsx(styles.options)}>
          <TenderDetailOption />
        </div>
      </div>
    </div>
  );
};

export default TenderDetailPage;

var _tenderDetailList: TenderDetail[] = [
  {
    productName: "Máy Laptop Razer Blade 15",
    productImage: "",
    productDescription:
      "The newest Razer Blade ultraportable gaming laptop has a lot to love, but a higher price...",
    productQuantity: 1000,
    productUnit: "Chiếc",
    otherRequirements: "Thích thì mua thật nhiều thôi chứ chả có ý gì...",
  },
  {
    productName: "Máy Laptop Razer Blade 15",
    productImage: "",
    productDescription:
      "The newest Razer Blade ultraportable gaming laptop has a lot to love, but a higher price...",
    productQuantity: 1000,
    productUnit: "Chiếc",
    otherRequirements: "Thích thì mua thật nhiều thôi chứ chả có ý gì...",
  },
];

var _tenderDocumentList: TenderDocument[] = [
  {
    documentName: "Đơn dự thầu (theo mẫu)",
    required: true,
    file: "Hồ sơ số 01.doc",
    filing: "20/11/2021",
  },
];

var _biddingDocumentList: BiddingDocument[] = [
  {
    supplier: "Máy tính FPT",
    dateRequest: "20/11/2021",
    content: "Nội dung ở mục 01",
    dateResponse: "25/11/2021",
    feedback: "Yêu cầu bổ sung HS tư cách pháp nhân",
    file: "asda",
    public: false,
  },
  {
    supplier: "Máy tính FPT",
    dateRequest: "20/11/2021",
    content: "Nội dung ở mục 01",
    dateResponse: "25/11/2021",
    feedback: "Yêu cầu bổ sung HS tư cách pháp nhân",
    public: false,
  },
];
