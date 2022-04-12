
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  SERVER_ERROR,
} from "../types/types"

import authAPI from "../../../utils/authAPI";

export const loginAction = (body, history) => async (dispatch) => {
  try {
    let result = await authAPI.login(body);
    const { user, token } = result.data;

    localStorage.setItem("token", JSON.stringify(token));
    history.push("/dashboard");

    await dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.response.status && error.response.status == 400) {
      await dispatch({
        type: AUTH_ERROR,
        payload: {
          type: "Authorization Error",
          status: error.response.status,
          message: error.response.data.msg,
          display: true,
        },
      });
    } else {
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
  }
};

export const registerAction = (body) => async (dispatch) => {
  try {
    let result = await authAPI.register(body);
    await dispatch({
      type: REGISTER_SUCCESS
    })
  } catch (error) {
    console.log(error);
    if (error.response.status && error.response.status == 400) {
      await dispatch({
        type: AUTH_ERROR,
        payload: {
          type: "Authorization Error",
          status: error.response.status,
          message: error.response.data.msg,
          display: true,
        },
      });
    } else {
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
  }
};
