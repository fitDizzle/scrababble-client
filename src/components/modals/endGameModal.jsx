import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "../CustomComponents/Modal";
import styled from "styled-components";

import { initialSetupAction } from "../../Redux/actions/gameplayActions/initialSetup";

const EndGameModalContainer = styled.h1`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15rem;
  margin-top: -37rem;
  margin-left: 5rem;
  padding: 32px;
`;

const EndGameHeader = styled.h1`
  color: #303034;
`;

const EndGameButtonContainer = styled.div`
  width: 100%;
  height: 15rem;
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

const EndGameModal = () => {
  const infoModalRef = useRef();
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

    await infoModalRef.current.closeModal()

    return await history.push("/scrababble");
  };

  const renderModal = () => {
    if (gameResult === "playerLoses") {
      return infoModalRef.current.openModal();
    }
  };

  return (
    <div>
      {renderModal()}
      <Modal ref={infoModalRef}>
        <EndGameModalContainer>
          <EndGameHeader>
            {`Sorry ${username}, You've lost.`}
            <EndGameButtonContainer>
              <EndGameButton onClick={submitAndPlay}>Play Again?</EndGameButton>
              <EndGameButton onClick={async () => await submitAndPlay && history.push('/dashboard')}>Quit?</EndGameButton>
            </EndGameButtonContainer>
          </EndGameHeader>
        </EndGameModalContainer>
      </Modal>
    </div>
  );
};

export default EndGameModal;
