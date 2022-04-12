import {
  ADD_BAG_EXCHANGE_CACHE,
  PLAYER_DRAW_FROM_BAG,
  PLAYER_CLEAR_CACHE,
  PLAYER_UPDATE_CURRENT_PLAY,
  PLAYER_VALID_PLAY_SUCCESS,
  PLAYER_CLEAR_CURRENT_PLAYS,
  INITIAL_GAME_SETUP,
  LOAD_SAVED_GAME_SETUP,
  MAIN_POST_REFRESH,
} from "../actions/types/types";


const initialState = {
  username: "",
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
    // case VALIDATE_PLAY_SUCCESS:
    //   return {
    //     ...state,
    //     score: state.score + action.payload.score,
    //     wordsPlayed: action.payload.words,
    //   };

    // case INITIAL_PLAYER_SETUP:
    //   return {
    //     ...state,
    //     username: action.payload.username,
    //     tiles: action.payload.playerTiles,
    //     score: 0,
    //     wordsPlayed: [],
    //     highestWordScore: {
    //       word: "",
    //       score: 0,
    //       multiplier: "",
    //     },
    //   };
    // case PLAYER_REFRESH:
    // case PLAYER_LOAD:
    //   return {
    //     ...state,
    //     username: action.payload.username,
    //     tiles: action.payload.tiles,
    //     score: action.payload.score,
    //     wordsPlayed: action.payload.wordsPlayed,
    //     highestWordScore: action.payload.highestWordScore,
    //   };

    // case UPDATE_PLAYER_TILES:
    //   return {
    //     ...state,
    //     tiles: action.payload,
    //   };
    // case UPDATE_HIGHEST_WORD_SCORE:
    //   return {
    //     ...state,
    //     highestWordScore: {
    //       ...state.highestWordScore,
    //       word: action.payload.word,
    //       score: action.payload.baseValue,
    //       multiplier: action.payload.multipliers,
    //     },
    //   };
    // HERE DOWN
    case PLAYER_VALID_PLAY_SUCCESS:
      return {
        ...state,
        score: action.payload.score,
        wordsPlayed: action.payload.wordsPlayed,
        highestWordScore: action.payload.highestWordScore,
        tiles: action.payload.newTiles
      };
    case ADD_BAG_EXCHANGE_CACHE:
    case PLAYER_DRAW_FROM_BAG:
    case PLAYER_CLEAR_CACHE:
    case PLAYER_UPDATE_CURRENT_PLAY:
    case PLAYER_CLEAR_CURRENT_PLAYS:
      return {
        ...state,
        tiles: action.payload.newTiles,
      };
    case INITIAL_GAME_SETUP:
      return {
        ...state,
        username: action.payload.username,
        tiles: action.payload.playerTiles,
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
        username: action.payload.player.username,
        tiles: action.payload.player.tiles,
        score: action.payload.player.score,
        wordsPlayed: action.payload.player.wordsPlayed,
        highestWordScore: action.payload.player.highestWordScore,
      };

    default:
      return state;
  }
}
