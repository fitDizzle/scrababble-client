import React from "react";
import styled from "styled-components";

const LogoLetter = styled.div`
  transform: ${(props) => `rotate(${props.rotate}`};
`;

const StyledPerspectiveBoxFar = styled.div`
  transform: ${(props) =>
    props.active === true
      ? "perspective(4.75cm) rotateX(0deg) rotateY(83.5deg)"
      : "perspective(0cm) rotateX(0deg) rotateY(83.5deg)"};
`;

const StyledTop = styled.div`
  background: repeating-linear-gradient(
    225deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(238, 206, 163),
    white,
    #b17045
  );
  transform: rotateX(90deg) translate3d(28px, 0px, 19px);
`;

const StyledLeft = styled.div`
  color: #000000;
  background: repeating-linear-gradient(
    225deg,
    rgb(233, 189, 130),
    #b17045,
    rgb(230, 190, 137),
    rgb(240, 226, 207),
    #b17045
  );
  transform: rotateY(-90deg) translate3d(4.75px, 0px, 29.5px);
`;

const StyledFront = styled.div`
  background: repeating-linear-gradient(
    205deg,
    rgb(230, 181, 118),
    #b17045,
    rgb(218, 205, 189),
    white,
    #b17045
  );
  transform: translate3d(-10.5px, 0px, 22px);
`;

const logoLetterStyles = (props) => (
  <LogoLetter id={props.id} className="unselectable">
    <p></p>
    <StyledPerspectiveBoxFar>
    <StyledFront className="face" />
    <StyledTop className="face" />
    <StyledLeft className="face">{props.children}</StyledLeft>
    </StyledPerspectiveBoxFar>
  </LogoLetter>
);

export default logoLetterStyles;
