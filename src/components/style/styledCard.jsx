import React from "react";
import styled, { StyleSheetManager } from "styled-components";

const StyledCard = styled.div`
  width: 200px;
  background-color: white;
`;

const StyledNav = styled.div`
  width: calc(100% - var(--side-nav-width));
`;

const StyledCardComponent = (props) => {
  return (
    <div>
      <StyledNav />
      <StyleSheetManager disableVendorPrefixes>
        <StyledCard>{props.children}</StyledCard>
      </StyleSheetManager>

      <button class="LoginButton-xxxx xxxx">Login</button>
    </div>
  );
};

export default StyledCardComponent;
