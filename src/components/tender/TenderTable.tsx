import clsx from "clsx";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tender } from "../../pages/tenders";
import { InputTenderSelected } from "../../pages/tenders/actions";
import Button from "../shared/Button";
import EditableCell from "../shared/EditableCell";
import InputField from "../shared/InputField";
import Table from "../shared/Table";
import styles from "./TenderTable.module.scss";

interface Props {
  tenderList: Tender[];
  tendersEditing: Tender[];
  onRemove: (tenderId: string) => void;
  onSave: (tenderId: string) => void;
  onEditing: (inputTender: InputTenderSelected) => void;
  onEnableEdit: (tender: Tender) => void;
  onCancelEdit: (tender: Tender) => void;
  onFilter: (filters: TenderFilter) => void;
}

export type TenderFilter = {
  [key in keyof Tender as string]?: string;
};

const TenderTable: FC<Props> = ({
  tenderList,
  tendersEditing,
  onRemove,
  onSave,
  onEditing,
  onEnableEdit,
  onCancelEdit,
  onFilter,
}) => {
  const [filters, setFilters] = useState<TenderFilter>({ // require sorted keys same Tende interface
    id: "",
    creatorName: "",
    proposalCode: "",
    company: "",
    packageName: "",
  });

  const handleRemove = (tenderId: string) => {
    if (window.confirm("Are your sure ?")) {
      onRemove(tenderId);
    }
  };

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const isEditing = (tenderId: string): boolean => {
    return !!tendersEditing.find((tender) => tender.id === tenderId);
  };

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
        <tr className={clsx(styles.headFilter)}>
          {Object.keys(filters).map((filter) => (
            <th key={filter}>
              <InputField
                onChange={(e) => handleChangeFilter(e)}
                value={filters[filter]}
                name={filter}
              />
            </th>
          ))}
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
              <EditableCell
                className={clsx(styles.columnValue)}
                initValue={tender.creatorName}
                editing={isEditing(tender.id)}
                onChangeValue={(value) =>
                  onEditing({ name: "creatorName", value, tenderId: tender.id })
                }
              />
              <EditableCell
                className={clsx(styles.columnValue)}
                initValue={tender.creatorEmail}
                editing={isEditing(tender.id)}
                onChangeValue={(value) =>
                  onEditing({
                    name: "creatorEmail",
                    value,
                    tenderId: tender.id,
                  })
                }
              />
            </td>
            <td>
              <EditableCell
                className={clsx(styles.columnLabel, styles.proposalCode)}
                initValue={tender.proposalCode}
                editing={isEditing(tender.id)}
                onChangeValue={(value) =>
                  onEditing({
                    name: "proposalCode",
                    value,
                    tenderId: tender.id,
                  })
                }
              />
              <div className={clsx(styles.columnLabel, styles.proposalCode)}>
                Mã đề nghị
              </div>
            </td>
            <td>
              <EditableCell
                className={clsx(styles.columnValue)}
                initValue={tender.company}
                editing={isEditing(tender.id)}
                onChangeValue={(value) =>
                  onEditing({ name: "company", value, tenderId: tender.id })
                }
              />
              <div className={clsx(styles.columnLabel)}>Đơn vị</div>
            </td>
            <td>
              <EditableCell
                className={clsx(styles.columnValue)}
                initValue={tender.packageName}
                editing={isEditing(tender.id)}
                onChangeValue={(value) =>
                  onEditing({ name: "packageName", value, tenderId: tender.id })
                }
              />
              <div className={clsx(styles.columnLabel)}>Tên gói thầu</div>
            </td>
            <td>
              <EditableCell
                inputType="date"
                className={clsx(styles.columnValue, styles.expiredAt)}
                initValue={tender.expiredAt}
                editing={isEditing(tender.id)}
                onChangeValue={(value) =>
                  onEditing({ name: "expiredAt", value, tenderId: tender.id })
                }
              />
              <div className={clsx(styles.columnLabel, styles.expiredAt)}>
                Thời gian kết thúc
              </div>
            </td>
            <td>
              <div className={clsx(styles.buttonGroup)}>
                <Button variant="primary" className={clsx(styles.button)}>
                  <i className={clsx("fas fa-plus", styles.iconBtn)} />
                  <span>Phát hành</span>
                </Button>

                {isEditing(tender.id) ? (
                  <div className={clsx(styles.buttonGroup)}>
                    <Button
                      onClick={() => onSave(tender.id)}
                      className={clsx(styles.button)}
                      variant="success"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => onCancelEdit(tender)}
                      className={clsx(styles.button)}
                      variant="cancel"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className={clsx(styles.buttonGroup)}>
                    <Button
                      onClick={() => onEnableEdit(tender)}
                      className={clsx(styles.button)}
                      variant="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleRemove(tender.id)}
                      className={clsx(styles.button)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default memo(TenderTable);
