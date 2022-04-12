import React from "react";
import styled from "styled-components";

const StyledLetterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0vh;
  background: repeating-linear-gradient(
    180deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(208, 144, 60),
    rgb(255, 255, 255),
    rgb(236, 236, 216),
    #dc8851
  );
`;

export const AILetterContainer = (props) => {
  return (
    <StyledLetterContainer id="ai-letter-placeholder">
      {props.children}
    </StyledLetterContainer>
  );
};

export default AILetterContainer;
