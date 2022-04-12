import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const BagCountContainer = styled.div`
  width: 85%;
  height: auto;
  display: ${(props) => (props.active === true ? "block" : "none")};
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 10px;
  padding-left: 32px;
  span {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    font-size: 15px;
  }
  p {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    font-size: 17px;
    margin: 0;
  }
`;

const TileCountsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 10px;
`;

const TileContainer = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  background-color: rgba(204, 204, 204, 0.453);
  border-radius: 10px;
  padding: 6px;
  margin: 0;
  margin-left: 2px;
  margin-bottom: 2px;
`;

const BagCount = (props) => {
  const tiles = useSelector((state) => state.tiles.tileBag);
  const tileLetters = Object.keys(tiles);
  const tileCounts = Object.values(tiles);

  const tileCount = Object.values(tiles).reduce(
    (totalRemaining, currentLetterCount) => totalRemaining + currentLetterCount,
    0
  );

  function renderTileCount() {
    return tileLetters.map((_, i) => (
      <TileContainer key={i}>{tileLetters[i].toLocaleUpperCase() + " " + tileCounts[i]}</TileContainer>
    ));
  }

  return (
    <BagCountContainer active={props.settings}>
      <h3 style={{margin: '0'}}>Tiles Remaining: {tileCount}</h3>
      <br />
      <TileCountsContainer>{renderTileCount()}</TileCountsContainer>
    </BagCountContainer>
  );
};

export default BagCount;
