import {
  GET_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  RESET_SETTINGS_SUCCESS,
} from "../actions/types/types";

const initialState = {
  lifeLines: false,
  wordSuggestions: false,
  bagCount: false,
  wordSearch: false,
  darkMode: false,
  msg: ""
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS_SUCCESS:
      return {
        ...state,
        lifeLines: action.payload.lifeLines,
        wordSuggestions: action.payload.wordSuggestions,
        wordSearch: action.payload.wordSearch,
        bagCount: action.payload.bagCount,
        msg: action.payload.msg,
        darkMode: action.payload.darkMode
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        [action.payload.name]: !state[action.payload.name],
        msg: action.payload.msg,
      };
    case RESET_SETTINGS_SUCCESS:
      return {
        ...state,
        lifeLines: action.payload.lifeLines,
        wordSuggestions: action.payload.wordSuggestions,
        wordSearch: action.payload.wordSearch,
        bagCount: action.payload.bagCount,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
}
