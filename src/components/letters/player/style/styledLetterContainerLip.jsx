import React from "react";
import styled from "styled-components";

const LetterContainerLip = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin-top: 15px;
  float: right;
  background: repeating-linear-gradient(
    180deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(208, 144, 60),
    /* rgb(255, 255, 255), */
    #97430b,
    #9e4910
    );
    z-index: -1;
`;

const StyledLetterContainerLip = () => <LetterContainerLip />;

export default StyledLetterContainerLip;
