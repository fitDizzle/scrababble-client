import { INITIAL_GAME_SETUP, APP_ERROR_HIDE } from "../types/types"

import { useInitialDraw } from "../../../hooks/drawHooks";


export const initialSetupAction = (info, history) => async (dispatch) => {
  try {
    const { level, username } = info;
    const result = await useInitialDraw(info);

    await dispatch({
      type: INITIAL_GAME_SETUP,
      payload: {
        level,
        aiTiles: result.aiTiles,
        username,
        playerTiles: result.playerTiles,
        usedTiles: result.usedTiles,
        updatedTiles: result.updatedTiles
      }
    })
   
    history.push("/scrababble");
    
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        type: "Game Setup Error",
        msg: error.message,
        display: false
      }
    })
  }
};
