import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";
import { getImages, RESULTS_PER_PAGE } from "../../api";

export const searchImages = (term: string, page: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_IMAGES,
      payload: { term },
    });

    try {
      const { data } = await getImages(term, page);
      dispatch({
        type: ActionType.SEARCH_IMAGES_SUCCESS,
        payload: {
          term,
          hits: data.hits,
          hasMore: data.totalHits > page * RESULTS_PER_PAGE,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_IMAGES_ERROR,
        payload: (err as Error).message,
      });
    }
  };
};

export const searchMoreImages = (term: string, page: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_MORE_IMAGES,
      payload: { term: term, page },
    });

    try {
      const { data } = await getImages(term, page);
      dispatch({
        type: ActionType.SEARCH_MORE_IMAGES_SUCCESS,
        payload: {
          term,
          hits: data.hits,
          hasMore: data.totalHits > page * RESULTS_PER_PAGE,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_MORE_IMAGES_ERROR,
        payload: (err as Error).message,
      });
    }
  };
};
