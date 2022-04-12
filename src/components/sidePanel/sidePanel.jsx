import React from "react";
import styled from "styled-components";

import Bag from "../bag/bagContainer";
import GameStats from "./gameStats/gameStats";
import SettingsContainer from "./settings/settingsContainer";

const StyledSidePanelContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin-left: -28px;
`;

const StyledSidePanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const SidePanel = (props) => (
  <StyledSidePanelContainer>
    <StyledSidePanel>
      <GameStats />
      <SettingsContainer />
      <Bag />
    </StyledSidePanel>
  </StyledSidePanelContainer>
);

export default SidePanel;
