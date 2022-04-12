import wordSearchAPI from "../../../utils/wordSearchAPI";

import {
  GET_ALL_WORDS_SUCCESS,
  GET_RELATIVE_WORDS_SUCCESS,
  CLEAR_SEARCH_SUCCESS,
  SERVER_ERROR,
  APP_ERROR_HIDE,
} from "../types/types";

export const getRelativeWordsAction = (letters) => async (dispatch) => {
  let result = await wordSearchAPI.getRelativeWords(letters);
  let words = result.data;
  try {
    await dispatch({
      type: GET_RELATIVE_WORDS_SUCCESS,
      payload: {
        ...words,
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

export const getAllWordsAction = (letters) => async (dispatch) => {
  try {
    let result = await wordSearchAPI.getAllWords(letters);
    let words = result.data;
    await dispatch({
      type: GET_ALL_WORDS_SUCCESS,
      payload: {
        ...words,
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

export const clearSearchAction = () => async (dispatch) => {
  let words = [];
  try {
    await dispatch({
      type: CLEAR_SEARCH_SUCCESS,
      payload: {
        ...words,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        display: false,
        msg: error.message,
        type: "Search Error",
      },
    });
  }
};
