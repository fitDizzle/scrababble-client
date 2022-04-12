import React from "react";
import styled from "styled-components";

const StyledNavItem = styled.li`
  width: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  a {
    text-decoration: none;
    color: black;
  }
  :hover {
    font-style: oblique;
    font-weight: 900;
    border-radius: 5px;
    margin-top: -5px;
  }
`;

const NavItem = (props) => <StyledNavItem>{props.children}</StyledNavItem>;

export default NavItem;
