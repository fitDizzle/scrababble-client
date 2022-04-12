import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaGamepad } from "react-icons/fa";
import {
  saveActiveGameAction,
  updateActiveGameAction,
} from "../../../Redux/actions/gameplayActions/saveGameActions";
import { initialSetupAction } from "../../../Redux/actions/gameplayActions/initialSetup";
import GameInfoModal from "../info/gameInfoModal";

export const GameNavItem = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const { username } = useSelector((state) => state.auth.user);
  const { level: aiLevel } = useSelector((state) => state.ai);

  const Save_Active_Game = async () => {
    if (state.game.gameId) {
      dispatch(
        updateActiveGameAction(state, JSON.parse(localStorage.getItem("token")))
      );
      return;
    }
    dispatch(
      saveActiveGameAction(state, JSON.parse(localStorage.getItem("token")))
    );
  };

  const submitAndPlay = async () => {
    let infoToPass = {
      aiLevel,
      username,
    };

    dispatch(initialSetupAction(infoToPass, history));

    return await history.push("/scrababble");
  };

  return (
    <ContentContainer>
      <DropButton>
        <FaGamepad size={40} />
      </DropButton>
      <Content>
        <button onClick={() => history.push("/scrababble")}>Go To Game</button>
        <button onClick={(e) => Save_Active_Game(e)}>Save Game</button>
        <button
          onClick={async () =>
            submitAndPlay && (await history.push("/dashboard"))
          }
        >
          Quit Game
        </button>
        <button onClick={submitAndPlay}>New Game</button>
        <GameInfoModal />
      </Content>
    </ContentContainer>
  );
};

const DropButton = styled.button`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;

  a {
    text-decoration: none;
    color: black;
  }

  :hover {
    font-style: oblique;
    font-weight: 900;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  display: inline-block;
  :hover button {
    display: block;
  }
  :hover div {
    display: block;
  }
`;

const Content = styled.div`
  display: none;
  position: absolute;
  background-color: transparent;
  width: 160px;
  border-radius: 5px;
  margin-left: -15px;
  z-index: 1;

  button {
    width: 160px;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    border: 2px solid #ccc;
    background-color: #eee;
    margin-top: 2px;
    z-index: 3;
  }

  button:hover {
    border: 2px solid #ccc;
    background-color: #ddd;
    border-radius: 5px;
    z-index: 3;
  }
`;

export default GameNavItem;
