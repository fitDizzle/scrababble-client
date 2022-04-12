import React from "react";
import styled from "styled-components";

const StyledAvatarContainer = styled.div`
  border: 2px solid #ccc;
  background-color: #eee;
  border-radius: 5px;
  padding: 16px;
  :after {
    content: "";
    clear: both;
    display: table;
  }
  p {
    margin-top: -10px;
  }
  img {
    float: left;
    margin-right: 20px;
    border-radius: 50%;
    width: 90px;
  }

  span {
    font-size: 20px;
    margin-right: 15px;
  }

  @media (max-width: 500px) {
    text-align: center;
    img {
      margin: auto;
      float: none;
      display: block;
    }
  }
`;

export const AvatarContainer = (props) => {
  return <StyledAvatarContainer>{props.children}</StyledAvatarContainer>;
};

export default AvatarContainer;
