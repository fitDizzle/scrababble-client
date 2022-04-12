import useGetMessages from "../../../hooks/messagingHooks/messageHooks";

import { 
  UPDATE_MESSAGES,
  APP_ERROR_HIDE
 } from "../types/types"

export const getUserMessageAction = (type) => async (dispatch) => {
  let messages = useGetMessages(type);
  try {
    await dispatch({
      type: UPDATE_MESSAGES,
      payload: {
       ...messages
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "Message Error",
        display: false
      }
    })
  }
};



