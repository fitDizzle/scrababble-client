import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

import thunk from "redux-thunk";

import updateMiddleware from "../middleware/updateLocalMiddleware";
import messagingMiddleware from "../middleware/messagingMiddleware";

import { useUpdateLocalStorage } from "../hooks/localStorageHooks";

const middleware = [thunk];

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

let Plays = localStorage.getItem("plays");
let TileCount = localStorage.getItem("tiles");
let Players = localStorage.getItem("players");
let GameInfo = localStorage.getItem("gameInfo");
let gameMessages = localStorage.getItem("messages");

if (!Plays) {
  localStorage.setItem("plays", JSON.stringify({ current: [], lockedIn: [] }));
}
if (!TileCount) {
  localStorage.setItem(
    "tiles",
    JSON.stringify({ tileBag: {}, tilesUsed: {}, exchangeCache: [] })
  );
}
if (!Players) {
  localStorage.setItem(
    "players",
    JSON.stringify({
      player: {
        username: "",
        tiles: [],
        score: 0,
        wordsPlayed: [],
        highestWordScore: {
          word: "",
          score: 0,
          multiplier: "",
        },
      },
      ai: {
        level: "",
        tiles: [],
        score: 0,
        wordsPlayed: [],
        highestWordScore: {
          word: "",
          score: 0,
          multiplier: "",
        },
      },
    })
  );
}
if (!GameInfo) {
  localStorage.setItem(
    "gameInfo",
    JSON.stringify({
      gameId: null,
      playerActive: true,
      playCount: 1,
      isGameLoaded: false,
      skipTurnCount: 0,
      gameResult: "",
    })
  );
}

if (!gameMessages) {
  localStorage.setItem(
    "messages",
    JSON.stringify({
      gameFeedMessages: [],
      aiMessages: [],
    })
  );
}

store.subscribe(() => {
  let localPlays = localStorage.getItem("plays");
  let localTileCount = localStorage.getItem("tiles");
  let localPlayers = localStorage.getItem("players");
  let localGameInfo = localStorage.getItem("gameInfo");
  let localMessages = localStorage.getItem("messages");

  const state = store.getState();

  let parsedBag = JSON.parse(localTileCount);
  let parsedPlayers = JSON.parse(localPlayers);
  let parsedPlays = JSON.parse(localPlays);
  let parsedGameInfo = JSON.parse(localGameInfo);
  let parsedMessages = JSON.parse(localMessages);

  if (updateMiddleware(state.tiles, parsedBag, "bag")) {
    useUpdateLocalStorage(state.tiles, parsedBag, "tiles");
  }
  if (updateMiddleware(state.player, parsedPlayers.player, "player")) {
    messagingMiddleware({player: state.player, ai: state.ai}, {player:parsedPlayers.player, ai: parsedPlayers.ai}, "player")
    useUpdateLocalStorage(state.player, parsedPlayers.player, "player");
  }
  if (updateMiddleware(state.ai, parsedPlayers.ai, "ai")) {
    messagingMiddleware({player: state.player, ai: state.ai, game : state.game}, {player:parsedPlayers.player, ai: parsedPlayers.ai, game: state.game}, "ai")
    useUpdateLocalStorage(state.ai, parsedPlayers.ai, "ai");
  }

  if (
    updateMiddleware(
      { current: state.plays.current, lockedIn: state.plays.lockedIn },
      parsedPlays,
      "plays"
    )
  ) {
    useUpdateLocalStorage(
      { current: state.plays.current, lockedIn: state.plays.lockedIn },
      parsedPlays,
      "plays"
    );
  }

  if (updateMiddleware(state.game, parsedGameInfo, "gameInfo")) {
    messagingMiddleware(state.game, parsedGameInfo, "gameInfo")
    useUpdateLocalStorage(state.game, parsedGameInfo, "gameInfo");
  }

  if(updateMiddleware(state.messages, parsedMessages, "messages")){
    useUpdateLocalStorage(state.messages, parsedMessages, "messages")
  }
  
});

export default store;
