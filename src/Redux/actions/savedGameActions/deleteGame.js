import API from "../../../utils/API";
import { DELETE_GAME_SUCCESS, SERVER_ERROR } from "../types/types";

export const deleteGameAction = (gameId, token) => async (dispatch) => {
  try {
    await API.deleteActiveGame(gameId, token);
    await dispatch({
      type: DELETE_GAME_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    if (error.response.status !== 500) {
      await dispatch({
        type: SERVER_ERROR,
        payload: {
          type: "Server/Network Error",
          message: error.response.data.msg,
          display: true,
          status: error.response.status,
        },
      });
      return;
    }
    await dispatch({
      type: SERVER_ERROR,
      payload: {
        type: "Server/Network Error",
        message: "There was an error with the network",
        status: error.response.status,
        display: false,
      },
    });
  }
};
