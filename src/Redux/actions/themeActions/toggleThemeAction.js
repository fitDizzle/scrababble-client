import { UPDATE_THEME_SUCCESS, APP_ERROR_HIDE } from "../types/types"

export const toggleThemeAction = () => async (dispatch) => {
  try {
    await dispatch({
      type: UPDATE_THEME_SUCCESS,
    });
  } catch (error) {
    console.log(error)
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        type: "Theme Error",
        msg: error.message,
        display: false
      }
    })
  }
};

export default toggleThemeAction;
