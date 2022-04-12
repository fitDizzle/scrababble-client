import React from "react";
import GameBoard from "../board/gameBoard";
import Letters from "../letters/player/letters";
import LetterContainer from "../letters/player/letterContainer";
import LetterContainerLip from "../letters/player/letterContainerLip";
import AILetters from "../letters/ai/ai_letters";
import AILetterContainer from "../letters/ai/ai_letterContainer";
import AILetterContainerLip from "../letters/ai/ai_letterContainerLip";
import SidePanel from "../sidePanel/sidePanel";
import AvatarContainer from "../players/avatarContainer";
import Player from "../players/player/player";
import AiAvatar from "../players/ai/aiAvatar";
import GamePlayMessage from "../messages/gameFeed/gamePlayMessage";

const Game = () => {
  return (
    <div id="main-container">
      <div id="player-section">
        <AvatarContainer>
          <AiAvatar />
          <div>
            <AILetterContainer>
              <AILetters />
              <AILetterContainerLip />
            </AILetterContainer>
          </div>
        </AvatarContainer>

        <div id="game-feed">
          <GamePlayMessage />
        </div>

        <AvatarContainer>
          <Player />
          <LetterContainer>
            <Letters />
            <LetterContainerLip />
          </LetterContainer>
        </AvatarContainer>
      </div>

      <GameBoard />

      <div id="side-panel">
        <SidePanel />
      </div>
    </div>
  );
};

export default Game;
