import { Creator, Tender } from ".";
import { Action } from "./actions";
import { ActionType } from "./constants";
import fakeCreator from "./fakeCreator";
import fakeData from "./fakeData";

export interface State {
  tenderList: Tender[];
  creatorList: Creator[];
  creatorSelected: string[];
  currentPage: number | string;
  openModal: boolean;
  openModalCreator: boolean;
  tendersEditing: Tender[]; // danh sách các tender đang chọn được chọn edit
  tendersEditingBackup: Tender[]; // danh sách các tender đang đc chọn edit (lưu giá trị phục hồi khi cancel)
}

export const initState: State = {
  tenderList: fakeData,
  creatorList: fakeCreator,
  creatorSelected: [],
  currentPage: 2,
  openModal: false,
  openModalCreator: false,
  tendersEditing: [],
  tendersEditingBackup: [],
};

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.EDITING_TENDER: {
      const { name, value, tenderId } = payload;
      const tenderEditIndex = state.tenderList.findIndex(
        (tender) => tender.id === tenderId
      );
      const tenderList: Tender[] = [...state.tenderList];
      tenderList[tenderEditIndex] = {
        ...tenderList[tenderEditIndex],
        [name]: value,
      };
      return { ...state, tenderList };
    }

    case ActionType.SAVE_EDIT_TENDER:
      return {
        ...state,
        tendersEditing: state.tendersEditing.filter(
          (tender) => tender.id !== payload
        ),
        tendersEditingBackup: state.tendersEditingBackup.filter(
          (tender) => tender.id !== payload
        ),
      };

    case ActionType.ENABLE_EDIT: {
      const tendersEditingBackup: Tender[] = [
        ...state.tendersEditingBackup,
        payload,
      ];
      const tendersEditing: Tender[] = [...state.tendersEditing, payload];

      return {
        ...state,
        tendersEditing,
        tendersEditingBackup,
      };
    }

    case ActionType.CANCEL_EDIT:
      const index = state.tendersEditing.findIndex(
        (tender) => tender.id === payload.id
      );
      const tenderList = state.tenderList.map((tender) =>
        tender.id === payload.id ? state.tendersEditingBackup[index] : tender
      );

      return {
        ...state,
        tenderList,
        tendersEditing: state.tendersEditing.filter(
          (tender) => tender.id !== payload.id
        ),
        tendersEditingBackup: state.tendersEditingBackup.filter(
          (tender) => tender.id !== payload.id
        ),
      };

    case ActionType.TOGGLE_MODAL:
      return { ...state, openModal: !state.openModal };

    case ActionType.TOGGLE_MODAL_CREATOR:
      return { ...state, openModalCreator: !state.openModalCreator };

    case ActionType.CHANGE_PAGE:
      return { ...state, currentPage: payload };

    case ActionType.ADD_TENDER:
      const tender: Tender = { ...payload };
      tender.id = `${Math.random()}`;
      tender.creatorEmail = `${tender.creatorName}@gmail.com`;
      return {
        ...state,
        tenderList: [...state.tenderList, tender],
        openModal: false,
      };

    case ActionType.REMOVE_TENDER:
      const tenderExist = state.tenderList.find(
        (tender) => tender.id === payload
      );
      if (!tenderExist) return { ...state };

      const indexCreatorRemoved = state.creatorList.findIndex(
        (creator) =>
          `creator ${creator.id}` === tenderExist.id &&
          creator.creatorEmail === tenderExist.creatorEmail &&
          creator.creatorName === tenderExist.creatorName
      );
      const creatorList = [...state.creatorList];
      if (indexCreatorRemoved !== -1) {
        delete creatorList[indexCreatorRemoved].isRemoved;
      }

      return {
        ...state,
        tenderList: state.tenderList.filter((tender) => tender.id !== payload),
        creatorList
      };

    case ActionType.FILTER:
      const tenderListFilter: Tender[] = fakeData.filter((tender) => {
        return Object.keys(payload).every((key: string) => {
          return new RegExp(
            payload[key as keyof typeof payload]?.trim(),
            "g"
          ).test(tender[key as keyof typeof tender]);
        });
      });
      return { ...state, tenderList: tenderListFilter };

    case ActionType.CHECK_CREATOR: {
      const index = state.creatorSelected.findIndex(
        (creatorId) => creatorId === payload
      );
      return {
        ...state,
        creatorSelected:
          index === -1
            ? [...state.creatorSelected, payload]
            : state.creatorSelected.filter(
                (creatorId) => creatorId !== payload
              ),
      };
    }

    case ActionType.CANCLE_CHECK_CREATOR:
      return { ...state, creatorSelected: [] };

    case ActionType.CREATE_TENDER_WITH_CREATOR:
      let newTenders: Tender[] = [];
      const newCreatorList = state.creatorList.map((creator) => {
        const result = state.creatorSelected.includes(creator.id);

        if (result) {
          const tender: Tender = {
            id: `creator ${creator.id}`,
            company: "default",
            expiredAt: "default",
            creatorName: creator.creatorName,
            creatorEmail: creator.creatorEmail,
            packageName: "default",
            proposalCode: "default",
          };
          newTenders.push(tender);
        }

        return result ? { ...creator, isRemoved: true } : creator;
      });
      return {
        ...state,
        creatorList: newCreatorList,
        tenderList: [...state.tenderList, ...newTenders],
        creatorSelected: [],
      };

    default:
      return state;
  }
};
