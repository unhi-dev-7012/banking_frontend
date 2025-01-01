import { ContactState } from "../contact.state";
import { ContactAction } from "./action";
import { ContactActionType } from "./actionType";

export const contactReducer = (
  state: ContactState,
  action: ContactAction
): ContactState => {
  switch (action.type) {
    case ContactActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case ContactActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case ContactActionType.SET_DATA:
      return { ...state, data: action.payload };
    case ContactActionType.SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    case ContactActionType.SET_BANKS:
      return { ...state, banks: action.payload };
    default:
      return state;
  }
};
