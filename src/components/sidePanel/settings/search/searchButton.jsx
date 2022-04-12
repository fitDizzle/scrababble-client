// import React from "react";
import styled from "styled-components";

export const StyledSearchContainer = styled.div`
  display: ${(props) => (props.active === true ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const StyledSearchBarLabel = styled.label`
  width: 100%;
  height: auto;
  padding-bottom: 10px;
`;

export const StyledSearchFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledSearchBar = styled.input`
  width: 70%;
  height: 30px;
  border: 2px solid rgba(204, 204, 204, 0.453);
  border-radius: 5px;
  padding-left: 10px;
  :focus {
    outline: none;
  }
`;

export const StyledSearchButton = styled.button`
  width: 25%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(204, 204, 204, 0.453);
  border-radius: 5px;
  padding-left: 10px;
  float: right;
  :focus {
    outline: none;
  }
  :active {
    padding: 5px;
  }
`;

export const StyledWordContainer = styled.h4`
  width: auto;
  display: flex;
  align-items: center;
  background-color: rgba(204, 204, 204, 0.453);
  border-radius: 10px;
  padding: 6px;
  margin: 0;
  margin-left: 5px;
  margin-bottom: 5px;
`;

export const SearchButton = (props) => (
  <StyledSearchButton
    active={props.active}
    onClick={props.onClick}
    onSubmit={props.onSubmit}
  >
    {props.children}
  </StyledSearchButton>
);

export default SearchButton;
