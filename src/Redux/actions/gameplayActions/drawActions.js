import {
  ADD_BAG_EXCHANGE_CACHE,
  PLAYER_CLEAR_CACHE,
  PLAYER_DRAW_FROM_BAG,
  APP_ERROR_HIDE
} from "../types/types";

import { useReDraw } from "../../../hooks/drawHooks";

export const addToExchangeCacheAction = (
  tile,
  statePlayerTiles,
  currentCache,
  statePlaysCurrent
) => async (dispatch) => {
  try {
    let newTiles = [...statePlayerTiles];
    let newCurrentPlays = [...statePlaysCurrent];
    newTiles.map((tile) => tile.id).includes(tile.id)
      ? newTiles.splice(newTiles.map((tile) => tile.id).indexOf(tile.id), 1)
      : newCurrentPlays.splice(
          newCurrentPlays.map((play) => play.id).indexOf(tile.id),
          1
        );

    const { tile: letter, id, value } = tile;
    let cache;
    currentCache === "cleared"
      ? (cache = [
          {
            tile: letter,
            id,
            value,
          },
        ])
      : (cache = [
          ...currentCache,
          {
            tile: letter,
            id,
            value,
          },
        ]);

    await dispatch({
      type: ADD_BAG_EXCHANGE_CACHE,
      payload: {
        cache,
        current: newCurrentPlays,
        newTiles,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "Tile/Draw Error",
        display: false
      }
    })
  }
};

export const playerDrawFromBagAction = (
  tilesToReplace,
  allTilesState,
  playerTilesState
) => async (dispatch) => {
  try {
    let drawResult = await useReDraw(
      tilesToReplace,
      allTilesState,
      playerTilesState
    );

    await dispatch({
      type: PLAYER_DRAW_FROM_BAG,
      payload: {
        updatedTiles: drawResult.updatedBag,
        usedTiles: drawResult.updatedUsedTiles,
        newTiles: drawResult.playersTiles,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "Tile/Draw Error",
        display: false
      }
    })
  }
};

export const clearBagCacheAction = (cache, statePlayerTiles) => async (
  dispatch
) => {
  try {
    let newTiles = [...statePlayerTiles, ...cache];
    await dispatch({
      type: PLAYER_CLEAR_CACHE,
      payload: {
        newTiles,
        cache: "cleared",
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "Tile/Draw Error",
        display: false
      }
    })
  }
};
