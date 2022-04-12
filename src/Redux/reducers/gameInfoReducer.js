import {
  PLAYER_DRAW_FROM_BAG,
  PLAYER_VALID_PLAY_SUCCESS,
  AI_MAKE_PLAY,
  AI_RE_DRAW,
  PLAYER_SKIP_TURN,
  INITIAL_GAME_SETUP,
  LOAD_SAVED_GAME_SETUP,
  MAIN_POST_REFRESH,
  INCREMENT_SKIP_TURN_COUNT,
  RESET_SKIP_TURN_COUNT,
  UPDATE_GAME_RESULT
} from "../actions/types/types";

const initialState = {
  gameId: null,
  playerActive: true,
  playCount: 0,
  isGameLoaded: false,
  skipTurnCount: 0,
  gameResult: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case AI_RE_DRAW:
    case AI_MAKE_PLAY:
    case PLAYER_DRAW_FROM_BAG:
    case PLAYER_VALID_PLAY_SUCCESS:
    case PLAYER_SKIP_TURN:
      return {
        ...state,
        playerActive: !state.playerActive,
        playCount: state.playCount + 1,
      };
    case INITIAL_GAME_SETUP:
      return {
        ...state,
        gameId: null,
        playerActive: true,
        playCount: 0,
        isGameLoaded: true,
        gameResult: ""
      };
    case LOAD_SAVED_GAME_SETUP:
    case MAIN_POST_REFRESH:
      return {
        ...state,
        gameId: action.payload.gameInfo.gameId,
      };
    case INCREMENT_SKIP_TURN_COUNT:
      return {
        ...state,
        skipTurnCount: state.skipTurnCount + 1,
      };
    case RESET_SKIP_TURN_COUNT:
      return {
        ...state,
        skipTurnCount: 0,
      };
    case UPDATE_GAME_RESULT:
      return {
        ...state,
        gameResult: action.payload,
      };
    default:
      return state;
  }
}
