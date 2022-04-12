import React, { useState, useEffect } from "react";
import * as Styles from "./style/settingsSelector";
import { useSelector, useDispatch } from "react-redux";
import {
  getSettingsAction,
  updateSettingsAction,
  resetSettingsAction,
} from "../../Redux/actions/settingsActions/settingsAction";

import { HiCog } from "react-icons/hi";

const SettingsSelector = (props) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user.username);
  const userSettings = useSelector((state) => state.settings);
  const token = useSelector((state) => state.auth.token);

  const [show, setShow] = useState(false);

  const onHandleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const getUserSettings = async (username) => {
    try {
      await dispatch(getSettingsAction(username));
    } catch (error) {
      console.log("ERROR RETRIEVING USER SETTINGS.");
    }
    return;
  };

  const resetUserSettings = async (username) => {
    try {
      await dispatch(resetSettingsAction(username));
    } catch (error) {
      console.log("ERROR RESETTING USER SETTINGS.");
    }
    return;
  };

  const updateUserSettings = async (e) => {
    let body = {
      name: [e.target.name],
      username: username,
    };

    try {
      await dispatch(updateSettingsAction(body));
    } catch (error) {
      console.log("ERROR UPDATING USER SETTINGS.");
    }
    return;
  };

  useEffect(() => {
    if (token) {
      getUserSettings(username);
    }
  }, [username]);

  return (
    <Styles.SettingsContainer className="dropdown">
      <Styles.SelectSettingsButton onClick={(e) => onHandleClick(e)}>
        <HiCog size={30} />
      </Styles.SelectSettingsButton>
      <Styles.SettingsDropDownContent
        id="myDropdown"
        className={`${show ? "dropdown-content show" : "dropdown-content"}`}
      >
        <Styles.SettingsForm>
          <Styles.SettingsTitleContainer>
            <h3>Settings</h3>
            <Styles.CloseButton onClick={(e) => onHandleClick(e)}>
              X
            </Styles.CloseButton>
          </Styles.SettingsTitleContainer>
          <div>
            <label>Enable Life Lines</label>
            <Styles.SettingsInputField
              type="checkbox"
              name="lifeLines"
              value="lifeLines"
              checked={userSettings.lifeLines || false}
              onClick={(e) => updateUserSettings(e)}
              onChange={(e) => e}
            />
          </div>
          <div>
            <label>Show Letter Count</label>
            <Styles.SettingsInputField
              type="checkbox"
              name="bagCount"
              value="bagCount"
              checked={userSettings.bagCount || false}
              onClick={(e) => updateUserSettings(e)}
              onChange={(e) => e}
            />
          </div>
          <div>
            <label>Enable Word Search</label>
            <Styles.SettingsInputField
              type="checkbox"
              name="wordSearch"
              value="wordSearch"
              checked={userSettings.wordSearch || false}
              onClick={(e) => updateUserSettings(e)}
              onChange={(e) => e}
            />
          </div>
          <div>
            <label>Word Suggestions</label>
            <Styles.SettingsInputField
              type="checkbox"
              name="wordSuggestions"
              value="wordSuggestions"
              checked={userSettings.wordSuggestions || false}
              onClick={(e) => updateUserSettings(e)}
              onChange={(e) => e}
            />
          </div>
          <div>
            <label>Dark Theme</label>
            <Styles.SettingsInputField
              type="checkbox"
              name="darkMode"
              value="darkMode"
              checked={userSettings.darkMode || false}
              onClick={(e) => updateUserSettings(e)}
              onChange={(e) => e}
            />
          </div>
        </Styles.SettingsForm>
        <Styles.SettingsButtonContainer>
          <Styles.SettingsButton onClick={(e) => resetUserSettings(username)}>
            Reset Settings
          </Styles.SettingsButton>
        </Styles.SettingsButtonContainer>
      </Styles.SettingsDropDownContent>
    </Styles.SettingsContainer>
  );
};

export default SettingsSelector;
