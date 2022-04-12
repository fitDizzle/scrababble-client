import React from "react";
import styled from "styled-components";
import WordSearch from "../search/wordSearch";

const LifeLineContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  padding: 16px 0px;
  display: ${(props) => (props.active === true ? "block" : "none")};

`;

const LifeLineCountDisplay = styled.div`
  width: 10%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 0px;
  float: right;
`;

const LifeLineButton = styled.button`
  margin-top: 1rem;
  min-width: 200px;
  border: none;
  font-size: 18px;
  padding: 7px 10px;
  background-color: #34b3f7;
  :hover {
    background-color: #159fe9;
  }
`;

const LifeLines = (props) => {
  return (
    <LifeLineContainer active={props.settings}>
      <LifeLineCountDisplay>
        <p>5</p>
        <p>1</p>
      </LifeLineCountDisplay>
      <WordSearch settings={props.settings} />
      <LifeLineButton>Ask Maven 2.0</LifeLineButton>
    </LifeLineContainer>
  );
};

export default LifeLines;
