import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { initialSetupAction } from "../../Redux/actions/gameplayActions/initialSetup";

const WinGameModal = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameResult } = useSelector((state) => state.game);

  const { username } = useSelector((state) => state.auth.user);
  const { level: aiLevel } = useSelector((state) => state.ai);

  const submitAndPlay = async () => {
    let infoToPass = {
      aiLevel,
      username,
    };

    dispatch(initialSetupAction(infoToPass, history));

    return await history.push("/scrababble");
  };

  if (gameResult === "playerWins") {
    return ReactDOM.createPortal(
      <div>
        <EndGameModalContainer>
          <EndGameHeader>
            <h6>{`Congratulations ${username}, You've Won!`}</h6>
            <EndGameButtonContainer>
              <EndGameButton onClick={submitAndPlay}>Play Again?</EndGameButton>
              <EndGameButton
                onClick={async () =>
                  (await submitAndPlay) && history.push("/dashboard")
                }
              >
                Quit?
              </EndGameButton>
            </EndGameButtonContainer>
          </EndGameHeader>
        </EndGameModalContainer>
      </div>,
      document.getElementById("modal-root")
    );
  }
  return null;
});

const EndGameModalContainer = styled.h1`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15rem;
  margin-top: -37rem;
  margin-left: 16rem;
  padding: 32px;
  z-index: 11228;
  background-color: #f1f1f1;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding-bottom: 25px;

  h6 {
    margin: 0;
    padding-bottom: 45px;
  }
`;

const EndGameHeader = styled.h1`
  color: #303034;
`;

const EndGameButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

const EndGameButton = styled.button`
  color: #303034;
  border: none;
  background-color: #0091ff;
  font-size: 25px;
  padding: 16px;
  margin-left: 10px;
  width: 200px;
  :hover {
    background-color: #064576;
    animation-timing-function: 1s ease-in-out;
  }
`;

export default WinGameModal;
