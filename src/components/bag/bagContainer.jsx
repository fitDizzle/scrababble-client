import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { addToExchangeCacheAction } from "../../Redux/actions/gameplayActions/drawActions";

import { useDropHandler } from "../../hooks/tileHooks";

import { useRenderLetters } from "../../hooks/renderLettersHook";

const StyledBag = styled.div`
  width: 76%;
  height: 216px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  background-color: #e6e6e6;
  border-radius: 5px;
  padding: 16px 16px 0px 16px;
  overflow: hidden;

  .letter {
    height: 20px;
    width: 50px;
    div {
      font-size: 25px;
      p {
        margin-top: -12px;
        font-size: 10px;
        position: absolute;
        padding-left: 30px;
      }
    }
  }
`;

// const BagCashLip = styled.img`
//   position: absolute;
//   transform: rotate(-38deg);
//   z-index: 0;
// `;

const BagCash = styled.div`
  width: 305px;
  height: 400px;
  background-repeat: no-repeat;
  flex-direction: row;
  background-size: fill;
  margin-left: 45px;
  margin-top: 95px;
  transform: rotate(-26deg);
  z-index: 3;
`;

const BagExchangeContainer = styled.div`
  max-width: 200px;
  height: auto;
  position: absolute;
  display: flex;
  overflow-wrap: break-word;
  flex-wrap: wrap;
  transform: rotate(-36deg);
  z-index: 2;
  margin-top: 63px;
  margin-left: -68px;
`;

const TestImage = styled.img`
  height: 300px;
  width: auto;
  z-index: 0;
  transform: rotate(-10deg);
  margin-top: -25px;
  margin-left: 80px;
`;

const Bag = (props) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { tiles } = state;
  const playerTiles = state.player.tiles;

  let [exchangeCache, updateExchangeCache] = useState([]);
  let [letters, setLetters] = useState([]);

  useEffect(() => {
    const update = async () => {
      updateExchangeCache(tiles.exchangeCache);
      await Render_Letters(tiles.exchangeCache);
    };
    update();
  }, [tiles.exchangeCache]);

  const Render_Letters = async (tiles) => {
    let result = await useRenderLetters(tiles);
    setLetters(result);
  };

  async function BagDrop_Handler(e) {
    let result = await useDropHandler(e, "bag");
    dispatch(
      addToExchangeCacheAction(
        result,
        playerTiles,
        tiles.exchangeCache,
        state.plays.current
      )
    );
  }

  function BagDragOver_Handler(e) {
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
  }

  return (
    <StyledBag id="letter-bag" className="unselectable">
      {/* <BagCashLip src="images/beigeBagLip.png" /> */}

      <BagExchangeContainer>{letters}</BagExchangeContainer>
      <BagCash
        id="bag-tile-cache"
        className="unselectable"
        onDrag={(e) => BagDragOver_Handler(e)}
        onDrop={(e) => BagDrop_Handler(e)}
        onDragOver={(e) => e.preventDefault(e)}
      >
        <TestImage src="images/beigeTileBag.png" />
      </BagCash>
    </StyledBag>
  );
};

export default Bag;
