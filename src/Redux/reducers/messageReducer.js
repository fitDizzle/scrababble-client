import {
  INITIAL_GAME_SETUP,
  UPDATE_MESSAGES,
  NEW_GAME_MESSAGE,
  CLEAR_MESSAGES
} from "../actions/types/types";

const initialState = {
  gameFeedMessages: [],
  aiMessages: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGES:
      return {
        ...state,
        gameFeedMessages: action.payload[1]
          ? Array.from(
              new Set([...state.gameFeedMessages, action.payload[1]])
            ).flat()
          : [...state.gameFeedMessages],
        aiMessages: action.payload[0] ? action.payload[0] : state.aiMessages,
      };
    case NEW_GAME_MESSAGE:
      return {
        ...state,
        gameFeedMessages: [...state.gameFeedMessages, action.payload.game],
        aiMessages: [action.payload.ai],
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        gameFeedMessages: [],
        aiMessages: [],
      };
    case INITIAL_GAME_SETUP:
      return {
        ...state,
        gameFeedMessages: [],
        aiMessages: [],
      };

    default:
      return state;
  }
}
