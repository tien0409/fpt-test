import clsx from "clsx";
import { FC } from "react";
import { Creator } from "../../pages/tenders";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import Modal from "../shared/Modal";
import Table from "../shared/Table";
import styles from "./TenderModalCreator.module.scss";

interface Props {
  creatorList: Creator[];
  creatorSelected: string[];
  openModalCreator: boolean;
  setOpenModalCreator: () => void;
  onCheck: (creatorId: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const TenderModalCreator: FC<Props> = ({
  creatorList,
  creatorSelected,
  openModalCreator,
  setOpenModalCreator,
  onCheck,
  onCancel,
  onSave,
}) => {
  const handleCancel = () => {
    onCancel();
    setOpenModalCreator();
  };

  const handleSave = () => {
    onSave();
    setOpenModalCreator();
  };

  return openModalCreator ? (
    <Modal
      className={clsx(styles.container)}
      onClose={() => setOpenModalCreator()}
    >
      <div className={clsx(styles.buttonGroup)}>
        <Button
          onClick={handleSave}
          className={clsx(styles.button)}
          variant="success"
        >
          Save
        </Button>
        <Button
          onClick={handleCancel}
          className={clsx(styles.button)}
          variant="cancel"
        >
          Cancel
        </Button>
      </div>

      <Table className={clsx(styles.table)}>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Creator Name</th>
            <th>Creator Email</th>
          </tr>
        </thead>

        <tbody>
          {creatorList.map((creator) => !creator?.isRemoved && (
            <tr className={clsx(styles.row)} key={creator.id}>
              <td>
                <InputField
                  checked={creatorSelected.includes(creator.id)}
                  onChange={() => onCheck(creator.id)}
                  className={clsx(styles.input)}
                  type="checkbox"
                />
              </td>
              <td>{creator.id}</td>
              <td>{creator.creatorName}</td>
              <td>{creator.creatorEmail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal>
  ) : null;
};

export default TenderModalCreator;
