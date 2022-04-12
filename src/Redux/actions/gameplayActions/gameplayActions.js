import API from "../../../utils/API";

import {
  PLAYER_VALID_PLAY_SUCCESS,
  PLAYER_UPDATE_CURRENT_PLAY,
  PLAYER_CLEAR_CURRENT_PLAYS,
  PLAYER_SKIP_TURN,
  SERVER_ERROR,
  APP_ERROR_SHOW,
  APP_ERROR_HIDE
} from "../types/types";

import { useDrawAfterPlay } from "../../../hooks/drawHooks";

export const validatePlayAction = (
  tilesUsed,
  allTilesState,
  words,
  playerState
) => async (dispatch) => {
  try {
    let result = await API.validateWord(words);
    const { wordsAndValues, msg } = result.data;
    const { score, wordsPlayed, highestWordScore, tiles } = playerState;

      let scoreToAdd = wordsAndValues
        .map((obj) => obj.baseValue)
        .reduce((a, b) => a + b, 0);

      let drawResult = await useDrawAfterPlay(
        tilesUsed,
        tiles,
        allTilesState,
        false
      );

      await dispatch({
        type: PLAYER_VALID_PLAY_SUCCESS,
        payload: {
          score: score + scoreToAdd,
          wordsPlayed: [
            ...wordsPlayed,
            ...wordsAndValues.map((obj) => obj.word),
          ],
          newTiles: drawResult.newTiles,
          updatedTiles: drawResult.updatedTiles,
          usedTiles: drawResult.usedTiles,
          highestWordScore:
            scoreToAdd > highestWordScore.score
              ? {
                  score: scoreToAdd,
                  word: wordsAndValues[0].word,
                  multiplier: wordsAndValues[0].multipliers,
                }
              : {
                  ...highestWordScore,
                },
          movesToLock: tilesUsed.map((letter) => ({
            ...letter,
            tileState: "locked",
          })),
        },
      });
   
    
  } catch (error) {
    console.log(error);
    if(error.response && error.response.status == 400){
     await dispatch({
        type: APP_ERROR_SHOW,
        payload: {
          display: true,
          type: "Play Error",
          msg: error.response.data.msg
        }
      })
      return;
    }
    if (error.message == "Network Error") {
      await dispatch({
        type: SERVER_ERROR,
        payload: {
          message: "There was an error with the network",
          type: "Server/Network Error",
        },
      });
      return;
    }
  }
};

export const updateCurrentPlayAction = (
  play,
  prevState,
  type,
  playersTiles,
  isAI
) => async (dispatch) => {
  try {
    let newTiles = [...playersTiles];
    let updatedCurrentPlays = [...prevState];

    if (type == "add") {
      let found = prevState.filter((statePlay) => statePlay.id == play.id);

      updatedCurrentPlays =
        found.length > 0
          ? [...prevState.filter((prevPlay) => prevPlay.id !== play.id), play]
          : [...prevState, play];

      if (found.length === 0) {
        newTiles.splice(newTiles.map((tile) => tile.id).indexOf(play.id), 1);
      }
    } else {
      if (playersTiles.filter((tile) => tile.id === play.id).length > 0) {
        let toSlide =
          play.difference < 0
            ? parseInt((play.difference * -1) / 55)
            : parseInt(play.difference / 55);

        let index = 0;
        playersTiles.forEach((tile, i) => {
          if (tile.id === play.id) {
            index = i;
          }
        });
        let modTiles = [...playersTiles];

        let slicedOff =
          play.difference < 0
            ? modTiles.splice(index + toSlide + 1, modTiles.length)
            : modTiles.splice(index - toSlide, modTiles.length);

        let removed =
          play.difference < 0
            ? modTiles.filter((tile) => tile.id !== play.id)
            : slicedOff.filter((tile) => tile.id !== play.id);
        play.difference < 0
          ? removed.push({
              tile: play.tile,
              id: play.id,
              value: play.value,
            })
          : modTiles.push({
              tile: play.tile,
              id: play.id,
              value: play.value,
            });

        newTiles =
          play.difference < 0
            ? [...removed, ...slicedOff]
            : [...modTiles, ...removed];
      } else {
        updatedCurrentPlays = prevState.filter(
          (prevPlay) => prevPlay.id !== play.id
        );

        newTiles = [
          ...playersTiles,
          {
            tile: play.id.includes("BLNK") ? "blank" : play.tile,
            id: play.id,
            value: play.value,
          },
        ];
      }
    }

    await dispatch({
      type: PLAYER_UPDATE_CURRENT_PLAY,
      payload: {
        newTiles,
        current: updatedCurrentPlays,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        display: false,
        msg: error.message,
        type: "Play Error"
      }
    })
  }
};

export const clearCurrentPlaysAction = (currentPlays, playersTiles) => async (
  dispatch
) => {
  try {
    let newTiles = [...playersTiles];
    await currentPlays.forEach((play) => {
      newTiles.push({
        tile: play.id.includes("BLNK") ? "blank" : play.tile,
        id: play.id,
        value: play.value,
      });
    });
    await dispatch({
      type: PLAYER_CLEAR_CURRENT_PLAYS,
      payload: {
        newTiles,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        display: false,
        msg: error.message,
        type: "Play Error"
      }
    })
  }
};

export const cycleTurnAction = (playerStatus) => async (dispatch) => {
  try {
    await dispatch({
      type: PLAYER_SKIP_TURN,
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        display: false,
        msg: error.message,
        type: "Play Error"
      }
    })
  }
};
