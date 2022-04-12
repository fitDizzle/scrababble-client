import React, { useEffect, useState } from "react";
import { Controls } from "../style/playerControls";
import { useDispatch, useSelector } from "react-redux";

import { FaFastBackward, FaFastForward, FaPlay } from "react-icons/fa";

import {
  clearCurrentPlaysAction,
  cycleTurnAction,
} from "../../../Redux/actions/gameplayActions/gameplayActions";
import { validatePlayAction } from "../../../Redux/actions/gameplayActions/gameplayActions";
import {
  playerDrawFromBagAction,
  clearBagCacheAction,
} from "../../../Redux/actions/gameplayActions/drawActions";
import { useBuildWordArray } from "../../../hooks/buildWords";
import { useCheckPlay } from "../../../hooks/checkPlay";
import { getUserMessageAction } from "../../../Redux/actions/messageActions/gameMessagesActions";

export const PlayerControls = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { player } = useSelector((state) => state);
  const { ai } = useSelector((state) => state);
  const { tiles } = useSelector((state) => state);
  const { current } = useSelector((state) => state.plays);
  const { plays } = useSelector((state) => state);
  const { tileBag } = useSelector((state) => state.tiles);

  const bagCount = tileBag && tileBag.length
    ? Object.values(tileBag).reduce((counts, count) => counts + count)
    : 0;

  const currentTiles = state.player.tiles;

  const [currentMoves, setCurrentMoves] = useState([]);

  useEffect(() => {
    setCurrentMoves(state.plays.current);
  }, [state.plays]);

  const Read_Build_Words = async (allMoves, wordsPlayed) => {
    return await useBuildWordArray(allMoves, wordsPlayed);
  };

  const Check_Play = async () => {
    return await useCheckPlay(plays);
  };

  const lockInPlay = async () => {
    let allowPlay = await Check_Play();
    if (!allowPlay) {
      try {
        if (state.plays.lockedIn.length === 0) {
          dispatch(getUserMessageAction("INVALID_FIRST_PLAY"));
        } else {
          dispatch(getUserMessageAction("INVALID_CURRENT_PLAY"));
        }
        dispatch(clearCurrentPlaysAction(current, player.tiles));
      } catch (error) {
        console.log("ERROR IN PLAYER CONTROLS LOCK IN PLAY.");
      }
      if (plays.current.length > 0) {
        return dispatch(clearCurrentPlaysAction(current, player.tiles));
      }
    }

    let words = await Read_Build_Words(
      [...plays.current, ...plays.lockedIn],
      [...state.player.wordsPlayed, ...state.ai.wordsPlayed]
    );

    await dispatch(
      validatePlayAction(
        currentMoves,
        tiles,
        words,
        player
      )
    );
  };

  const ExchangeLetters = async (
    tilesToReplace,
    allTilesState,
    playerTilesState
  ) => {
    await dispatch(
      playerDrawFromBagAction(tilesToReplace, allTilesState, playerTilesState)
    );
  };

  const handleClick = async (e, type) => {
    if (plays.isPlayerActive === true) {
      if (type === "submit-action") {
        if (current && current.length > 0) {
          await lockInPlay();
          if (state.error.type !== null && state.error.type === "Gameplay") {
            await dispatch(clearCurrentPlaysAction(current, player.tiles));
            await dispatch(getUserMessageAction("PLAYER_WORD_ATTEMPT_FAIL"));
            await dispatch({ type: "CLEAR_ERROR" });
          } else {
            dispatch({ type: "RESET_SKIP_TURN_COUNT" });
          }
        } else if (Array.isArray(state.tiles.exchangeCache)) {
          dispatch(getUserMessageAction("PLAYER_EXCHANGED_LETTERS"));
          await ExchangeLetters(exchangeCache, state.tiles, player.tiles);
        }
      } else if (type === "clear-action") {
        if (current.length > 0) {
          dispatch(clearCurrentPlaysAction(current, player.tiles));
        } else if (Array.isArray(state.tiles.exchangeCache)) {
          await clearCache();
        }
      } else if (type === "skip-turn") {
        let isActive = plays.isPlayerActive;
        dispatch(getUserMessageAction("PLAYER_SKIPPED_TURN"));
        dispatch({ type: "INCREMENT_SKIP_TURN_COUNT" });
        if (current && current.length > 0) {
          dispatch(clearCurrentPlaysAction(current, player.tiles));
        }
        if (Array.isArray(state.tiles.exchangeCache)) {
          await clearCache();
        }
        await dispatch(cycleTurnAction(isActive));
      }

      // dispatch({type: "UPDATE_GAME_RESULT", payload: 'playerWins'})
      if (
        state.game.skipTurnCount === 4 &&
        state.player.score > state.ai.score
      ) {
        dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerWins" });
      } else if (
        state.game.skipTurnCount === 4 &&
        state.ai.score > state.player.score
      ) {
        dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerLoses" });
      } else if (
        state.game.skipTurnCount === 4 &&
        state.ai.score === state.player.score
      ) {
        dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerTie" });
      } else if (state.game.skipTurnCount === 2 && bagCount === 0) {
        if (state.ai.score > state.player.score) {
          dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerLoses" });
        } else if (state.ai.score === state.player.score) {
          dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerTie" });
        } else if (state.ai.score < state.player.score) {
          dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerWins" });
        }
        // eslint-disable-next-line no-mixed-operators
      } else if (
        (bagCount === 2 &&
          player.tiles.length < 4 &&
          state.game.skipTurnCount === 2) ||
        (bagCount === 0 &&
          ai.tiles.length === 0 &&
          state.game.skipTurnCount === 2)
      || state.plays.lockedIn.length === 98) {
        if (state.ai.score > state.player.score) {
          dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerLoses" });
        } else if (state.ai.score === state.player.score) {
          dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerTie" });
        } else if (state.ai.score < state.player.score) {
          dispatch({ type: "UPDATE_GAME_RESULT", payload: "playerWins" });
        }
      }
    } else {
      return;
    }
  };

  const playerTiles = state.player.tiles;
  let [exchangeCache, updateExchangeCache] = useState([]);

  useEffect(() => {
    const update = async () => {
      updateExchangeCache(state.tiles.exchangeCache);
    };
    update();
  }, [state.tiles.exchangeCache]);

  const clearCache = async () => {
    await dispatch(clearBagCacheAction(exchangeCache, playerTiles));
  };

  return (
    <Controls active={plays.isPlayerActive}>
      <FaFastBackward
        color={"smoke"}
        size={35}
        onClick={(e) => handleClick(e, "clear-action")}
      />
      <FaPlay
        size={30}
        color={"smoke"}
        onClick={(e) => handleClick(e, "submit-action")}
      />

      <FaFastForward
        color={"smoke"}
        size={35}
        onClick={(e) => handleClick(e, "skip-turn")}
      />
    </Controls>
  );
};

export default PlayerControls;
