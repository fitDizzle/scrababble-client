import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { Letter } from "../letter";

const StyledAILettersContainer = styled.div`
  padding: 0px 15px;
  width: 400px;
  height: 0.8rem;
  display: grid;
  margin-bottom: 15px;
  grid-template-columns: 50px repeat(6, 1fr);
  grid-gap: 5px;

  p {
    line-height: ${(props) => (props.props ? "0px" : "15px")};
    font-weight: bold;
    text-shadow: 0px 0px 2px white;
  }
`;

export const AILetters = () => {
  const [letters, setLetters] = useState([]);
  const [componentLoaded, setLoad] = useState(false);
  const { tiles } = useSelector((state) => state.ai);

  function RenderLetters(tiles) {
    return tiles.map((letter, i) => {
      return <Letter id={letter.id} key={i} value={letter.tile} />;
    });
  }

  useEffect(() => {
    const setLocalStateLetters = async () => {
      await setLetters(RenderLetters(tiles));
      setLoad(true);
    };
    setLocalStateLetters();
  }, [tiles, tiles.length]);

  return (
    <StyledAILettersContainer id="ai-letters">
      {letters}
    </StyledAILettersContainer>
  );
};

export default AILetters;
