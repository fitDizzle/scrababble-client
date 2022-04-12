import React from "react";
import styled from "styled-components";

const StyledNavMenu = styled.nav`
  width: 99%;
  display: flex;
  flex-direction: row;
  height: 3.5rem;
  border-bottom: 5px solid rgba(252, 249, 249, 0.137);
  z-index: 0;
`;

const NavBar = (props) => <StyledNavMenu>{props.children}</StyledNavMenu>;

export default NavBar;
