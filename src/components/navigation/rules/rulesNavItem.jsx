import React from "react";
import styled from "styled-components";

const DropButton = styled.button`
  width: 115px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 15px;
  margin-left: -45px;

  a {
    text-decoration: none;
    color: black;
  }

  :hover {
    width: 150px;
    font-style: oblique;
    font-weight: 900;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  display: inline-block;
  :hover button {
    display: block;
  }
  :hover div {
    display: block;
  }
`;

const Content = styled.div`
  display: none;
  position: absolute;
  background-color: transparent;
  width: 160px;
  z-index: 1;
  border-radius: 5px;

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    border: 2px solid #ccc;
    background-color: #eee;
    margin-top: 2px;
  }

  a:hover {
    border: 2px solid #ccc;
    background-color: #ddd;
    border-radius: 5px;
  }
`;

const RulesNavItem = () => (
  <ContentContainer>
    <DropButton>HOW TO PLAY</DropButton>
    <Content>
      <a href="/rules">Rules</a>
      <a href="/scoring">Scoring</a>
      <a href="/tile-count">Tile Count</a>
    </Content>
  </ContentContainer>
);

export default RulesNavItem;
