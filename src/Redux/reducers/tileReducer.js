import {
  ADD_BAG_EXCHANGE_CACHE,
  PLAYER_VALID_PLAY_SUCCESS,
  PLAYER_DRAW_FROM_BAG,
  PLAYER_CLEAR_CACHE,
  INITIAL_GAME_SETUP,
  LOAD_SAVED_GAME_SETUP,
  MAIN_POST_REFRESH,
  AI_MAKE_PLAY,
  AI_RE_DRAW
} from "../actions/types/types";

const initialState = {
  tileBag: {},
  tilesUsed: {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
    blank: 0,
  },
  exchangeCache: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case UPDATE_BAG:
    //   return {
    //     ...state,
    //     tileBag: action.payload.updatedTiles,
    //     tilesUsed: action.payload.usedTiles,
    //     exchangeCache: "cleared"
    //   };

    // // case UPDATE_BAG_EXCHANGE_CACHE_ADD:
    // //   return {
    // //     ...state,
    // //     exchangeCache: action.payload,
    // //   };
    // case CLEAR_EXCHANGE_CACHE:
    //   return {
    //     ...state,
    //     exchangeCache: "cleared",
    //   };
    // case UPDATE_BAG_EXCHANGE_CACHE_REFRESH:
    //   return {
    //     ...state,
    //     exchangeCache: action.payload,
    //   };
    // case BAG_LOAD:
    //   return {
    //     ...state,
    //     tileBag: action.payload.tileBag,
    //     tilesUsed: action.payload.usedTiles,
    //     exchangeCache: action.payload.exchangeCache,
    //   };

    // Here DOWN
    case INITIAL_GAME_SETUP:
    case PLAYER_DRAW_FROM_BAG:
    case PLAYER_VALID_PLAY_SUCCESS:
    case AI_RE_DRAW:
    case AI_MAKE_PLAY:
      return {
        ...state,
        tileBag: action.payload.updatedTiles,
        tilesUsed: action.payload.usedTiles,
        exchangeCache: "cleared",
      };
    case ADD_BAG_EXCHANGE_CACHE:
    case PLAYER_CLEAR_CACHE:
      return {
        ...state,
        exchangeCache: action.payload.cache,
      };
    case LOAD_SAVED_GAME_SETUP:
    case MAIN_POST_REFRESH:
      return {
        ...state,
        tileBag: action.payload.tiles.tileBag,
        tilesUsed: action.payload.tiles.tilesUsed,
        exchangeCache: action.payload.cache,
      };
    default:
      return state;
  }
}
