import React, { useState, useEffect } from "react";
import * as Styles from "./searchButton";
import { useSelector, useDispatch } from "react-redux";
import SearchButton from "./searchButton";
import {
  clearSearchAction,
  getAllWordsAction,
} from "../../../../Redux/actions/wordSearchActions/wordSearchAction";

export default function WordSearch(props) {
  const dispatch = useDispatch();
  const allWords = useSelector((state) => state.wordSearch);

  let [searchCriteria, setSearchCriteria] = useState("");
  let [words, setWords] = useState([]);

  useEffect(() => {
    setWords(
      // eslint-disable-next-line react-hooks/exhaustive-deps
      (words = Array.from(new Set(allWords)).map((word) => {
        return word;
      }))
    );
  }, [allWords]);

  const searchDictionary = async (searchCriteria) => {
    try {
      await clearSearch();
    } catch (error) {
      console.log("ERROR CLEARING STATE FOR NEW WORD SEARCH.");
    }
    try {
      await dispatch(getAllWordsAction(searchCriteria));
    } catch (error) {
      console.log("ERROR RETRIEVING ALL WORDS.");
    }
    return;
  };

  const updateSearchCriteria = async (e) => {
    clearSearch();
    let criteria = e.target.value;
    setSearchCriteria(criteria);
    return;
  };

  const clearSearch = async (e) => {
    setSearchCriteria("");
    setWords([]);
    try {
      await dispatch(clearSearchAction());
    } catch (error) {
      console.log("ERROR CLEARING SEARCH STATE.");
    }
    return;
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      return await searchDictionary(searchCriteria);
    } else if (e.key === "BACKSPACE") {
      return await clearSearch(e);
    }
    return;
  };

  var criteria = searchCriteria;

  var wordList = new Array(
    words.filter(function (char) {
      return char.toLowerCase().indexOf(criteria.toLowerCase()) >= 0;
    })
  );

  var filtered = [...wordList];

  const renderWords = () => {
    return filtered[0].map((word, idx) =>
      idx < 5 ? (
        <Styles.StyledWordContainer key={idx} data-id={word.WordId}>
          {word}
        </Styles.StyledWordContainer>
      ) : (
        ""
      )
    );
  };

  return (
    <Styles.StyledSearchContainer active={props.settings}>
      <Styles.StyledSearchBarLabel>
        <h3>Word Search</h3>
        <div id="log"></div>
      </Styles.StyledSearchBarLabel>

      <Styles.StyledSearchFormContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Styles.StyledSearchBar
            type="search"
            name="query"
            className="library-search-bar"
            placeholder="Search dictionary...."
            onChange={(e) => updateSearchCriteria(e)}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <SearchButton
            type="submit"
            onClick={(e) => searchDictionary(searchCriteria)}
          >
            Search
          </SearchButton>
        </div>

        {/* <p>Total Words Found: {filtered[0].length}</p> */}

        <div
          style={{
            width: "80%",
            justifyContent: "space-evenly",
            paddingTop: "10px",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {renderWords()}
        </div>
      </Styles.StyledSearchFormContainer>
    </Styles.StyledSearchContainer>
  );
}
