import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import BagCount from "./bagCount/bagCount";
import WordSearch from "./search/wordSearch";
import WordSuggestions from "./wordSuggestions/wordSuggestions";
import LifeLines from "./lifeLines/lifeLines";
import SettingsSelector from "../../settings/settingsSelector";

const StyledSettingsContainer = styled.div`
  width: 76%;
  height: 14.5rem;
  display: flex;
  flex-direction: column;
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 8px;
`;

const SettingsContainer = () => {
  let settings = useSelector((state) => state.settings);
  return Object.values(settings).filter((x) => x === true).length > 0 ? (
    <StyledSettingsContainer settings={settings}>
      <SettingsSelector />
      <BagCount settings={settings.bagCount} />
      <WordSearch settings={settings.wordSearch} />
      <WordSuggestions settings={settings.wordSuggestions} />
      <LifeLines settings={settings.lifeLines} />
    </StyledSettingsContainer>
  ) : (
    <StyledSettingsContainer settings={settings}>
      <SettingsSelector />
      <h1 style={{ opacity: ".6", paddingLeft: "15px", paddingTop: "32px" }}>
        No settings selected
      </h1>{" "}
    </StyledSettingsContainer>
  );
};

export default SettingsContainer;
