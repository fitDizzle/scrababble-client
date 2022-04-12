import {
  AI_MAKE_PLAY,
  AI_RE_DRAW,
  AI_PLAY_SINGLE_TILE,
  INITIAL_GAME_SETUP,
  LOAD_SAVED_GAME_SETUP,
  MAIN_POST_REFRESH
} from "../actions/types/types";

const initialState = {
  level: "",
  tiles: [],
  score: 0,
  wordsPlayed: [],
  highestWordScore: {
    word: "",
    score: 0,
    multiplier: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AI_PLAY_SINGLE_TILE:
      return {
        ...state,
        tiles: action.payload.newTiles
      }
    case AI_RE_DRAW:
      return {
        ...state,
        tiles: action.payload.playerTiles,
      };
    case AI_MAKE_PLAY:
      return {
        ...state,
        score: action.payload.score,
        wordsPlayed: action.payload.wordsPlayed,
        highestWordScore: action.payload.highestWordScore,
        tiles: action.payload.newTiles
      };
    case INITIAL_GAME_SETUP:
      return {
        ...state,
        level: action.payload.level,
        tiles: action.payload.aiTiles,
        score: 0,
        wordsPlayed: [],
        highestWordScore: {
          word: "",
          score: 0,
          multiplier: "",
        },
      };
    case LOAD_SAVED_GAME_SETUP:
    case MAIN_POST_REFRESH:
        return {
          ...state,
          level: action.payload.ai.level,
          tiles: action.payload.ai.tiles,
          score: action.payload.ai.score,
          wordsPlayed: action.payload.ai.wordsPlayed,
          highestWordScore: action.payload.ai.highestWordScore
        }
    default:
      return state;
  }
}
