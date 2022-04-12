import React from "react";
import styled from "styled-components";

export const PlayerControlsContainer = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  padding: 5px;
`;

export const PlayerControlButton = styled.button`
  height: 20px;
  border: none;
  background-color: #34b3f7;
  margin-left: 2px;
  font-size: 10px;
  font-weight: 500;

  :hover {
    background-color: #159fe9;
  }
`;

export const Controls = (props) => {
  return <PlayerControlsContainer active={props.active}>{props.children}</PlayerControlsContainer>;
};

export default (PlayerControlsContainer, PlayerControlButton, Controls);
