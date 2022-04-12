
import {
  PLAYER_VALID_PLAY_SUCCESS,
  AI_MAKE_PLAY,
  AI_PLAY_SINGLE_TILE,
  PLAYER_UPDATE_CURRENT_PLAY,
  PLAYER_CLEAR_CURRENT_PLAYS,
  INITIAL_GAME_SETUP,
  LOAD_SAVED_GAME_SETUP,
  MAIN_POST_REFRESH
} from "../actions/types/types";

const initialState = {
  lockedIn: [],
  current: [],
  isPlayerActive: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AI_PLAY_SINGLE_TILE:
    case AI_MAKE_PLAY:
    case PLAYER_VALID_PLAY_SUCCESS:
      return {
        ...state,
        lockedIn: [...state.lockedIn, ...action.payload.movesToLock],
        current: [],
      };
    case PLAYER_UPDATE_CURRENT_PLAY:
      return {
        ...state,
        current: action.payload.current,
      };
    case PLAYER_CLEAR_CURRENT_PLAYS:
      return {
        ...state,
        current: [],
      };
    case INITIAL_GAME_SETUP:
      return {
        ...state,
        lockedIn: [],
        current: [],
      };
      case LOAD_SAVED_GAME_SETUP:
      case MAIN_POST_REFRESH:
        return {
          ...state,
          lockedIn: action.payload.plays.lockedIn,
          current: action.payload.plays.current
        }
    default:
      return state;
  }
}
