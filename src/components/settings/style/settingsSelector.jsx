import styled from "styled-components";

export const SettingsContainer = styled.div`
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;

  .show {
    display: block;
    margin-left: 4rem;
    z-index: 1;
  }
`;

export const SettingsTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: -15px;
`;

export const SettingsDropDownContent = styled.div`
  display: none;
  position: absolute;
  margin-left: -200px;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px;
  background-color: #f1f1f1;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  a:hover {
    background-color: #ddd;
  }
`;

export const SettingsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const SelectSettingsButton = styled.button`
  display: flex;
  float: right;
  width: auto;
  color: black;
  border: none;
  cursor: pointer;
  :focus {
    display: none;
  }
`;

export const SettingsButton = styled.button`
  background-color: #34b3f7;
  border: none;
  padding: 10px;
  margin-left: 5px;
  width: 85%;
  color: black;
  cursor: pointer;
  :hover {
    background-color: #159fe9;
  }
`;

export const CloseButton = styled.button`
  padding: 5px 5px;
  border: none;
  background-color: none;
  cursor: pointer;
`;

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  opacity: 0.7;
  padding-bottom: 10px;
`;

export const SettingsInputField = styled.input`
  margin: 0px 0px 12px 5px;
`;

export default (SettingsContainer,
SettingsTitleContainer,
SettingsDropDownContent,
SettingsButton,
SettingsButtonContainer,
SelectSettingsButton,
CloseButton,
SettingsForm,
SettingsInputField);
