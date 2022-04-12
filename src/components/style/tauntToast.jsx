import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`   
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

const Toast = styled.div`
  animation: ${slideIn} 5s cubic-bezier(0.4, 0, 0.2, 1) both infinite;
  font-size: 20px;
  margin-left: 6rem;
  border-radius: 5px;
  padding: 10px;
  position: fixed;
  overflow-wrap: break-word;
  text-overflow: clip;
  width: 220px;
`;

const TauntToast = (props) => {
  return <Toast>{props.children}</Toast>;
};

export default TauntToast;
