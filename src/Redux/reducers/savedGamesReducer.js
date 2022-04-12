import {
  FETCH_ACTIVE_GAMES,
  DELETE_ACTIVE_GAME_SUCCESS,
} from "../actions/types/types";

const initialState = {
  savedGames: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVE_GAMES:
      return {
        ...state,
        savedGames: action.payload,
      };
    case DELETE_ACTIVE_GAME_SUCCESS:
      return {
        ...state,
        savedGames: state.savedGames.filter(
          (game) => game.gameId !== action.payload
        ),
      };
    default:
      return state;
  }
}
