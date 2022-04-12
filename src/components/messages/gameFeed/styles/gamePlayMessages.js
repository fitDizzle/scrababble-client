import styled, { css } from "styled-components";

export const StyledGamePlayMessageContainer = styled.div`
  margin-top: 30px;
  height: 250px;
  width: 100%;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px 32px 16px 16px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledMessage = styled.p`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding: 6px 6px 6px 10px;
  border-radius: 10px;
  font-weight: 700;

  ${(props) =>
    props.type === "SUCCESS" &&
    css`
      color: black;
      background-color: #cafcbd;
    `}
  ${(props) =>
    props.type === "ALERT" &&
    css`
      color: black;
      background-color: #fdcbc2;
    `} 
    ${(props) =>
    props.type === "WARNING" &&
    css`
      color: black;
      background-color: #fbffb5;
    `} 
    ${(props) =>
    props.type === "MESSAGE" &&
    css`
      color: black;
      background-color: #ffffff;
    `}
`;

export const GameMessage = (props) => {
  return (
    <StyledMessage type={props.type} message={props.message}>
      {props.children}
    </StyledMessage>
  );
};


export default GameMessage;