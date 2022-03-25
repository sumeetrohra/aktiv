import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Image } from "../../api/index";

export interface ImagesState {
  loading: boolean;
  error: string | null;
  data: Image[];
  term: string;
  page: number;
  hasMore: boolean;
}

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [],
  term: "",
  page: 1,
  hasMore: false,
};

const reducer = (
  state: ImagesState = INITIAL_STATE,
  action: Action
): ImagesState => {
  switch (action.type) {
    case ActionType.SEARCH_IMAGES:
      return {
        hasMore: false,
        loading: true,
        error: null,
        data: [],
        term: action.payload.term,
        page: 1,
      };

    case ActionType.SEARCH_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.hits,
        hasMore: action.payload.hasMore,
        page: 1,
      };

    case ActionType.SEARCH_IMAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        hasMore: false,
      };

    case ActionType.SEARCH_MORE_IMAGES: {
      return {
        ...state,
        loading: true,
        error: null,
        term: action.payload.term,
        page: action.payload.page,
      };
    }

    case ActionType.SEARCH_MORE_IMAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, ...action.payload.hits],
        term: action.payload.term,
        hasMore: action.payload.hasMore,
      };
    }

    case ActionType.SEARCH_MORE_IMAGES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        hasMore: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
