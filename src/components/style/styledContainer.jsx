import React from "react";
import styled from "styled-components";

const StyledContainer = styled.section.attrs((props) => ({
  width: props.width || "100%",
  hasPadding: props.hasPadding || false,
}))`
  --container-padding: 20px;
  width: ${(props) => props.width}; // Falls back to 100%
  padding: ${(props) =>
    (props.hasPadding && "var(--container-padding)") || "none"};
`;

const StyledComponent = () => {
  return <StyledContainer hasPadding={true}>This Object</StyledContainer>;
};

export default StyledComponent;
