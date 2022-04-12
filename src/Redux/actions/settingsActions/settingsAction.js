import settingsAPI from "../../../utils/settingsAPI";

import {
  GET_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  RESET_SETTINGS_SUCCESS,
  SERVER_ERROR,
} from "../types/types";

export const getSettingsAction = (body) => async (dispatch) => {
  try {
    let token = JSON.parse(localStorage.getItem("token"));

    let result = await settingsAPI.getSettings(body, token);
    const { settings, msg } = result.data;

    await dispatch({
      type: GET_SETTINGS_SUCCESS,
      payload: {
        ...settings,
        msg,
      },
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

export const updateSettingsAction = (body) => async (dispatch) => {
  try {
    let token = JSON.parse(localStorage.getItem("token"));
    let result = await settingsAPI.updateSettings(body, token);
    const { msg } = result.data;

    await dispatch({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: {
        name: body.name,
        msg,
      },
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

export const resetSettingsAction = (username) => async (dispatch) => {
  try {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(username, token, 'TOKEN')
    let result = await settingsAPI.resetSettings(username,token);
    const { settings, msg } = result.data;

    await dispatch({
      type: RESET_SETTINGS_SUCCESS,
      payload: {
        ...settings,
        msg,
      },
    });
  } catch (error) {
    if (error.response.status !== 500) {
      console.log(error);
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
