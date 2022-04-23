import { Tender } from ".";
import { Action } from "./actions";
import { ActionType } from "./constants";

const fakeData: Tender[] = [
  {
    id: "HSMT_001/2022",
    creatorName: "Nguyễn Diệu Linh",
    creatorEmail: "linhnd@fpt.com.vn",
    proposalCode: "PR537949534",
    company: "FHO",
    packageName: "Gói thầu mua sắm...",
    expiredAt: "15/12/2022",
  },
  {
    id: "HSMT_002/2022",
    creatorName: "Nguyễn Diệu Linh",
    creatorEmail: "linhnd@fpt.com.vn",
    proposalCode: "PR537949534",
    company: "FHO",
    packageName: "Gói thầu mua sắm...",
    expiredAt: "15/12/2022",
  },
  {
    id: "HSMT_003/2022",
    creatorName: "Nguyễn Diệu Linh",
    creatorEmail: "linhnd@fpt.com.vn",
    proposalCode: "PR537949534",
    company: "FHO",
    packageName: "Gói thầu mua sắm...",
    expiredAt: "15/12/2022",
  },
];

export interface State {
  tenderList: Tender[];
  currentPage: number | string;
  openModal: boolean;
  tendersEditing: Tender[]; // danh sách các tender đang chọn được chọn edit
  tendersEditingBackup: Tender[]; // danh sách các tender đang đc chọn edit (lưu giá trị phục hồi khi cancel)
}

export const initState: State = {
  tenderList: fakeData,
  currentPage: 2,
  openModal: false,
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

    case ActionType.SAVE_EDIT_TENDER: {
      return {
        ...state,
        tendersEditing: state.tendersEditing.filter(
          (tender) => tender.id !== payload
        ),
        tendersEditingBackup: state.tendersEditingBackup.filter(
          (tender) => tender.id !== payload
        ),
      };
    }

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
      return {
        ...state,
        tenderList: state.tenderList.filter((tender) => tender.id !== payload),
      };
    default:
      return state;
  }
};
