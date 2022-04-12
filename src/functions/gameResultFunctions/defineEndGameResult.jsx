// export const defineEndGameResult = (...args) => {
//     if(state.game.skipTurnCount === 4 && state.player.score > state.ai.score){
//         dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerWins'})
//        } else if(state.game.skipTurnCount === 4 && state.ai.score > state.player.score){
//          dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerLoses'})
//        } else if(state.game.skipTurnCount === 4 && state.ai.score === state.player.score){
//           dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerTie'})
//        } else if(state.game.skipTurnCount === 2 && bagCount === 0){
//          if(state.ai.score > state.player.score) {
//             dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerLoses'})
//          } else if (state.ai.score === state.player.score) {
//            dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerTie'})
//          } else if(state.ai.score < state.player.score) {
//            dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerWins'})
//          }
//        } else if(bagCount === 0 && player.tiles.map((x) => x.tile).length === 0){
//          if(state.ai.score > state.player.score) {
//            dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerLoses'})
//         } else if (state.ai.score === state.player.score) {
//           dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerTie'})
//         } else if(state.ai.score < state.player.score) {
//           dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerWins'})
//         }
//        }
// }