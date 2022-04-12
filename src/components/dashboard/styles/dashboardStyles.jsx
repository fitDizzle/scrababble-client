import React from "react";
import styled from "styled-components";

export const DashBoardContainer = styled.div`
  width: 97.75%;
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and(max-width: 776px){
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }
`;

export const DashBoardContentContainer = styled.div`
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px;

  
  @media screen and(max-width: 776px){
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const DashBoardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    margin-top: -35px;
    font-size: 25px;
    text-decoration: none;
    color: #079cff;
  }
  a:hover {
    color: #006aa3;
  }
`;

export const PlayerInformationContainer = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayerInformation = styled.div`
  width: 240px;
  height: 75%;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 16px;
  margin-top: -9px;
  a {
    font-size: 18px;
    color: #079cff;
    text-decoration: none;
  }
  a:hover {
    color: #006aa3;
  }
`;

export const GamesHistory = styled.div`
  width: 70%;
  height: 110%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 0px 0px;
  margin-top: -60px;
`;

export const GamesHistoryContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GamesHistoryHeaderContent = styled.header`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #eee;
  padding: 0px 0px;
  font-weight: 700;
`;

export const GameCard = styled.div`
  width: 96.5%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  margin-top: 5px;
  padding: 10px;
  font-size: 15px;

  :hover {
    background-color: #e6e4e4;
  }
`;

export const DashBoardButtonContainer = styled.div`
  width: 98.35%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
`;

export const DashBoardLoadButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-width: 40px;
width: 18%;
border: none;
padding: 7px 10px;
background-color: ${(props) => (props.gameId === null ? "gray" : "#34b3f7")};
font-size: 18px;
:hover {
  background-color:${(props) => props.gameId === null ? "gray" : "#159fe9"};
}
`;

export const DashBoardButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  width: 18%;
  border: none;
  padding: 7px 10px;
  background-color: ${(props) => (props.bg === true ? "green" : "#34b3f7")};
  font-size: 18px;
  :hover {
    background-color: #159fe9;
  }
`;

export const GamePlayForm = styled.form`
  height: 100%;
  padding: 0px 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  label {
    padding-right: 10px;
  }
`;

export const GamePlayFormSelect = styled.select`
  height: 50%;
  padding: 0px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  font-size: 13px;
`;

export const DashboardStyles = (props) => <div></div>;

export default (DashboardStyles,
DashBoardHeader,
PlayerInformationContainer,
PlayerInformation,
DashBoardButton,
DashBoardContentContainer,
DashBoardButtonContainer,
GamesHistoryContainer,
GamesHistoryHeaderContent,
GamesHistory,
GamePlayForm,
GamePlayFormSelect,
GameCard);
