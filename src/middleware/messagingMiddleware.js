import { useGetMessages } from "../hooks/messagingHooks/messageHooks"; 

/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state, prevState, type) {
  let types = [];

  if(type === "gameInfo"){
    const {gameId, playerActive, isGameLoaded, playCount, gameResult} = state;
    const { gameId: prevGameId, playerActive: prevPlayerActive, isGameLoaded: prevIsGameLoaded, playCount: prevPlayCount, gameResult: prevGameResult } = prevState;

    if(gameId === null && !prevIsGameLoaded && isGameLoaded){
      types.push("NEW_GAME_STARTED");
    } else if(gameId && !prevIsGameLoaded && isGameLoaded){
      types.push("SAVED_GAME_LOADED");
    }

    if(gameResult !== prevGameResult && gameResult === 'playerWins'){
      types.push("PLAYER_WIN");
    }

    if(gameResult !== prevGameResult && gameResult === 'playerLoses'){
      types.push("PLAYER_LOSS");
    }

    if(gameResult !== prevGameResult && gameResult === 'tieGame'){
      types.push("TIE_GAME");
    }
  }

  if(type === "plays"){
    const { lockedIn, current, isPlayerActive } = state;
    const { lockedIn: prevLockedIn, current: prevCurrent, isPlayerActive: prevIsPlayerActive} = prevState;

    if(lockedIn === prevLockedIn && current === prevCurrent && isPlayerActive !== prevIsPlayerActive && isPlayerActive === true){
      types.push("AI_SKIPPED_TURN")
    }
  }

  if(type === "player"){
    const { score: playerScore, wordsPlayed: playerWordsPlayed, highestWordScore: playerHighestWordScore } = state.player;
    const { score: playerPrevScore, wordsPlayed: playerPrevWordsPlayed, highestWordScore: playerPrevHighestWordScore } = prevState.player;

    const { score: aiScore, wordsPlayed: aiWordsPlayed, highestWordScore: aiHighestWordScore } = state.ai;
    const { score: aiPrevScore, wordsPlayed: aiPrevWordsPlayed, highestWordScore: aiPrevHighestWordScore } = prevState.ai;

    if(playerWordsPlayed.length > playerPrevWordsPlayed.length){
      types.push("PLAYER_WORD_ATTEMPT_SUCCESS");
    }

    if(playerScore > playerPrevScore && playerScore > aiScore && playerPrevScore < aiScore){
      types.push("PLAYER_TAKES_LEAD");
    }

  }

  if(type === "ai"){
    const { score: playerScore, wordsPlayed: playerWordsPlayed, highestWordScore: playerHighestWordScore } = state.player;
    const { score: playerPrevScore, wordsPlayed: playerPrevWordsPlayed, highestWordScore: playerPrevHighestWordScore } = prevState.player;

    const { score: aiScore, wordsPlayed: aiWordsPlayed, highestWordScore: aiHighestWordScore, tiles: aiTiles } = state.ai;
    const { score: aiPrevScore, wordsPlayed: aiPrevWordsPlayed, highestWordScore: aiPrevHighestWordScore, tiles: prevAiTiles } = prevState.ai;

    const { playerActive } = state.game;
    const { playerActive: prevPlayerActive } = prevState.game;

    
    if(aiWordsPlayed.length > aiPrevWordsPlayed.length){
      types.push("AI_WORD_ATTEMPT_SUCCESS");
    }

    if(aiScore > aiPrevScore && aiScore > playerScore && aiPrevScore < playerScore){
      types.push("AI_TAKES_LEAD");
    }
    
    if(aiScore === aiPrevScore && aiWordsPlayed === aiPrevWordsPlayed){
      let currTiles = Object.values(aiTiles).map((t) => t.tile).sort();
      let prevTiles = Object.values(prevAiTiles).map((t) => t.tile).sort();
      
      if(currTiles === prevTiles){
        types.push("AI_SKIPPED_TURN");
      }
    }

    if(aiScore === aiPrevScore && aiWordsPlayed.join("") === aiPrevWordsPlayed.join("")){
      let currTiles = Object.values(aiTiles).map((t) => t.tile).sort().join("");
      let prevTiles = Object.values(prevAiTiles).map((t) => t.tile).sort().join("");

      if(currTiles !== prevTiles && aiScore === aiPrevScore && playerActive === true && playerActive !== prevPlayerActive){
        types.push("AI_EXCHANGED_LETTERS");
      }
    }
  }

  if(types.length > 0) console.log(types, 'Game Play Message Types in Messaging MiddleWare Line 96');
  return types.forEach(type => useGetMessages(type));
}