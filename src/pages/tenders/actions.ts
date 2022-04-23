import { Tender } from ".";
import { ActionType } from "./constants";

export type Action = {
  type: ActionType;
  payload?: any;
};

export type InputTenderSelected = {
  name: string;
  value: any;
  tenderId: string;
};
export const editTenderSelected = (payload: InputTenderSelected): Action => ({
  type: ActionType.EDITING_TENDER,
  payload,
});

export const saveEdit = (tenderId: string): Action => ({
  type: ActionType.SAVE_EDIT_TENDER,
  payload: tenderId,
});

export const enableEdit = (tender: Tender | null): Action => ({
  type: ActionType.ENABLE_EDIT,
  payload: tender,
});

export const cancelEdit = (tender: Tender): Action => ({
  type: ActionType.CANCEL_EDIT,
  payload: tender,
});

export const changePage = (page: number): Action => ({
  type: ActionType.CHANGE_PAGE,
  payload: page,
});

export const toggleModal = (): Action => ({
  type: ActionType.TOGGLE_MODAL,
});

export const addTender = (tender: Tender): Action => ({
  type: ActionType.ADD_TENDER,
  payload: tender,
});

export const removeTender = (tenderId: number | string): Action => ({
  type: ActionType.REMOVE_TENDER,
  payload: tenderId,
});
