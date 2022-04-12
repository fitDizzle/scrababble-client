import authAPI from "../../../utils/authAPI";

import { MAIN_POST_REFRESH, AUTH_POST_REFRESH, APP_ERROR_HIDE } from "../types/types";

export const mainRefreshAction = (tiles, players, plays, gameInfo) => async (
  dispatch
) => {
  try {

    let tilesToPass = tiles.state;
    let playersToPass = players.state;
    let playsToPass = plays.state;
    let gameInfoToPass = gameInfo.state;
    let exchangeCacheToPass = tiles.state.exchangeCache;

    if (
      Object.values(tiles.state.tileBag).join("") !==
      Object.values(tiles.local.tileBag).join("")
    ) {
      tilesToPass = {
        tilesUsed: tiles.local.tilesUsed,
        tileBag: tiles.local.tileBag,
      };
    }
    if (players.state.player.username === "") {
      playersToPass = {
        ...playersToPass,
        player: players.local.player,
      };
    }
    if (players.state.ai.level === "") {
      playersToPass = {
        ...playersToPass,
        ai: players.local.ai,
      };
    }

    if (plays.local.lockedIn.length > 0 || plays.local.current.length > 0) {
      playsToPass = {
        ...plays.local,
      };
    }

    if (
      Object.values(gameInfo.state).join("") !==
      Object.values(gameInfo.local).join("")
    ) {
      gameInfoToPass = {
        ...gameInfo.local,
      };
    }

    if (
      tiles.local.exchangeCache === "cleared" &&
      tiles.state.exchangeCache !== "cleared"
    ) {
      exchangeCacheToPass = tiles.local.exchangeCache;
    }
    if (
      tiles.local.exchangeCache === "cleared" &&
      tiles.state.exchangeCache === "cleared"
    ) {
      exchangeCacheToPass = "cleared";
    }

    if (
      tiles.local.exchangeCache !== "cleared" &&
      tiles.state.exchangeCache !== "cleared" &&
      tiles.state.exchangeCache.map((tile) => tile.tile).join("") !==
        tiles.local.exchangeCache.map((tile) => tile.tile).join("")
    ) {
      exchangeCacheToPass = tiles.local.exchangeCache;
    }
    await dispatch({
      type: MAIN_POST_REFRESH,
      payload: {
        tiles: tilesToPass,
        player: playersToPass.player,
        ai: playersToPass.ai,
        plays: playsToPass,
        gameInfo: gameInfoToPass,
        cache: exchangeCacheToPass
      }
    })

  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "Refresh Error",
        display: false
      }
    })
  }
};


export const authRefreshAction = (token) => async (dispatch) => {
  try {
    let result = await authAPI.getUser(token);
    dispatch({
      type: AUTH_POST_REFRESH,
      payload: {
        user: result.data.user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "Refresh Error",
        display: false
      }
    })
  }
};
