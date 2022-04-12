import React from "react";
import styled, { keyframes } from "styled-components";
import PlayerControls from "../player/playerControls";

export const PlayerAvatar = (props) => {
  const Avatar = styled.div`
  height: 100px;
    p {
      background-color: ${(props) =>
        props.active === true ? "rgb(0, 255, 0)" : "lightBlue"};
    }
    h5 {
      color: #313131;
    }
  `;

const animatedActionChange = keyframes`   
from { 
  box-shadow: 0px 0px 0px 0px rgb(0, 255, 0);
}

50% { 
  box-shadow: 0px 0px 0px 5px rgb(0, 255, 0);
}
to { 
  box-shadow: 0px 0px 0px 0px rgb(0, 255, 0);
  }
  `;

  const StyledAvatarImage = styled.img`
    animation:  ${(props) => props.active === true ? animatedActionChange : ''} 0.15s 2;
  `;

  const StyledControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  `; 

  return (
    <Avatar active={props.active} onClick={props.onClick}>
      <StyledAvatarImage active={props.active} src={props.image} alt="Avatar" />
      <p>
        <span>{props.name}</span>
        <span style={{ fontSize: "12px" }}>Wins: {props.wins || 7}</span>
        <span style={{ fontSize: "12px" }}>Losses: {props.losses || 1}</span>
      </p>
      <StyledControlsContainer>
      <h5 className="player-level">{props.level}</h5>
      <PlayerControls />
      </StyledControlsContainer>
    </Avatar>
  );
};

export default PlayerAvatar;
