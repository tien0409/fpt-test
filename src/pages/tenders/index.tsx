import clsx from "clsx";
import { FC, useCallback, useReducer } from "react";
import Button from "../../components/shared/Button";
import Pagination from "../../components/shared/Pagination";
import TenderForm from "../../components/tender/TenderForm";
import TenderModal from "../../components/tender/TenderModal";
import TenderSearch from "../../components/tender/TenderSearch";
import TenderTable from "../../components/tender/TenderTable";
import {
  addTender,
  cancelEdit,
  changePage,
  editTenderSelected,
  enableEdit,
  InputTenderSelected,
  removeTender,
  saveEdit,
  toggleModal,
} from "./actions";
import styles from "./Index.module.scss";
import { initState, reducer } from "./reducer";

export interface Tender {
  id: string;
  creatorName: string;
  creatorEmail: string;
  proposalCode: string;
  company: string;
  packageName: string;
  expiredAt: string;
}

const Tenders: FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleCreate = useCallback((tender: Tender) => {
    dispatch(addTender(tender));
  }, []);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal());
  }, []);

  const handleEditing = useCallback(
    ({ name, value, tenderId }: InputTenderSelected) => {
      dispatch(
        editTenderSelected({
          name,
          value,
          tenderId,
        })
      );
    },
    []
  );

  const handleEnableEdit = useCallback((tender: Tender) => {
    dispatch(enableEdit(tender));
  }, []);

  const handleCancelEdit = useCallback((tender: Tender) => {
    dispatch(cancelEdit(tender));
  }, []);

  const handleSave = useCallback((tenderId: string) => {
    dispatch(saveEdit(tenderId));
  }, []);

  const handleRemove = useCallback((tenderId: string) => {
    dispatch(removeTender(tenderId));
  }, []);

  return (
    <div className={clsx(styles.container)}>
      <h2 className={clsx(styles.title)}>THÔNG TIN ĐẤU THẦU</h2>
      <TenderModal
        onCreate={handleCreate}
        setOpenModal={handleToggleModal}
        openModal={state.openModal}
      />
      <div className={clsx(styles.searchSection)}>
        <TenderSearch />
      </div>
      <div className={clsx(styles.formSection)}>
        <TenderForm />
      </div>
      <div className={clsx(styles.tableSection)}>
        <Button
          onClick={() => dispatch(toggleModal())}
          className={clsx(styles.addBtn)}
          variant="primary"
        >
          Add
        </Button>
        <div className={clsx(styles.pagination)}>
          <Pagination
            onClick={(page: number) => dispatch(changePage(page))}
            currentPage={state.currentPage}
            totalPage={4}
            currentResult={8}
            totalResult={101}
          />
        </div>
        <div className={clsx(styles.table)}>
          <TenderTable
            tenderList={state.tenderList}
            tendersEditing={state.tendersEditing}
            onEditing={handleEditing}
            onEnableEdit={handleEnableEdit}
            onCancelEdit={handleCancelEdit}
            onSave={handleSave}
            onRemove={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default Tenders;
