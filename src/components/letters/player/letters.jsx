import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { Letter } from "../letter";

import { useDropHandler, useDragoverHandler } from "../../../hooks/tileHooks";
import { updateCurrentPlayAction } from "../../../Redux/actions/gameplayActions/gameplayActions";

import { useDrawAfterPlay } from "../../../hooks/drawHooks"


const StyledLettersContainer = styled.div`
  padding: 0px 15px;
  position: absolute;
  top: 5px;
  width: 400px;
  height: 1.3rem;
  display: grid;
  margin-bottom: 15px;
  grid-template-columns: 50px repeat(6, 1fr);
  grid-gap: 5px;
`;

const StyledLetterPoints = styled.p`
  margin-left: 23px;
  margin-top: 0px;
  position: relative;
  font-size: 9px;
`;

export const Letters = () => {
  const dispatch = useDispatch()


  const [letters, setLetters] = useState([]);
  const [componentLoaded, setLoad] = useState(false);
  const { tiles } = useSelector((state) => state.player);
  const { plays } = useSelector((state) => state);
  const [letterX, setLetterX] = useState(null)

  const { tiles: allTiles } = useSelector(state => state)


  const PlaceHolder_Drop_Handler = async (e) => {
    let toReplace = await useDropHandler(e, "placeholder", letterX);
    await dispatch(
      updateCurrentPlayAction(toReplace, plays.current, "remove", tiles)
    );
    await setLetterX(null)
  };

  const PlaceHolder_Dragover_Handler = async (e) => {
    let x = useDragoverHandler(e, "placeholder");
    if(letterX == null){
      setLetterX(x)
    }
  };

  function RenderLetters(tiles) {
    return tiles.map((letter, i) => {
      return (
        <Letter id={letter.id} key={i} value={letter.tile} onPlaceHolder={true}>
          {letter.tile !== "blank" ? letter.tile.toUpperCase() : "BL"}
          <StyledLetterPoints className="unselectable">{letter.value}</StyledLetterPoints>
        </Letter>
      );
    });
  }
  useEffect(() => {
    const setLocalStateLetters = async () => {
      setLoad(false);
      await setLetters(RenderLetters(tiles));
      setLoad(true);
    };
    setLocalStateLetters();
  }, [tiles]);

  const TEST_DRAW = (tiles) => {
    useDrawAfterPlay([], tiles, allTiles, dispatch, false)
  }

  // useLayoutEffect(() => {
  //   console.log(tiles, "TILESSS")
  //   // Comment back out after resolution!!!!!!!!!
  //   if(tiles.length < 7){
  //     TEST_DRAW(tiles)
  //   }
  // }, [tiles])

  return (
    <StyledLettersContainer
    id="letters"
    onDragOver={(e) => PlaceHolder_Dragover_Handler(e)}
    onDrop={(e) => PlaceHolder_Drop_Handler(e)}
  >
    {letters}
  </StyledLettersContainer>
  );
};

export default Letters;
