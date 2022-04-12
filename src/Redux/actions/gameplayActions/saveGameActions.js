import API from "../../../utils/API";

import {
  SAVE_UPDATE_GAME_SUCCESS,
  SERVER_ERROR,
} from "../types/types";

export const saveActiveGameAction = (state, token) => async (dispatch) => {
  try {
    const { player, ai, tiles, plays } = state;

    await API.saveActiveGame(
      {
        player,
        ai,
        tiles,
        plays,
      },
      token
    );

    await dispatch({
      type: SAVE_UPDATE_GAME_SUCCESS,
    });
    
  } catch (error) {
    console.log(error);
    await dispatch({
      type: SERVER_ERROR,
      payload: {
        type: "Server/Network Error",
        message: error.response.data.msg,
        status: error.response.status,
        display: false,
      },
    });
  }
};

export const updateActiveGameAction = (state, token) => async (dispatch) => {
  try {
    const { player, ai, tiles, plays, game } = state;
    await API.updateActiveGame(
      {
        player,
        ai,
        tiles,
        plays,
      },
      game.gameId,
      token
    );

    await dispatch({
      type: SAVE_UPDATE_GAME_SUCCESS,
    });

  } catch (error) {
    console.log(error);
    await dispatch({
      type: SERVER_ERROR,
      payload: {
        type: "Server/Network Error",
        message: error.response.data.msg,
        status: error.response.status,
        display: false,
      },
    });
  }
};
