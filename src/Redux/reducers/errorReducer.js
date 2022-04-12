import {
  MAIN_POST_REFRESH,
  AUTH_POST_REFRESH,
  AUTH_ERROR,
  SERVER_ERROR,
  APP_ERROR_SHOW,
  APP_ERROR_HIDE,
  AI_MAKE_PLAY,
  AI_RE_DRAW,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  ADD_BAG_EXCHANGE_CACHE,
  PLAYER_CLEAR_CACHE,
  PLAYER_DRAW_FROM_BAG,
  PLAYER_VALID_PLAY_SUCCESS,
  PLAYER_UPDATE_CURRENT_PLAY,
  PLAYER_CLEAR_CURRENT_PLAYS,
  PLAYER_SKIP_TURN,
  INITIAL_GAME_SETUP,
  SAVE_UPDATE_GAME_SUCCESS,
  LOAD_SAVED_GAME_SETUP,
  UPDATE_MESSAGES,
  DELETE_GAME_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  RESET_SETTINGS_SUCCESS,
  GET_SETTINGS_SUCCESS,
  UPDATE_THEME_SUCCESS
} from "../actions/types/types";

const initialState = {
  type: null,
  message: null,
  display: false,
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AI_RE_DRAW:
    case AI_MAKE_PLAY:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case ADD_BAG_EXCHANGE_CACHE:
    case PLAYER_CLEAR_CACHE:
    case PLAYER_DRAW_FROM_BAG:
    case PLAYER_VALID_PLAY_SUCCESS:
    case PLAYER_UPDATE_CURRENT_PLAY:
    case PLAYER_CLEAR_CURRENT_PLAYS:
    case PLAYER_SKIP_TURN:
    case INITIAL_GAME_SETUP:
    case SAVE_UPDATE_GAME_SUCCESS:
    case LOAD_SAVED_GAME_SETUP:
    case UPDATE_MESSAGES:
    case AUTH_POST_REFRESH:
    case MAIN_POST_REFRESH:
    case DELETE_GAME_SUCCESS:
    case UPDATE_SETTINGS_SUCCESS:
    case RESET_SETTINGS_SUCCESS:
    case GET_SETTINGS_SUCCESS:
    case UPDATE_THEME_SUCCESS:
      return {
        ...state,
        type: null,
        message: null,
        display: false,
        status: null,
      };
    case SERVER_ERROR:
    case AUTH_ERROR:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        display: action.payload.display,
        status: action.payload.status,
      };
    // Here down
    case APP_ERROR_HIDE:
    case APP_ERROR_SHOW:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.msg,
        display: action.payload.display,
      };
    default:
      return state;
  }
}
