import React from "react";
import styled, { keyframes } from "styled-components";
import AiMessage from "../../messages/ai/aiMessage";
import { HiChat } from "react-icons/hi";

import { useSelector } from "react-redux";

const AiAvatar = () => {
  const { AI } = useSelector((state) => state.ai);
  const { playerActive } = useSelector((state) => state.game);

  const AvatarHeaderContainer = styled.div`
    background-color: ${(props) =>
      props.active === false ? "rgb(0, 255, 0)" : "lightBlue"};
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
    animation: ${(props) => props.active === false ? animatedActionChange : ''} 0.15s 2;
  `;

  return (
    <div>
      <AvatarHeaderContainer active={playerActive}>
        <StyledAvatarImage active={playerActive} src="../../../images/avatar_g2.jpg" alt="Avatar" />
        <p>
        {/* <HiChat size={40} style={{marginLeft: '-23px', paddingRight: '15px'}} /> */}
          <span>Maven 2.0</span>
          <span style={{ fontSize: "15px" }}>Wins: 76</span>
          <span style={{ fontSize: "15px" }}>Losses: 0</span>
        </p>
      </AvatarHeaderContainer>
      <AiMessage />
    </div>
  );
};

export default AiAvatar;
