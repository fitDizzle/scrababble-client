import React from "react";
import styled, { keyframes } from "styled-components";

const messageFade = keyframes`   
    from { 
      opacity: 0;
      }
    to { 
      opacity: 1; 
      }
      `;

const Toast = styled.div`
  animation: ${messageFade} 5s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 25px;
  border-radius: 5px;
  padding: 15px 0px 5px 0px;
  justify-content: flex-start;
  display: flex;
  p {
    height: 30px;
  }
`;

const TauntToast = (props) => {
  return (
    <Toast message={props.message}>
      <p>{props.message}</p>
    </Toast>
  );
};

export default TauntToast;
