import React from "react";
import styled, { css } from "styled-components";

const StyledTextField = styled.input`
  width: 50%;
  height: 40px;

  // 1. Empty state
  ${(props) =>
    props.empty &&
    css`
      color: none;
      background-color: white;
    `}

  // 2. Active state 
${(props) =>
    props.active &&
    css`
      color: black;
      background-color: whitesmoke;
      background-color: whitesmoke;
    `} 
 
// 3. Filled state 
${(props) =>
    props.filled &&
    css`
      color: black;
      background-color: white;
      border: 1px solid green;
    `}
`;

const MultiStateStyledComponent = (props) => {
  return <StyledTextField></StyledTextField>
};

export default MultiStateStyledComponent;
