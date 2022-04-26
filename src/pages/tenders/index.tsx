import clsx from "clsx";
import { FC, useCallback, useReducer } from "react";
import Button from "../../components/shared/Button";
import Pagination from "../../components/shared/Pagination";
import TenderForm from "../../components/tender/TenderForm";
import TenderModal from "../../components/tender/TenderModal";
import TenderModalCreator from "../../components/tender/TenderModalCreator";
import TenderSearch from "../../components/tender/TenderSearch";
import TenderTable, { TenderFilter } from "../../components/tender/TenderTable";
import {
  addTender,
  cancelCheckCreator,
  cancelEdit,
  changePage,
  checkCreator,
  createTenderWithCreator,
  editTenderSelected,
  enableEdit,
  filterTender,
  InputTenderSelected,
  removeTender,
  saveEdit,
  toggleModal,
  toggleModalCreator,
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

export interface Creator {
  id: string;
  creatorName: string;
  creatorEmail: string;
  isRemoved?: boolean;
}

const Tenders: FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleCreate = useCallback((tender: Tender) => {
    dispatch(addTender(tender));
  }, []);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal());
  }, []);

  const handleToggleModalCreator = useCallback(() => {
    dispatch(toggleModalCreator());
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

  const handleFilter = useCallback((filters: TenderFilter) => {
    dispatch(filterTender(filters));
  }, []);

  const handleCheckCreator = useCallback((creatorId: string) => {
    dispatch(checkCreator(creatorId));
  }, []);

  const handleCancelCheckCreator = useCallback(() => {
    dispatch(cancelCheckCreator());
  }, []);

  const handleSaveCheckCreator = useCallback(() => {
    dispatch(createTenderWithCreator());
  }, []);

  return (
    <div className={clsx(styles.container)}>
      <h2 className={clsx(styles.title)}>THÔNG TIN ĐẤU THẦU</h2>
      <TenderModal
        onCreate={handleCreate}
        setOpenModal={handleToggleModal}
        openModal={state.openModal}
      />
      <TenderModalCreator
        creatorList={state.creatorList}
        creatorSelected={state.creatorSelected}
        setOpenModalCreator={handleToggleModalCreator}
        openModalCreator={state.openModalCreator}
        onCheck={handleCheckCreator}
        onCancel={handleCancelCheckCreator}
        onSave={handleSaveCheckCreator}
      />
      <div className={clsx(styles.searchSection)}>
        <TenderSearch />
      </div>
      <div className={clsx(styles.formSection)}>
        <TenderForm />
      </div>
      <div className={clsx(styles.tableSection)}>
        <div className={clsx(styles.btnGroup)}>
          <Button
            onClick={() => dispatch(toggleModal())}
            className={clsx(styles.addBtn)}
            variant="primary"
          >
            Add
          </Button>
          <Button
            onClick={() => dispatch(toggleModalCreator())}
            className={clsx(styles.addBtn)}
            variant="primary"
          >
            Add With Creator
          </Button>
        </div>
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
            onFilter={handleFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Tenders;
