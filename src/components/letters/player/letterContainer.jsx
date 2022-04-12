import React from "react";
import StyledLetterContainer from "./style/styledLetterContainer";

const LetterContainer = (props) => (
  <StyledLetterContainer>{props.children}</StyledLetterContainer>
);

export default LetterContainer;
