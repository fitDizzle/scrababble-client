import React from "react";
import styled from "styled-components";

const StyledAIContainerLip = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin-top: -10px;
  float: right;
  background: repeating-linear-gradient(
    180deg,
    #dc8851,
    rgb(230, 181, 118),
    #f0a370,
    rgb(230, 181, 118),
    rgb(208, 144, 60),
    #dc8851
  );
  z-index: 2;
`;

const AILetterContainerLip = () => {
  return <StyledAIContainerLip className="unselectable" />;
};

export default AILetterContainerLip;
