import React from "react";
import styled from "styled-components";
import LogoLetters from "./logoLetters";

const StyledLogo = styled.div`
  position: absolute;
`;

const Logo = (props) => {
  return (
    <StyledLogo id="logo" onClick={props.onClick}>
      {/* <LogoLetters /> */}
    </StyledLogo>
  );
};

export default Logo;
