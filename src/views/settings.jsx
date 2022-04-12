import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StaticContentContainer from "../components/static/staticContentContainer";

// @ts-ignore
const SettingsForm = styled.form`
  width: 50%;
  opacity: 0.7;
`;

const Settings = () => {
  let [settings, setSettings] = useState({
    showLetterCount: false,
    enableWordSearch: false,
    challengeWords: false,
    showWordSuggestions: false,
  });

  const onSettingsHandle = (e) => {
    const selectedSetting = e.target;
    console.log(selectedSetting);
    // setSettings({...settings, .Checked})
  };

  return (
    <StaticContentContainer>
      <h1>Game Settings:</h1>
      <SettingsForm>
        <br />
        <label>Show Letter Count</label>
        <input
          type="checkbox"
          name="letter-count"
          defaultChecked={false}
          onClick={(e) => onSettingsHandle(e)}
        />
        <br />
        <label>Enable Word Search</label>
        <input
          type="checkbox"
          name="word-search"
          defaultChecked={false}
          onClick={(e) => onSettingsHandle(e)}
        />
        <br />
        <label>Challenge Words</label>
        <input
          type="checkbox"
          name="challenge-words"
          defaultChecked={false}
          onClick={(e) => onSettingsHandle(e)}
        />
        <br />
        <label>Word Suggestions</label>
        <input
          type="checkbox"
          name="word-suggestions"
          defaultChecked={false}
          onClick={(e) => onSettingsHandle(e)}
        />
      </SettingsForm>

      <button onClick={(e) => console.log("rules saves")}>Save Settings</button>
      <button onClick={(e) => console.log("rules saves")}>
        Reset Settings
      </button>
      <button onClick={(e) => console.log("rules saves")}>Cancel</button>
    </StaticContentContainer>
  );
};

export default Settings;
