import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`   
from { 
  opacity: 0;
  margin-left: 10%;
}
50% { 
  opacity: 1;
  margin-left: 45%;
}
to { 
  opacity: 0; 
  margin-left: 90%;
}
  `;

const Toast = styled.div`
  animation: ${slideIn} 4s cubic-bezier(0.4, 0, 0.2, 1) both;
  background-color: #29c5e0;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
`;

const StyledAnimation = (props) => {
  return <Toast>{props.children}</Toast>;
};

export default StyledAnimation;
