import {
  AI_MAKE_PLAY,
  AI_RE_DRAW,
  AI_PLAY_SINGLE_TILE,
  APP_ERROR_HIDE,
} from "../types/types";

import { useDrawAfterPlay, useReDraw } from "../../../hooks/drawHooks";

export const aiDrawAction = (stateAi, tilesState) => async (dispatch) => {
  try {
    let toExchange = stateAi.tiles.filter(
      (tile) => tile.value <= 4 && !tile.id.includes("BLNK")
    );

    let result = await useReDraw(
      toExchange,
      tilesState,
      stateAi.tiles.filter(
        (tile) => tile.value > 4 && tile.id.includes("BLNK")
      ),
      true
    );

    await dispatch({
      type: AI_RE_DRAW,
      payload: {
        updatedTiles: result.updatedBag,
        usedTiles: result.updatedUsedTiles,
        playerTiles: result.playersTiles,
      },
    });
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "AI Play",
        display: false
      }
    })
  }
};

export const aiPlayTileAction = (
  playObject,
  stateAi,
  tilesState,
  originalTiles
) => async (dispatch) => {
  try {
    const { total, newMoves, multipliers, additionalWords, word } = playObject;

    let newTilesState = [...originalTiles].filter((tile) => {
      return newMoves.filter((move) => move.id == tile.id).length == 0;
    });

    let drawResult = await useDrawAfterPlay(
      newMoves,
      newTilesState,
      tilesState,
      true
    );

    let modTiles = [...stateAi.tiles];
    let index = 0;
    const playSingleTile = async () => {
      if (index == newMoves.length - 1) {
        await dispatch({
          type: AI_MAKE_PLAY,
          payload: {
            score: stateAi.score + total,
            wordsPlayed: additionalWords
              ? [...stateAi.wordsPlayed, ...additionalWords, word]
              : [...stateAi.wordsPlayed, word],
            newTiles: drawResult.newTiles,
            updatedTiles: drawResult.updatedTiles,
            usedTiles: drawResult.usedTiles,
            movesToLock: [
              {
                ...newMoves[index],
                tileState: "locked",
                isAI: true,
              },
            ],
            highestWordScore:
              total > stateAi.highestWordScore.score
                ? {
                    word: word,
                    score: total,
                    multiplier: multipliers,
                  }
                : {
                    ...stateAi.highestWordScore,
                  },
          },
        });
        return;
      }
      modTiles.splice(
        modTiles.map((tile) => tile.id).indexOf(newMoves[index].id),
        1
      );
      await dispatch({
        type: AI_PLAY_SINGLE_TILE,
        payload: {
          newTiles: modTiles,
          movesToLock: [
            {
              ...newMoves[index],
              tileState: "locked",
              isAI: true,
            },
          ],
        },
      });
      index += 1;
    };
    let intervalID = setInterval(playSingleTile, 1000);

    setTimeout(async () => {
      clearInterval(intervalID);
    }, newMoves.length * 1000);
  } catch (error) {
    console.log(error);
    await dispatch({
      type: APP_ERROR_HIDE,
      payload: {
        msg: error.message,
        type: "AI Play",
        display: false
      }
    })
  }
};
