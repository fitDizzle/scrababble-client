import React from "react";
import StyledStaticContentContainer from "./style/styledStaticContentContainer";

const StaticContentContainer = (props) => (
  <StyledStaticContentContainer>{props.children}</StyledStaticContentContainer>
);

export default StaticContentContainer;
