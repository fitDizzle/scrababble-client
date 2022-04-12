import React from "react";
import styled, { keyframes } from "styled-components";

// Toast types and associated colors
    // Red === Alert
    // Green === SUCCESS
    // BLUE === BASIC
    // GOLD === SPECIAL

const appear = keyframes`   
from { 
  opacity: 0;
  }
50% { 
  opacity: 1;
  }
to { 
  opacity: 0; 
  }
  `;

const StyledToast = styled.div`
  width: 12rem;
  /* animation: ${appear} 7s cubic-bezier(0.4, 0, 0.2, 1) both infinite; */
  animation: ${appear} 5s cubic-bezier(0.8, 0, 0.2, 1) both infinite;
  background-color: #29c5e0;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
`;

const Toast = (props) => {
  return <StyledToast>{props.children}</StyledToast>;
};

export default Toast;
