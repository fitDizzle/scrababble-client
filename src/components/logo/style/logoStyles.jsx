import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  position: absolute;
`;

const StyledLogoLettersContainer = styled.div`
  width: 20rem;
  height: 5rem;
  float: right;
  flex-direction: row;
  background-color: rgb(61, 22, 22);
  z-index: 1;
`;

const StyledLogoLetters = styled.div`
  margin-left: 2rem;
  margin-top: -0.8rem;
  width: 18.5rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
`;

const logoStyles = (props) => {
  return (
    <StyledLogo>
      <StyledLogoLettersContainer>
        <StyledLogoLetters>{props.children}</StyledLogoLetters>
      </StyledLogoLettersContainer>
    </StyledLogo>
  );
};

export default logoStyles;
