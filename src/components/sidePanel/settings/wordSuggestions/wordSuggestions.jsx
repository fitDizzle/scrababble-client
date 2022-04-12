import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getRelativeWordsAction } from "../../../../Redux/actions/wordSearchActions/wordSearchAction";

const StyledWordSuggestionsContainer = styled.div`
  width: 95%;
  display: ${(props) => (props.active === true ? "flex" : "none")};
  flex-direction: column;
`;

const StyledWordSuggestionsHeader = styled.h3`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`;

const StyledWordSuggestions = styled.div`
  width: 85%;
  height: 7rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px 16px 10px 16px;
  overflow: hidden;
`;

const StyledWordContainer = styled.h4`
  width: auto;
  display: flex;
  background-color: rgba(204, 204, 204, 0.453);
  border-radius: 10px;
  padding: 6px;
  margin: 0;
  margin-left: 5px;
  margin-right: 5px;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 0px 0px 0px;
  z-index: 9;
`;

const StyledPaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  width: 25%;
  border: none;
  padding: 7px 10px;
  background-color: #34b3f7;
  font-size: 15px;
  :hover {
    background-color: #159fe9;
  }
`;

const WordSuggestions = (props) => {
  const dispatch = useDispatch();
  const relativeWords = useSelector((state) => state.wordSearch);
  const userTiles = useSelector((state) => state.player.tiles);

  let [availableTiles, setAvailableTiles] = useState([]);

  let [words, setWords] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);

  async function getSuggestedWords(tiles) {
    tiles = tiles.map((tile) => tile.tile);
    try {
      if (props.settings) {
        await dispatch(getRelativeWordsAction(tiles));
      }
    } catch (error) {
      console.log("ERROR FINDING RELATIVE WORDS FOR USER.");
    }
    return;
  }

  useEffect(() => {
    getSuggestedWords(userTiles);
    return () => {
      setWords(
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (words = Array.from(new Set(relativeWords)).map((word) => {
          return word;
        }))
      );
    };
  }, []);

  const renderSuggestedWords = (words, page) => {
    let wordArr = [...words].slice(page, page + 5);

    return wordArr.map((word, idx) => {
      return <StyledWordContainer key={idx}>{word}</StyledWordContainer>;
    });
  };

  function paginate(selection, page) {
    getSuggestedWords(userTiles);
    if (selection === "PREV") {
      return setCurrentPage((page -= 5));
    }
    if (selection === "NEXT") {
      setCurrentPage((page += 5));
    }
  }

  return (
    <StyledWordSuggestionsContainer active={props.settings}>
      <StyledWordSuggestionsHeader>Suggested Words</StyledWordSuggestionsHeader>
      <StyledWordSuggestions>
        {renderSuggestedWords(relativeWords, currentPage)}
      </StyledWordSuggestions>
      <StyledButtonContainer>
        <StyledPaginationButton onClick={() => paginate("PREV", currentPage)}>
          <strong>Prev</strong>
        </StyledPaginationButton>
        <StyledPaginationButton onClick={() => paginate("NEXT", currentPage)}>
          <strong>Next</strong>
        </StyledPaginationButton>
      </StyledButtonContainer>
    </StyledWordSuggestionsContainer>
  );
};

export default WordSuggestions;
