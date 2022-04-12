import React from "react";
import styled from "styled-components";

const LetterContainer = styled.div`
  position: relative;
  width: 100%;
  height:0;
  bottom:0;
  background: repeating-linear-gradient(
    180deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(208, 144, 60),
    #dc8851
  );
  z-index: 1;
`;

const StyledLetterContainer = (props) => {
  return (
    <LetterContainer id="letter-placeholder">{props.children}</LetterContainer>
  );
};

export default StyledLetterContainer;
