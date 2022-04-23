import clsx from "clsx";
import { FC, FormEvent, memo, useReducer } from "react";
import { Tender } from "../../pages/tenders";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import Modal from "../shared/Modal";
import styles from "./TenderModal.module.scss";


interface Props {
  openModal: boolean;
  setOpenModal: () => void;
  onCreate: (tender: Tender) => void;
}

enum ActionType {
  "SET_DATA",
  "RESET_DATA",
}

type Action = {
  type: ActionType;
  payload?: any;
};

const initState: Tender = {
  id: "",
  company: "",
  expiredAt: "",
  creatorName: "",
  packageName: "",
  creatorEmail: "",
  proposalCode: "",
};

type InputValue = { name: string; value: any };
const setData = (payload: InputValue): Action => ({
  type: ActionType.SET_DATA,
  payload,
});

const resetData = (): Action => ({
  type: ActionType.RESET_DATA,
});

const reducer = (state: Tender, action: any): Tender => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SET_DATA:
      const { name, value } = payload;
      return { ...state, [name]: value };
    case ActionType.RESET_DATA:
      return initState;
    default:
      return state;
  }
};

const TenderModal: FC<Props> = ({ openModal, setOpenModal, onCreate }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    onCreate(state);
    dispatch(resetData());
  };

  return openModal ? (
    <Modal onClose={() => setOpenModal()}>
      <form onSubmit={handleCreate} className={clsx(styles.form)}>
        <InputField
          onChange={({ target: { name, value } }) =>
            dispatch(setData({ name, value }))
          }
          value={state.creatorName}
          name="creatorName"
          label="Người lập"
        />

        <InputField
          onChange={({ target: { name, value } }) =>
            dispatch(setData({ name, value }))
          }
          value={state.proposalCode}
          name="proposalCode"
          label="Mã ĐNMS"
        />

        <InputField
          onChange={({ target: { name, value } }) =>
            dispatch(setData({ name, value }))
          }
          value={state.company}
          name="company"
          label="Đơn vị đề nghị"
        />

        <InputField
          onChange={({ target: { name, value } }) =>
            dispatch(setData({ name, value }))
          }
          value={state.packageName}
          name="packageName"
          label="Gói thầu"
        />

        <InputField
          onChange={({ target: { name, value } }) =>
            dispatch(setData({ name, value }))
          }
          value={state.expiredAt}
          name="expiredAt"
          type="date"
          label="Thời gian kết thúc"
        />

        <Button type="submit" variant="primary">
          Create
        </Button>
      </form>
    </Modal>
  ) : null;
};

export default memo(TenderModal);
