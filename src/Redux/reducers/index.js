import { combineReducers } from "redux"

import authReducer from "./auth"
import playerReducer from "./playerReducer"
import aiReducer from "./aiReducer"
import tileReducer from "./tileReducer"
import playsReducer from "./wordsPlayedReducer"
import errorReducer from "./errorReducer"
import gameInfoReducer from "./gameInfoReducer"
import settingsReducer from "./settingsReducer"
import wordSearchReducer from "./wordSearchReducer"
import messageReducer from "./messageReducer"
import themeReducer from "./themeReducer"


export default combineReducers({
    auth: authReducer,
    game: gameInfoReducer,
    player: playerReducer,
    ai: aiReducer,
    tiles: tileReducer,
    plays: playsReducer,
    error: errorReducer,
    settings: settingsReducer,
    wordSearch: wordSearchReducer,
    messages: messageReducer,
    theme: themeReducer,

})