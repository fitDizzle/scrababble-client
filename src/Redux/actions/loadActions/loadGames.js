import API from "../../../utils/API"

import { LOAD_SAVED_GAME_SETUP, SERVER_ERROR } from "../types/types"

export const loadActiveGameAction = (gameId, history, token) => async (dispatch) => {
    try {

       let result = await API.loadActiveGame(gameId, token)
       console.log(result.data)
       const { ai, player, tiles, plays } = result.data.activeGame

        await dispatch({
            type: LOAD_SAVED_GAME_SETUP,
            payload: {
                ai,
                player,
                tiles,
                plays,
                gameInfo: {
                    gameId
                },
                cache: tiles.exchangeCache
            }
        })

       history.push("/scrababble")

    } catch (error) {
        console.log(error.response)
        if(error.response.status !== 500){
            await dispatch({
                type: SERVER_ERROR,
                payload: {
                    type: "Server/Network Error",
                    message: error.response.data.msg,
                    display: true,
                    status: error.response.status
                }
            })
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
}