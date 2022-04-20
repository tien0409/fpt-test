import { ChangeEvent, FC, useState } from "react";
import clsx from "clsx";

import styles from "./TenderForm.module.scss";
import InputField from "../base/InputField";
import SelectField from "../base/SelectField";

const TenderForm: FC = () => {
  const [id, setId] = useState("");
  const [offset, setOffer] = useState("");
  const [packageName, setPackageName] = useState("");

  return (
    <div className={clsx(styles.inputContainer)}>
      <div className={clsx(styles.inputGroup)}>
        <InputField
          className={clsx(styles.input)}
          label="Mã HSMT"
          id="id"
          type="text"
          placeholder="Nhập mã kế hoạch"
          icon="fas fa-search"
          value={id}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
        />
        <SelectField
          optionList={['Tất cả']}
          className={clsx(styles.input)}
          label="Người tạo kế hoạch"
          id="creator"
        />
        <InputField
          className={clsx(styles.input)}
          label="Mã đề nghị"
          id="offer"
          type="text"
          placeholder="Nhập mã đề nghị"
          icon="fas fa-search"
          value={offset}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setOffer(e.target.value)
          }
        />
        <SelectField
          optionList={['Tất cả']}
          className={clsx(styles.input)}
          label="Đơn vị đề nghị"
          id="company"
        />
      </div>
      <div className={clsx(styles.inputGroup)}>
        <InputField
          className={clsx(styles.input)}
          label="Tên gói thầu"
          id="packageName"
          type="text"
          placeholder="Nhập tên gói thầu"
          icon="fas fa-search"
          value={packageName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPackageName(e.target.value)
          }
        />
        <InputField
          className={clsx(styles.input)}
          label="Thời gian kết thúc gói thầu"
          id="expiredAt"
          type="text"
          placeholder="Từ ngày - Đến ngày"
          icon="far fa-calendar-minus"
          value={packageName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPackageName(e.target.value)
          }
          onFocus={(e: ChangeEvent<HTMLInputElement>) =>  e.target.type = 'date' }
        />
      </div>
    </div>
  );
};

export default TenderForm;
