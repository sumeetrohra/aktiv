import { ActionType } from "../action-types";
import { Image } from "../../api/index";

interface SearchImagesAction {
  type: ActionType.SEARCH_IMAGES;
  payload: {
    term: string;
  };
}

interface SearchImagesSuccessAction {
  type: ActionType.SEARCH_IMAGES_SUCCESS;
  payload: { term: string; hits: Image[]; hasMore: boolean };
}

interface SearchImagesErrorAction {
  type: ActionType.SEARCH_IMAGES_ERROR;
  payload: string;
}

interface SearchMoreImagesAction {
  type: ActionType.SEARCH_MORE_IMAGES;
  payload: {
    term: string;
    page: number;
  };
}

interface SearchMoreImagesSuccessAction {
  type: ActionType.SEARCH_MORE_IMAGES_SUCCESS;
  payload: { term: string; hits: Image[]; hasMore: boolean };
}

interface SearchMoreImagesErrorAction {
  type: ActionType.SEARCH_MORE_IMAGES_ERROR;
  payload: string;
}

export type Action =
  | SearchImagesAction
  | SearchImagesSuccessAction
  | SearchImagesErrorAction
  | SearchMoreImagesAction
  | SearchMoreImagesSuccessAction
  | SearchMoreImagesErrorAction;
