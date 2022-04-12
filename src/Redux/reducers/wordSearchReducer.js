import {
  GET_ALL_WORDS_SUCCESS,
  GET_RELATIVE_WORDS_SUCCESS,
  CLEAR_SEARCH_SUCCESS,
} from "../actions/types/types";

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RELATIVE_WORDS_SUCCESS:
      return [...state, ...action.payload.words];
    case GET_ALL_WORDS_SUCCESS:
      return [...state, ...action.payload.words];
    case CLEAR_SEARCH_SUCCESS:
      return (state.words = initialState);
    default:
      return state;
  }
}
