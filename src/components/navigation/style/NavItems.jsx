import React from "react";
import styled from "styled-components";

const StyledNavItems = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
`;

const NavItems = (props) => <StyledNavItems>{props.children}</StyledNavItems>;

export default NavItems;
