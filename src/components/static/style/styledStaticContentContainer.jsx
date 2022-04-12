import React from "react";
import styled from "styled-components";

const StaticContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;

const StyledStaticContentContainer = (props) => (
  <StaticContentContainer className="overlay">
    {props.children}
  </StaticContentContainer>
);

export default StyledStaticContentContainer;
