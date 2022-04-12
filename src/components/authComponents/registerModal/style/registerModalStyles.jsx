import styled from "styled-components";

export const ModalContentContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px;
`;

export const ModalContentTitle = styled.h1`
  text-align: center;
  font-weight: 500;
  color: black;
`;

export const RegisterModalForm = styled.form`
  background-color: #eee;
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  label {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const ModalInput = styled.input`
  background-color: #eee;
  height: 40px;
  width: 90%;
  padding: 5px 5px;
  border: 1px solid #979797;
  :focus-visible {
    outline: 0px solid #858585;
    border: 1px solid #858585;
    border-radius: 10px;
  }
`;

export const ModalButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #34b3f7;
  border: none;
  :hover {
    background-color: #159fe9;
  }
`;

export const RegisterModalFooter = styled.footer`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 10px 0px 0px 0px;
`;

export const ErrorMessage = styled.div`
  width: 80%;
  height: 35px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.type === "success" ? "#87ed87" : "#ffabab"};
  border: 2px solid
    ${(props) => (props.type === "success" ? "#64ff64" : "#ffabab")};
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 10px;
`;

export default (ModalContentContainer,
ModalContentTitle,
RegisterModalForm,
ModalInput,
ModalButton,
ErrorMessage);
