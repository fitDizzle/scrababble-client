import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Mode = styled.div``;

const ModeComponent = (props) => {
  const DarkMode = useSelector((state) => state.settings.darkMode);

  return <Mode>{props.children}</Mode>;
};

export default ModeComponent;
