import store from "../../../Redux/store";

export const GamePlayMessages = async (props) => {
  const state = store.getState();
  const player = state.auth.user.username;
  const playerScore = state.player.score;
  const aiScore = state.ai.score;
  const newWord = state.player.wordsPlayed.reverse()[0];
  const ai = state.ai.level;
  const newAiWord = state.ai.wordsPlayed.reverse()[0];
  const exchangeCache = state.tiles.exchangeCache;
  const error = state.error;

  const gameFeedMessages = {
    NEW_GAME_STARTED: {
      action: "NEW_GAME_STARTED",
      message: `Welcome ${player}, Have fun and Good Luck!`,
      type: "SUCCESS",
    },
    PLAYER_WORD_ATTEMPT_SUCCESS: {
      action: "PLAYER_WORD_ATTEMPT_SUCCESS",
      message: `Congrats! ${player} has spelled the word ${newWord}.`,
      type: "SUCCESS",
    },
    PLAYER_WORD_ATTEMPT_FAIL: {
      action: "PLAYER_WORD_ATTEMPT_FAIL",
      message: `${error.message}`,
      type: "ALERT",
    },
    AI_WORD_ATTEMPT_SUCCESS: {
      action: "AI_WORD_ATTEMPT_SUCCESS",
      message: `${ai} word spelled the word ${newAiWord}.`,
      type: "SUCCESS",
    },
    PLAYER_EXCHANGED_LETTERS: {
      action: "PLAYER_EXCHANGED_LETTERS",
      message: `${player} exchanged ${exchangeCache.length} letter${
        exchangeCache.length > 1 ? "s" : ""
      }`,
      type: "WARNING",
    },
    AI_EXCHANGED_LETTERS: {
      action: "AI_EXCHANGED_LETTERS",
      message: `${ai} exchanged ${exchangeCache.length} letter${
        exchangeCache.length > 1 ? "s" : ""
      }`,
      type: "WARNING",
    },
    PLAYER_SKIPPED_TURN: {
      action: "PLAYER_SKIPPED_TURN",
      message: `${player} has skipped their turn.`,
      type: "WARNING",
    },
    AI_SKIPPED_TURN: {
      action: "AI_SKIPPED_TURN",
      message: `${ai} has skipped their turn.`,
      type: "WARNING",
    },
    PLAYER_TAKES_LEAD: {
      action: "PLAYER_TAKES_LEAD",
      message: `${player} has taken the lead with ${playerScore} points!`,
      type: "SUCCESS",
    },
    AI_TAKES_LEAD: {
      action: "AI_TAKES_LEAD",
      message: `${ai} has taken the lead with ${aiScore} points!`,
      type: "SUCCESS",
    },
    WORD_CHALLENGED: {
      action: "WORD_CHALLENGED",
      message: "Your Word has been challenged",
      type: "SUCCESS",
    },
    WORD_CHALLENGED_SUCCESS: {
      action: "WORD_CHALLENGED_SUCCESS",
      message: "Wooh,hoo! You're word exists!",
      type: "SUCCESS",
    },
    WORD_CHALLENGED_FAILED: {
      action: "WORD_CHALLENGED_FAILED",
      message: "You're word is not a word!",
      type: "SUCCESS",
    },
    PLAYER_WIN: {
      action: "WIN",
      message: "And the crowd goes wild!!!!!!!",
      type: "SUCCESS",
    },
    PLAYER_LOSS: {
      action: "LOSS",
      message: "Waahh, Wahhh, Wahhh!",
      type: "ALERT",
    },
    PLAYER_TIE: {
      action: "TIE_GAME",
      message: "What a game!",
      type: "SUCCESS",
    },
    NEW_HIGHEST_WORD: {
      action: "HIGHEST_WORD",
      message: "You word is the new highest point word!",
      type: "SUCCESS",
    },
    NEW_TOP_SCORE: {
      action: "TOP_SCORE",
      message: `${player}, you have a new top score!`,
      type: "SUCCESS",
    },
    QUIT_GAME_SUCCESS: {
      action: "QUIT_GAME",
      message: "Are you sure you want to quit?",
      type: "WARNING",
    },
    SAVE_GAME_SUCCESS: {
      action: "SAVE_GAME",
      message: "Would you like to save this game?",
      type: "SUCCESS",
    },
    INVALID_FIRST_PLAY: {
      action: "INVALID_FIRST_PLAY",
      message: "The first word must include the star block.",
      type: "ALERT",
    },
    INVALID_CURRENT_PLAY: {
      action: "INVALID_CURRENT_PLAY",
      message: "You must use the existing words on the board.",
      type: "ALERT",
    },
  };

  if (props) {
    const newMsg = await gameFeedMessages[props];
    return newMsg;
  } else return;
  
};

export default GamePlayMessages;
